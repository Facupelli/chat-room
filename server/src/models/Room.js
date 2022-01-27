const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'room',
    {
      //permitimos que el id se genere automáticamente?
      name: {
        type: DataTypes.STRING,
        alowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};