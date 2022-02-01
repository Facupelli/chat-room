const express = require("express");
const router = express.Router();
const {
  postMessage,
  getMessagesByRoom,
} = require("../controllers/chatMessageController");

router.post("/", postMessage);
router.get("/", getMessagesByRoom);

module.exports = router;
