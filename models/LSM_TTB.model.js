const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const LichSuMuon_TrangThietBi = sequelize.define(
  "LichSuMuon_TrangThietBi",
  {
    Ma_LSM_TTB: {
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
    Ma_LSM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "LichSuMuon",
        key: "Ma_LSM",
      },
    },

    TrangThai: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    NhanXet: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },

  {
    sequelize,
    tableName: "LichSuMuon_TrangThietBi",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_LSM_TTB" }],
      },
      {
        name: "lich_su_muon_trang_thiet_bi_idfk_1",
        using: "BTREE",
        fields: [{ name: "Ma_TTB" }],
      },
      {
        name: "lich_su_muon_trang_thiet_bi_idfk_2",
        using: "BTREE",
        fields: [{ name: "Ma_LSM" }],
      },
    ],
  }
);

module.exports = LichSuMuon_TrangThietBi;
