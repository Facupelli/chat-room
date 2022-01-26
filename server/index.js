const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("new web socket connection..");

  socket.emit("message", "Welcome to Chat-Room"); // only for the user connected

  socket.broadcast.emit("message", "A user has joined the chat"); // for all user except the client connected

  //io.emit() // for all users

  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  //listen for chat messages
  socket.on('chatMessage', (msg) => {
    console.log(msg)
  })
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
