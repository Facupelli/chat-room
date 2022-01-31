const express = require("express");
const router = express.Router();
const {
    postJoinRoom
} = require("../controllers/roomsJoinedController");

router.post("/", postJoinRoom);

module.exports = router;