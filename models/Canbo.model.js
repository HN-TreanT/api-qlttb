const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const CanBo = sequelize.define(
  "CanBo",
  {
    Ma_CB: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Ten_CB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NgaySinh: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    SoDienThoai: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GioiTinh: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },

  {
    sequelize,
    tableName: "CanBo",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_CB" }],
      },
    ],
  }
);

module.exports = CanBo;
