const { User } = require("../db");

const getUser = async (req, res, next) => {
  try {
    const userId = req.query.id;

    const user = await User.findOne({
      where: { id: userId },
      attributes: ["name", "lastname", "username", "userImg", "email"],
    });

    res.json(user);
  } catch (e) {
    next(e);
  }
};

module.exports = { getUser };
