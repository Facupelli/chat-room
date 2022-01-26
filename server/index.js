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
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
