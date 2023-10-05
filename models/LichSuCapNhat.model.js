const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const LichSuCapNhat = sequelize.define(
  "LichSuCapNhat",
  {
    Ma_LSCN: {
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

    LoaiCapNhat: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    NoiDung: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },

  {
    sequelize,
    tableName: "LichSuCapNhat",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_LSCN" }],
      },
      {
        name: "lich_su_cap_nhat_idfk_1",
        using: "BTREE",
        fields: [{ name: "Ma_CB" }],
      },
    ],
  }
);

module.exports = LichSuCapNhat;
