const { Chat_message, Room } = require("../db");
const { getPagination } = require("../../utils/pagintaion");

const postMessage = async (req, res, next) => {
  try {
    const { username, text, room, userId, roomId } = req.body;

    if ((username && text && room && userId, roomId)) {
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
    const { page, size, roomName, roomId } = req.query;

    const totalRows = await Chat_message.findAndCountAll({
      where: { roomName: roomName, roomId: roomId },
    });

    const { limit, offset } = getPagination(page, size, totalRows);

    const findRoom = await Chat_message.findAndCountAll({
      where: { roomName: roomName, roomId: roomId },
      //   include: [{ model: Chat_message, as: "roomMessages" }],
      limit,
      offset,
    });

    res.json(findRoom);
  } catch (e) {
    next(e);
  }
};

module.exports = { postMessage, getMessagesByRoom };
