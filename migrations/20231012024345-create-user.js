"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm cột mới với kiểu INTEGER
    await queryInterface.addColumn("TrangThietBi", "NewTrangThai", {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    // Xóa cột cũ và đổi tên cột mới thành tên cũ
    await queryInterface.removeColumn("TrangThietBi", "TrangThai");
    await queryInterface.renameColumn("TrangThietBi", "NewTrangThai", "TrangThai");
  },

  async down(queryInterface, Sequelize) {
    // Trong trường hợp rollback, bạn có thể thêm lại cột cũ và khôi phục dữ liệu
    await queryInterface.addColumn("TrangThietBi", "TrangThai", {
      type: Sequelize.STRING,
    });

    const updateQuery = `
      UPDATE TrangThietBi
      SET TrangThai = CASE
        WHEN NewTrangThai = 1 THEN 'Giá trị_cũ_1'
        WHEN NewTrangThai = 2 THEN 'Giá trị_cũ_2'
        ELSE 'Giá trị_cũ_khác'
      END;
    `;
    await queryInterface.sequelize.query(updateQuery);

    await queryInterface.removeColumn("TrangThietBi", "NewTrangThai");
  },
};