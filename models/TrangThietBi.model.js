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

    Ma_Loai_TTB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Loai_TTB",
        key: "Ma_Loai_TTB",
      },
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
      {
        name: "trang_thiet_bi_idfk_1",
        using: "BTREE",
        fields: [{ name: "Ma_Loai_TTB" }],
      },
    ],
  }
);

module.exports = TrangThietBi;
