const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const LichSuMuon = sequelize.define(
  "LichSuMuon",
  {
    Ma_LSM: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    NguoiMuon: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    SoDienThoai: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Ma_LH: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "LichHoc",
        key: "Ma_LH",
      },
    },

    Ma_CB: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "CanBo",
        key: "Ma_CB",
      },
    },
    ChuThich: {
      type: DataTypes.STRING,
    },

    TrangThai: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },

  {
    sequelize,
    tableName: "LichSuMuon",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_LSM" }],
      },
      {
        name: "lich_su_muon_idfk_1",
        using: "BTREE",
        fields: [{ name: "Ma_LH" }],
      },
      {
        name: "lich_su_muon_idfk_2",
        using: "BTREE",
        fields: [{ name: "Ma_CB" }],
      },
    ],
  }
);

module.exports = LichSuMuon;
