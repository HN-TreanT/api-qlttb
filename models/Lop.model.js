const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Lop = sequelize.define(
  "Lop",
  {
    Ma_Lop: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:true,
      primaryKey: true,
      autoIncrement: true
    },
    Code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ten_Lop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    tableName: "Lop",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_Lop" }],
      },
    ],
  }
);

module.exports = Lop;
