const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
  let order = [];
  if (req.query.Ten_CB) filter.Ten_CB = { [Op.substring]: req.query.Ten_CB };
  if (req.query.SoDienThoai) filter.SoDienThoai = req.query.SoDienThoai;
  if (req.query.order_name) order = [...order, ["Ten_CB", `${req.query.order_name}`]];
  if (req.query.order_createdAt) order = [...order, ["createdAt", `${req.query.order_createdAt}`]];

  const { count, rows } = await db.CanBo.findAndCountAll({
    where: {
      ...filter,
    },
    attributes: { exclude: "MatKhau" },
    order: [...order],
    ...req.pagination,
    include: [{model: db.Role, as:"Role"}]
    // include: [{ model: db.LichLamViec, as: "LichLamViec" }],
  });
  return responseSuccessWithData({
    res,
    data: {
      count: count,
      data: rows,
    },
  });
};

const getById = async (req, res) => {
  const canbo = await db.CanBo.findByPk(req.params.id, {
    include: [{ model: db.LichLamViec, as: "LichLamViec" }],
  });
  if (!canbo) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: canbo });
};

const create = async (req, res) => {
  await db.CanBo.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const canbo = await db.CanBo.findByPk(req.params.id);
  if (!canbo) return responseInValid({ res, message: "not found" });
  await canbo.update(req.body);
  return reponseSuccess({ res });
};

const deleteById = async (req, res) => {
  const canbo = await db.CanBo.findByPk(req.params.id);
  if (!canbo) return responseInValid({ res, message: "not found" });
  await db.LichLamViec.destroy({where: { Ma_CB: canbo.Ma_CB}});
  await db.LichSuBaoDuong.destroy({where: { Ma_CB: canbo.Ma_CB}});
  await db.LichSuMuon.destroy({where: { Ma_CB: canbo.Ma_CB}});
  await db.LichSuCapNhat.destroy({where: { Ma_CB: canbo.Ma_CB}});

  await canbo.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
