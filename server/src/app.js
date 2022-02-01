const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("../utils/messages");

const app = express();

app.name = "API";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", routes);

// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const server = http.createServer(app);
const io = socketio(server, {
  // require cors para dominio
  cors: {
    origin: "*", //habilita al front que se conecte
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    credentials: "true",
  },
}); //socketIO servidor de conexion

const botName = "Bot";

io.on("connection", (socket) => {
  console.log("new web socket connection..");

  socket.on("joinRoom", (roomInfo) => {
    const user = {
      id: socket.id,
      username: roomInfo.username,
      room: roomInfo.roomName,
    };

    console.log(user);

    socket.emit(
      "message",
      formatMessage(botName, `Welcome ${user.username} to ${user.room}`)
    ); // only for the user connected

    socket.broadcast.emit(
      "message",
      formatMessage(botName, `${user.username} has joined the chat`)
    ); // for all user except the client connected

    //listen for chat messages
    socket.on("chatMessage", (msg) => {
      io.emit("message", formatMessage(`${user.username}`, msg));
    });

    socket.on("disconnect", () => {
      io.emit("message", formatMessage(botName, `${user.username} has left the chat`));
    });
  });

  //io.emit() // for all users
});

(module.exports = server), io;
