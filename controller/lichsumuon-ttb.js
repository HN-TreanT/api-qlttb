const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const LSM_TTBs = await db.LSM_TTB.findAll();
  return responseSuccessWithData({ res, data: LSM_TTBs });
};

const getById = async (req, res) => {
  const LSM_TTB = await db.LSM_TTB.findByPk(req.params.id);
  if (!LSM_TTB) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LSM_TTB });
};

const create = async (req, res) => {
  await db.LSM_TTB.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const LSM_TTB = await db.LSM_TTB.findByPk(req.params.id);
  if (!LSM_TTB) return responseInValid({ res, message: "not found can bo" });
  await LSM_TTB.update(req.body);
  return reponseSuccess({ res });
};

const deleteById = async (req, res) => {
  const LSM_TTB = await db.LSM_TTB.findByPk(req.params.id);
  if (!LSM_TTB) return responseInValid({ res, message: "not found can bo" });
  await LSM_TTB.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
