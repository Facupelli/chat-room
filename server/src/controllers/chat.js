const formatMessage = require("./utils/messages");
const {io} = require('../app')


const botName = "Bot";

io.on("connection", (socket) => {
  console.log("new web socket connection..");

  socket.emit("message", formatMessage(botName, "Welcome to Chat-Room")); // only for the user connected

  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A user has joined the chat")
  ); // for all user except the client connected

  //io.emit() // for all users

  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });

  //listen for chat messages
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("username", msg));
  });
});