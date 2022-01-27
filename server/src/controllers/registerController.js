const { User } = require("../db");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
  try {
    const isEmailExist = await User.findAll({
      where: {
        email: req.body.email,
      },
    });

    console.log(isEmailExist)

    if (isEmailExist.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = {
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password,
    };

    await User.create(user);
    res.json({ data: "created" });
  } catch (e) {
    next(e);
  }
};

module.exports = {registerUser};
