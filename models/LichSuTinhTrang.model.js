const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const LichSuTinhTrang = sequelize.define(
  "LichSuTinhTrang",
  {
    Ma_LSTT: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Ma_TTB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TrangThietBi",
        key: "Ma_TTB",
      },
    },
    Ma_TTTTB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TinhTrangTTB",
        key: "Ma_TTTTB",
      },
    },

    TG_DB: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    TG_KT: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },

  {
    sequelize,
    tableName: "LichSuTinhTrang",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_LSTT" }],
      },
      {
        name: "lich_su_tinh_trang_idfk_1",
        using: "BTREE",
        fields: [{ name: "Ma_TTB" }],
      },
      {
        name: "lich_su_tinh_trang_idfk_2",
        using: "BTREE",
        fields: [{ name: "Ma_TTTTB" }],
      },
    ],
  }
);

module.exports = LichSuTinhTrang;
