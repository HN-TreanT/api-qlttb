const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Loai_TTB = sequelize.define(
  "Loai_TTB",
  {
    Ma_Loai_TTB: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Ten_Loai: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    tableName: "Loai_TTB",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Loai_TTB" }],
      },
    ],
  }
);

module.exports = Loai_TTB;
