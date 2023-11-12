const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const CanBo = sequelize.define(
  "CanBo",
  {
    Ma_CB: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    TaiKhoan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    MatKhau: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ten_CB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NgaySinh: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    SoDienThoai: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GioiTinh: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },

    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    role_id: {
      type: DataTypes.CHAR,
      allowNull: false,
      references: { 
        model: "Role",
        key: "role_id",
      },
    },
  },

  {
    sequelize,
    tableName: "CanBo",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_CB" }],
      },
      {
        name: "can_bo_idfk_1",
        using: "BTREE",
        fields: [{ name: "role_id" }],
      },
    ],
  }
);

module.exports = CanBo;
