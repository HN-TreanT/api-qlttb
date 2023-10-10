const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Role = sequelize.define(
  "Role",
  {
    role_id: {
      type: DataTypes.CHAR,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    tableName: "Role",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "role_id" }],
      },
    ],
  }
);

module.exports = Role;
