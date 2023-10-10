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

  const canbos = await db.CanBo.findAll({
    where: {
      ...filter,
    },
    attributes: { exclude: "MatKhau" },
    order: [...order],
    ...req.pagination,
    include: [{ model: db.LichLamViec, as: "LichLamViec" }],
  });
  return responseSuccessWithData({ res, data: canbos });
};

const getById = async (req, res) => {
  const canbo = await db.CanBo.findByPk(req.params.id);
  if (!canbo) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: canbo });
};

const create = async (req, res) => {
  await db.CanBo.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const canbo = await db.CanBo.findByPk(req.params.id);
  if (!canbo) return responseInValid({ res, message: "not found can bo" });
  await canbo.update(req.body);
  return reponseSuccess({ res });
};

const deleteById = async (req, res) => {
  const canbo = await db.CanBo.findByPk(req.params.id);
  if (!canbo) return responseInValid({ res, message: "not found can bo" });
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