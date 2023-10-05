const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const LichSuBaoDuong = sequelize.define(
  "LichSuBaoDuong",
  {
    Ma_LSBD: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Ma_LBD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "LichBaoDuong",
        key: "Ma_LBD",
      },
    },

    Ma_CB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CanBo",
        key: "Ma_CB",
      },
    },

    TG_BD: {
      type: Date,
    },

    TG_KT: {
      type: Date,
    },
    DanhGia: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize,
    tableName: "LichSuBaoDuong",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_LSBD" }],
      },
      {
        name: "lich_su_bao_duong_idfk_1",
        using: "BTREE",
        fields: [{ name: "Ma_CB" }],
      },
    ],
  }
);

module.exports = LichSuBaoDuong;
