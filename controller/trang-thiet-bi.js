const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
  let order = [];
  if (req.query.Ten_TTB) filter.Ten_TTB = { [Op.substring]: req.query.Ten_TTB };
  if (req.query.Ma_Loai_TTB) filter.Ma_Loai_TTB = req.query.Ma_Loai_TTB;
  if (req.query.order_ngaynhap) order = [...order, ["NgayNhap", `${req.query.order_ngaynhap}`]];

  const { rows, count } = await db.TrangThietBi.findAndCountAll({
    where: { ...filter },
    ...req.pagination,
    include: [{ model: db.Loai_TTB, as: "Loai_TTB" }],
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
  const TrangThietBi = await db.TrangThietBi.findByPk(req.params.id);
  if (!TrangThietBi) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: TrangThietBi });
};

const create = async (req, res) => {
  const data = await db.TrangThietBi.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const TrangThietBi = await db.TrangThietBi.findByPk(req.params.id);
  if (!TrangThietBi) return responseInValid({ res, message: "not found can bo" });
  await TrangThietBi.update(req.body);
  return responseSuccessWithData({ res, data: TrangThietBi });
};

const deleteById = async (req, res) => {
  const TrangThietBi = await db.TrangThietBi.findByPk(req.params.id);
  if (!TrangThietBi) return responseInValid({ res, message: "not found can bo" });
  await TrangThietBi.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
