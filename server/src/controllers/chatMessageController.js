const { User } = require("../db");

const postMessage = async (req, res, next) => {
  try {
    
    const {message} = req.body

    await ChatMessage.create(message);

    res.json({ data: "created" });
  } catch (e) {
    next(e);
  }
};

module.exports = { loginUser };