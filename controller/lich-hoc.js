const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const LichHocs = await db.LichHoc.findAll();
  return responseSuccessWithData({ res, data: LichHocs });
};

const getById = async (req, res) => {
  const LichHoc = await db.LichHoc.findByPk(req.params.id);
  if (!LichHoc) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LichHoc });
};

const create = async (req, res) => {
  await db.LichHoc.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const LichHoc = await db.LichHoc.findByPk(req.params.id);
  if (!LichHoc) return responseInValid({ res, message: "not found can bo" });
  await LichHoc.update(req.body);
  return reponseSuccess({ res });
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
