const config = {
  api: {
    port: 8000,
  },
  database: {
    username: "admin",
    password: "hnam23012002",
    database: "movieDb",
    port: 3306, // thay đổi port kết nối tới MySQL từ 8080 thành 3307
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 1,
      acquire: 30000,
      idle: 10000,
    },
  },
  secretKeyJWT: "asdsadsanmdnNHandas@_1212$#*&^",
  secretKeyRFT: "hjnnugahsbxhvsabdsavcash@#65565_*&^%#$",
};

module.exports = config;
