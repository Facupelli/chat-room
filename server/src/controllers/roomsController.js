const { Room, User } = require("../db");

const postRoom = async (req, res, next) => {
  try {
    const room = {
      name: req.body.name,
      description:req.body.description,
      userId: req.body.userId,
    };

    const roomNameExist = await Room.findOne({where: {userId: room.userId, name: room.name}});
    
    if(roomNameExist){
      res.status(400).json({message: "room name already exists"})
    }

    await Room.create(room);
    res.json({ data: "created" });
  } catch (e) {
    next(e);
  }
};

const getRooms = async (req, res, next) => {
  try {

    const rooms = await Room.findAll({include: {model: User, attributes: ['username']}});

    res.json(rooms);
  } catch (e) {
    next(e);
  }
};

module.exports = { postRoom, getRooms };
