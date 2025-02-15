const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const openTDhost = "https://opentdb.com/api.php"
const axios = require("axios")
const fs = require('fs');
const path = require('path');

const app = express()
const server = http.createServer(app)

const LEADERBOARD_FILE = path.join(__dirname, 'leaderboard.json');

// Initialize database from file or create new
let dataBase = {};
try {
  const fileData = fs.readFileSync(LEADERBOARD_FILE, 'utf8');
  dataBase = JSON.parse(fileData);
} catch (error) {
  console.log('No existing leaderboard file, starting fresh');
  dataBase = {};
}

let quizData = {}
let timePerQuestion = 0
let result = ""
let currentCategory = null  // Add this to store category


const io = socketIo(server, {
    cors: {
        origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    },
})

// Set up your other Express middleware and routes here
app.get("/", (req, res) => {
    io.emit("message", "Hello World!")
    res.send("OK!")
})

// Add new endpoint for top 10
app.get('/scores/top10', (req, res) => {
    const scores = Object.entries(dataBase)
        .map(([name, score]) => ({ name, score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    res.json(scores);
});

// Start the server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

io.on("connection", (socket) => {
    // Send current leaderboard to newly connected clients
    socket.emit("returnScore", dataBase);

    // Clear database properly when hosting
    socket.on("hosting", () => {
        // Generate new room code
        result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        console.log("Generated new room code:", result); // Debug log

        // Reset database
        dataBase = {};
        
        // Broadcast new room code
        io.emit("newRoom", result);
        io.emit("returnScore", dataBase);
    })

    // In the nameCode event - this is where players join
    socket.on("nameCode", (data) => {
        const roomCode = data.code;
        console.log("Received room code:", roomCode);
        console.log("Current result:", result);
        
        if (roomCode === result) {
            // Set player's initial data ONCE with category
            dataBase[data.name] = {
                score: 0,
                category: currentCategory  // Set category only once when joining
            };
            
            console.log("Player joined with data:", dataBase[data.name]);
            
            socket.join(result);
            socket.emit("displayName", data);
            io.emit("amountOfPlayers", Object.keys(dataBase).length);
        } else {
            socket.emit("errorMessage", "Wrong Code");
        }
    })

    socket.on("hostJoin", () => {
        socket.join(result)
        
        // Emit an acknowledgment event
        socket.emit("hostJoinAck")
    })

    socket.on("quizInfo", (data) => {
        console.log("Received quiz info:", data); // Debug log
        currentCategory = data.category;  // Store category globally
        timePerQuestion = data.timePerQuestion;
        const numberOfQuestions = data.numberOfQuestions;
        const difficulty = data.difficulty;

        // Reset database with new category
        dataBase = {};

        const url = `${openTDhost}?amount=${numberOfQuestions}&category=${currentCategory}&difficulty=${difficulty}`;

        async function makeGetRequest() {
            try {
                const response = await axios.get(url)
                quizData = response.data
                quizData.timePerQuestion = timePerQuestion
                
            } catch (error) {

            }
        }
        makeGetRequest()
    })

    socket.on("sendQuiz", () => {
        io.to(result).emit("getQuiz", quizData)
    })

    /*GET SCORE FROM EACH PLAYER*/
    // Simplify the studentScore event to only update score
    socket.on("studentScore", (data) => {
        const userName = data.name;
        
        // Only update the score, keep existing category
        if (dataBase[userName]) {
            dataBase[userName].score = data.score;
            console.log("Updated score for", userName, ":", dataBase[userName]);
            
            // Save to file
            fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(dataBase, null, 2));
            
            // Broadcast updates
            io.emit("returnScore", dataBase);
        }
    })

    /*SEND TIMING PER QUESTION*/
    socket.on("timerOn", (data) => {
        const timePerQuestion = data.timePerQuestion
        // Set up the timer
        setTimeout(() => {
            io.emit("timeUp") // Send a message to all clients that time is up
        }, timePerQuestion * 1000) // Convert seconds to milliseconds
    })

    /*RETURN SCORE FOR LEADERBOARD*/
    io.emit("returnScore", dataBase)
})