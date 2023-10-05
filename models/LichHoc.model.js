const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const LichHoc = sequelize.define(
  "LichHoc",
  {
    Ma_LH: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Lop: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    PhongHoc: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    NgayHoc: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    TG_BD: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    TG_KT: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },

  {
    sequelize,
    tableName: "LichHoc",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_LH" }],
      },
    ],
  }
);

module.exports = LichHoc;
