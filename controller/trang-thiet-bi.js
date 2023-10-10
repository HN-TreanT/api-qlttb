const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
  if (req.query.Ten_TTB) filter.Ten_TTB = { [Op.substring]: req.query.Ten_TTB };

  const TrangThietBis = await db.TrangThietBi.findAll({
    where: { ...filter },
    ...req.pagination,
  });
  return responseSuccessWithData({ res, data: TrangThietBis });
};

const getById = async (req, res) => {
  const TrangThietBi = await db.TrangThietBi.findByPk(req.params.id);
  if (!TrangThietBi) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: TrangThietBi });
};

const create = async (req, res) => {
  await db.TrangThietBi.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const TrangThietBi = await db.TrangThietBi.findByPk(req.params.id);
  if (!TrangThietBi) return responseInValid({ res, message: "not found can bo" });
  await TrangThietBi.update(req.body);
  return reponseSuccess({ res });
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
