const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const openTDhost = "https://opentdb.com/api.php"
const axios = require("axios")

const app = express()
const server = http.createServer(app)

let dataBase = {}
let quizData = {}
let timePerQuestion = 0
let result = ""

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

// Start the server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

io.on("connection", (socket) => {
    socket.on("hosting", () => {
        result = ""
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        const charactersLength = characters.length

        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        io.emit("newRoom", result)
    })

    socket.on("nameCode", (data) => {
        const roomCode = data.code
        if (roomCode === result) {
            dataBase[data.name] = 0
            socket.emit("displayName", data)
            io.emit("amountOfPlayers", Object.keys(dataBase).length)
            socket.join(result)
        } else {
            socket.emit("errorMessage", "Wrong Code")
        }
    })

    socket.on("hostJoin", () => {
        socket.join(result)
        
        // Emit an acknowledgment event
        socket.emit("hostJoinAck")
    })

    socket.on("quizInfo", (data) => {
        const category = data.category
        timePerQuestion = data.timePerQuestion
        const numberOfQuestions = data.numberOfQuestions
        const difficulty = data.difficulty

        const url = `${openTDhost}?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`

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
    socket.on("studentScore", (data) => {
        const userName = data.name
        dataBase[userName] = data.score
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