const { Chat_message, Room } = require("../db");

const postMessage = async (req, res, next) => {
  try {
    const { username, text, room, userId, roomId } = req.body;

    if (username && text && room && userId, roomId) {
      const message = {
        username,
        text,
        roomName: room,
        userId,
        roomId,
      };

      const response = await Chat_message.create(message);

      res.json({ data: "created" });
    } else {
      res.status(400).json({ message: "missing information" });
    }
  } catch (e) {
    next(e);
  }
};

const getMessagesByRoom = async (req, res, next) => {
  try {
    const { room, userId } = req.body;

    const findRoom = await Room.findAll({
      where: { name: room, userId: userId },
      include: [{ model: Chat_message, as: "roomMessages" }],
    });

    res.json(findRoom);
  } catch (e) {
    next(e);
  }
};

module.exports = { postMessage, getMessagesByRoom };
