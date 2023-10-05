const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const TrangThietBi = sequelize.define(
  "TrangThietBi",
  {
    Ma_TTB: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Ten_TTB: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    Loai: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    NgayNhap: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    NgayXuat: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },

  {
    sequelize,
    tableName: "TrangThietBi",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_TTB" }],
      },
    ],
  }
);

module.exports = TrangThietBi;
