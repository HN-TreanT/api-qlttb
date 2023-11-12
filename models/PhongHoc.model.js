const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const PhongHoc = sequelize.define(
  "PhongHoc",
  {
    Ma_PH: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    TenPhong: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    GiangDuong: {
        type: DataTypes.STRING,
        allowNull: true
    }
  },

  {
    sequelize,
    tableName: "PhongHoc",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_PH" }],
      }
    ],
  }
);

module.exports = PhongHoc;
