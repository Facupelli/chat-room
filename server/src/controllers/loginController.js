const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) return res.status(400).json({ error: "Email is incorrect" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    // create token
    const token = jwt.sign(
      // payload data
      {
        name: user.name,
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    res.header("auth-token", token).json({
      token,
      id: user._id,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { loginUser };
