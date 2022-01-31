const { Room, rooms_users_joined } = require("../db");

const postJoinRoom = async (req, res, next) => {
  try {
    const info = req.body;

    const room = await Room.findByPk(Number(info.roomId));

    console.log('ROOM', room)

    if (room) {
      const [join, created] = await rooms_users_joined.findOrCreate({
        where: {
          roomId: info.roomId,
          userId: info.userId,
        },
      });
      if (created) {
        res.json({ message: "Joined successfully" });
        // Ya existia
      } else {
        res.status(400).json({ message: "You already have joined this room" });
      }
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  
  } catch (e) {
    next(e);
  }
};

module.exports = { postJoinRoom };
