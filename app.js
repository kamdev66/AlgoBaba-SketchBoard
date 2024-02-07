const express = require("express");  // Access
const socket = require("socket.io");
const path = require('path');
const cors = require("cors");

const app = express(); //Initialized and server ready

const corsOptions ={
    origin:['https://algo-baba-sketch-board.vercel.app/','http://localhost:5000'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
// Enable CORS
app.use(cors(corsOptions));


// app.use(express.static("public"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route handler for the root path ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
    console.log("Listening to port" + port);
})

// let io = socket(server);
// Create a new instance of Socket.IO and apply CORS middleware to it
const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Made socket connection");
    // Received data
    socket.on("beginPath", (data) => {
        // data -> data from frontend
        // Now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})