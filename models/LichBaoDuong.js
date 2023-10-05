const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const LichBaoDuong = sequelize.define(
  "LichBaoDuong",
  {
    Ma_LBD: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    DonVi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ma_LLV: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "LichLamViec",
        key: "Ma_LLV",
      },
    },
  },

  {
    sequelize,
    tableName: "LichBaoDuong",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_LBD" }],
      },
      {
        name: "lich_bao_duong_idfk_1",
        using: "BTREE",
        fields: [{ name: "Ma_LLV" }],
      },
    ],
  }
);

module.exports = LichBaoDuong;
