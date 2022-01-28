const express = require("express");
const router = express.Router();
const {
    postRoom
} = require("../controllers/roomsController");

router.post("/", postRoom);

module.exports = router;