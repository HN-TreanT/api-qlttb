const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const LichLamViec = sequelize.define(
  "LichLamViec",
  {
    Ma_LLV: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Ma_CB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CanBo",
        key: "Ma_CB",
      },
    },

    CongViec: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Ngay: {
      type: DataTypes.DATE,
    },
    Kip: {
      type: DataTypes.INTEGER,
    },
  },

  {
    sequelize,
    tableName: "LichLamViec",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_LLV" }],
      },
      {
        name: "lich_lam_viec_idfk_1",
        using: "BTREE",
        fields: [{ name: "Ma_CB" }],
      },
    ],
  }
);

module.exports = LichLamViec;
