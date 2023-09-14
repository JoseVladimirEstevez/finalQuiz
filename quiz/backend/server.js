const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    }
});
const dataBase = {}


// Set up your other Express middleware and routes here
app.get('/', (req, res) => {
    io.emit('message', 'Hello World!');
    res.send('OK!');
})

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('socket: ', socket.id);
    
    socket.on('reach10', data => {
        console.log('data', data)
    })


    socket.on('hosting', data => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log('newRoom', result)
        socket.emit('newRoom', result)
    })

    socket.on("playerName", data => {
        console.log('playerName', data)
        
        
        dataBase[data] = 0
       
        console.log(dataBase)
        socket.emit('displayName', data)
    } )

    socket.on("quizInfo", data => {
        console.log('quizInfo', data)
    })


})