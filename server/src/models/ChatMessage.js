const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "chat_message",
    {
      //permitimos que el id se genere automáticamente?
      username: {
        type: DataTypes.STRING,
        alowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        alowNull: true,
      },
      room: {
        type: DataTypes.STRING,
        alowNull: true,
      },
    },
  );
};
