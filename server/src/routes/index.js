const { Router } = require("express");

const register = require("./register");
const login = require("./login");
const user = require("./user");
const room = require("./room");
const roomJoined = require("./roomsJoined");

// const temperament = require('./temperament');

const router = Router();

router.use("/register", register);
router.use("/login", login);
router.use("/user", user);
router.use("/room", room);
router.use("/roomsjoined", roomJoined);

// router.use('/temperament', temperament);

module.exports = router;
