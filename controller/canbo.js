const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const canbos = await db.CanBo.findAll();
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
