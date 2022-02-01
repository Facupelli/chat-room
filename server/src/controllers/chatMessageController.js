const { Chat_message, Room } = require("../db");
const {getPagination} = require('../../utils/pagintaion')

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
    const { room, roomId } = req.body;
    const { page, size } = req.query;

    const {limit, offset} = getPagination(page, size)

    const findRoom = await Chat_message.findAndCountAll({
      where: { roomName: room, roomId: roomId },
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
