const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
  if(req.query.search) {
    filter.Ten_Lop = {[Op.substring]: req.query.search}
  }
  const { count, rows } = await db.Lop.findAndCountAll({
    where: { ...filter },
    ...req.pagination,
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
  const Lop = await db.Lop.findByPk(req.params.id);
  if (!Lop) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: Lop });
};

const create = async (req, res) => {
  const data = await db.Lop.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const Lop = await db.Lop.findByPk(req.params.id);
  if (!Lop) return responseInValid({ res, message: "not found" });
  await Lop.update(req.body);
  return responseSuccessWithData({ res, data: Lop });
};

const deleteById = async (req, res) => {
  const Lop = await db.Lop.findByPk(req.params.id);
  if (!Lop) return responseInValid({ res, message: "not found" });
  await Lop.destroy()
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
