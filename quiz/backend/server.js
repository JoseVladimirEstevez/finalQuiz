const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const openTDhost = "https://opentdb.com/api.php";
const axios = require("axios");

const app = express();
const server = http.createServer(app);

const dataBase = {};
let quizData = {};
let timePerQuestion = 0;
let result = "";

const io = socketIo(server, {
    cors: {
        origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    },
});

// Set up your other Express middleware and routes here
app.get("/", (req, res) => {
    io.emit("message", "Hello World!");
    res.send("OK!");
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

io.on("connection", (socket) => {
    console.log("socket: ", socket.id);

    socket.on("reach10", (data) => {
        console.log("data", data);
    });
    socket.on("hosting", (data) => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        const charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log("newRoom", result);
        io.emit("newRoom", result);
    });

    socket.on("nameCode", (data) => {
        console.log('data: ', data);
        // console.log("playerName", data);
        const roomCode = data.code;
        console.log('roomCode: ', roomCode);
        console.log('result: ', result);
        if (roomCode === result) {
            dataBase[data.name] = 0;
            // console.log(dataBase);
            socket.emit("displayName", data);
            io.emit("amountOfPlayers", Object.keys(dataBase).length);
            socket.join(result);
        } else {
            socket.emit("errorMessage", "Wrong Code");
        }
    });

    socket.on("quizInfo", (data) => {
        const category = data.category;
        timePerQuestion = data.timePerQuestion;

        const numberOfQuestions = data.numberOfQuestions;
        const difficulty = data.difficulty;
        const url = `${openTDhost}?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;

        async function makeGetRequest() {
            try {
                const response = await axios.get(url);
                quizData = response.data;
                //console.log("🚀 ~ file: server.js:78 ~ makeGetRequest ~ quizData:", quizData)
                //console.log(quizData);
            } catch (error) {
                console.error(error);
            }
        }
        makeGetRequest();
    });

    socket.on("sendQuiz", (data) => {
        console.log("TEST");
        //console.log('timePerQuestion: ', timePerQuestion);
        // io.emit("timePerQuestion", timePerQuestion);
        io.to(result).emit("getQuiz", quizData);
    });
    /*GET SCORE FROM EACH PLAYER*/
    socket.on("studentScore", (data) => {
        const userName = data.name;
        dataBase[userName] = data.score;
        console.log("🚀 ~ file: server.js:97 ~ socket.on ~ data:", dataBase);
    });

    /*SEND TIMING PER QUESTION*/
    socket.on("timerOn", (data) => {
        const timePerQuestion = data.timePerQuestion;
        // Set up the timer
        const timer = setTimeout(() => {
            io.emit("timeUp"); // Send a message to all clients that time is up
        }, timePerQuestion * 1000); // Convert seconds to milliseconds
    });

    /*RETURN SCORE FOR LEADERBOARD*/
    io.to(result).emit("returnScore", dataBase);

    /*DIFFERENTIATE TEACHER VIEW FROM STUDENTS*/
    /*CREATE A ROOM WITH THE CODE AND ADD IT TO THE SOCKET CONFIGURATION*/
});