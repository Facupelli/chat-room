const formatMessage = require("./utils/messages");
const { io } = require("../app");


const botName = "Bot";

io.on("connection", (socket) => {
  console.log("new web socket connection..");

  socket.on("joinRoom", (roomInfo) => {
    const user = {
      id: socket.id,
      username: roomInfo.username,
      room: roomInfo.name,
    };

    console.log(user)

    socket.join(user.room);

    socket.emit("message", formatMessage(botName, "Welcome to Chat-Room")); // only for the user connected

    socket.broadcast.to(user.room).emit(
      "message",
      formatMessage(botName, "A user has joined the chat")
    ); // for all user except the client connected
  });

  //io.emit() // for all users

  //listen for chat messages
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("username", msg));
  });

  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });
});
