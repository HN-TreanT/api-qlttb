const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const LichHoc_Lop = sequelize.define(
  "LichHoc_Lop",
  {
    Ma_LH_Lop: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
      primaryKey: true,
    },
    Ma_Lop: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete:"CASCADE",
      references: {
        model:"Lop",
        key:"Ma_Lop",
        
      }
    },
    Ma_LH: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete:"CASCADE",
        references: {
            model:"LichHoc",
            key:"Ma_LH"
         }
      },
  },

  {
    sequelize,
    tableName: "LichHoc_Lop",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "Ma_LH_Lop" }],
      },
      {
        name: "lich_hoc_lop_idfk_1", 
        using: "BTREE",
        fields: [{ name: "Ma_Lop" }],
      },,
      {
        name: "lich_hoc_lop_idfk_2",
        using: "BTREE",
        fields: [{ name: "Ma_LH" }],
      },
    ],
  }
);

module.exports = LichHoc_Lop;
