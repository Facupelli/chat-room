const { Room } = require("../db");

const postRoom = async (req, res, next) => {
  try {
    const room = {
      name: req.body.name,
      userId: req.body.userId,
    };

    await Room.create(room);
    res.json({ data: "created" });
  } catch (e) {
    next(e);
  }
};

const getRooms = async (req, res, next) => {
  try {

    const rooms = await Room.findAll();

    res.json(rooms);
  } catch (e) {
    next(e);
  }
};

module.exports = { postRoom, getRooms };
