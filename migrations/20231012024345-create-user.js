"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
     // Thêm cột mới với kiểu STRING
    await queryInterface.addColumn("PhongHoc", "TenPhong", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("PhongHoc", "Ten_PH");
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable("Users");
  },
};
