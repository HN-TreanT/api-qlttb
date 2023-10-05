const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const TinhTrangTTB = sequelize.define(
  "TinhTrangTTB",
  {
    Ma_TTTTB: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ViTri: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TinhTrang: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GhiChu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },

  {
    sequelize,
    tableName: "TinhTrangTTB",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_TTTTB" }],
      },
    ],
  }
);

module.exports = TinhTrangTTB;
