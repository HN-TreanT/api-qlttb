"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("LichSuMuon", "TrangThai", {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    });

    await queryInterface.addColumn("TrangThietBi", "TrangThai", {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
