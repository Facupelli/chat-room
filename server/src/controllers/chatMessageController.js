const { Chat_message } = require("../db");

const postMessage = async (req, res, next) => {
  try {
    const { username, text, room, userId } = req.body;

    if (username && text && room && userId) {
      const message = {
        username,
        text,
        room,
        userId,
      };

      console.log("REQ BODY", req.body);

      const response = await Chat_message.create(message);

      res.json({ data: "created" });
    } else {
      res.status(400).json({ message: "missing information" });
    }
  } catch (e) {
    next(e);
  }
};

const getMessagesByRoom = async(req, res, next) => {
    try{
        const room = req.body.room



    }catch(e){
        next(e)
    }
}

module.exports = { postMessage };
