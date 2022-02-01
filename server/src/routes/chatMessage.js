const express = require("express");
const router = express.Router();
const {
    postMessage
} = require("../controllers/chatMessageController");

router.post("/", postMessage);
// router.get('/', getRooms)

module.exports = router;