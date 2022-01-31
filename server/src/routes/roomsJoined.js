const express = require("express");
const router = express.Router();
const {
  postJoinRoom,
  getRoomsJoinedByUser,
} = require("../controllers/roomsJoinedController");

router.post("/", postJoinRoom);
router.get("/", getRoomsJoinedByUser);

module.exports = router;
