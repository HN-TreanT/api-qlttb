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
    NgayHoc: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Ma_PH: {
      type: DataTypes.INTEGER,
      allowNull:true,
      references: {
        model:"PhongHoc",
        key:"Ma_PH"
      }
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
      {
        name: "lich_hoc_idfk_1",
        using: "BTREE",
        fields: [{ name: "Ma_PH" }],
      },
    ],
  }
);

module.exports = LichHoc;
