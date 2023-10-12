const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
  let order = [];
  if (req.query.ten_lop) filter.Lop = { [Op.substring]: req.query.ten_lop };
  if (req.query.phong_hoc) filter.PhongHoc = { [Op.substring]: req.query.phong_hoc };
  if (req.query.order_ngayhoc) order = [...order, ["NgayHoc", `${req.query.order_ngayhoc}`]];
  if (req.query.order_TG_BD) order = [...order, ["TG_BD", `${req.query.order_TG_BD}`]];
  const { count, rows } = await db.LichHoc.findAndCountAll({
    where: { ...filter },
    order: [...order],
    ...req.pagination,
  });
  return responseSuccessWithData({
    res,
    data: {
      count: rows.length,
      data: rows,
    },
  });
};

const getById = async (req, res) => {
  const LichHoc = await db.LichHoc.findByPk(req.params.id);
  if (!LichHoc) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LichHoc });
};

const create = async (req, res) => {
  const data = await db.LichHoc.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const LichHoc = await db.LichHoc.findByPk(req.params.id);
  if (!LichHoc) return responseInValid({ res, message: "not found can bo" });
  await LichHoc.update(req.body);
  return responseSuccessWithData({ res, data: LichHoc });
};

const deleteById = async (req, res) => {
  const LichHoc = await db.LichHoc.findByPk(req.params.id);
  if (!LichHoc) return responseInValid({ res, message: "not found can bo" });
  await LichHoc.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
