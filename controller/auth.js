const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const security = require("../utils/security");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const getMe = async (req, res) => {
  const { username, role_id } = req.user;
  const canbo = await db.CanBo.findOne({
    where: {
      TaiKhoan: username,
    },
  });
  if (!canbo) responseInValid({ res, message: "Not found " });
  return responseSuccessWithData({ res, data: canbo });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await db.CanBo.findOne({
    where: {
      TaiKhoan: username,
    },
  });
  if (!user) return responseInValid({ res, message: "Tài khoản không tồn tại" });
  let check = await bcrypt.compareSync(password, user.MatKhau);
  if (!check) return responseInValid({ res, message: " Mật khẩu không chính xác" });
  const access_token = security.generateToken({ username: user.TaiKhoan, role_id: user.role_id }, "1h");
  const refresh_token = security.generateRFToken({ username: user.TaiKhoan, role_id: user.role_id }, "300d");
  await user.update({ refresh_token: refresh_token });
  return responseSuccessWithData({ res, data: { ...user.dataValues, access_token: access_token } });
};
const register = async (req, res) => {
  const canbo = await db.CanBo.findOne({
    where: {
      TaiKhoan: req.body.TaiKhoan,
    },
  });
  if (canbo) return responseInValid({ res, message: "tài khoản đã tồn tại" });
  const hashPassword = await bcrypt.hashSync(req.body.MatKhau, salt);
  req.body.MatKhau = hashPassword;
  if (!req.body.role_id) {
    req.body.role_id = "U";
  }
  await db.CanBo.create(req.body);
  return reponseSuccess({ res });
};

const change_password = async (req, res) => {
  const { username, old_password, new_password } = req.body;
  const account = await db.CanBo.findOne({
    where: {
      TaiKhoan: username,
    },
  });
  if (!account) return responseInValid({ res, message: "Tài khoản không tồn tại" });
  const check = await bcrypt.compareSync(old_password, account.MatKhau);
  if (!check) return responseInValid({ res, message: "Mật khẩu không chính xác" });
  const hashPassword = await bcrypt.hashSync(new_password, salt);
  await account.update({ MatKhau: hashPassword });
  return responseSuccessWithData({ res, data: account });
};

const refresh = async (req,res) => {
  const data = security.verifyRFToken(req.body.refresh_token)
  const access_token = security.generateToken(data.user, '1h');
  console.log(access_token)
  return responseSuccessWithData({res, data: {
    access_token: access_token
  }})

}
module.exports = { login, register, change_password, getMe ,refresh};
