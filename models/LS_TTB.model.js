const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const LichSu_TrangThietBi = sequelize.define(
  "LichSu_TrangThietBi",
  {
    Ma_LS_TTB: {
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
    Ma_LSCN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "LichSuCapNhat",
        key: "Ma_LSCN",
      },
    },
  },

  {
    sequelize,
    tableName: "LichSu_TrangThietBi",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_TTB" }],
      },
      {
        name: "lich_su_trang_thiet_bi_idfk_1",
        using: "BTREE",
        fields: [{ name: "Ma_TTB" }],
      },
      {
        name: "lich_su_trang_thiet_bi_idfk_2",
        using: "BTREE",
        fields: [{ name: "Ma_LSCN" }],
      },
    ],
  }
);

module.exports = LichSu_TrangThietBi;
