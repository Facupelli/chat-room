const express = require("express");
const router = express.Router();
const {
    postRoom,
    getRooms
} = require("../controllers/roomsController");

router.post("/", postRoom);
router.get('/', getRooms)

module.exports = router;