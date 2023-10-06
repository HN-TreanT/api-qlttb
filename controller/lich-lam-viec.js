const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const LichLamViecs = await db.LichLamViec.findAll();
  return responseSuccessWithData({ res, data: LichLamViecs });
};

const getById = async (req, res) => {
  const LichLamViec = await db.LichLamViec.findByPk(req.params.id);
  if (!LichLamViec) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LichLamViec });
};

const create = async (req, res) => {
  await db.LichLamViec.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const LichLamViec = await db.LichLamViec.findByPk(req.params.id);
  if (!LichLamViec) return responseInValid({ res, message: "not found can bo" });
  await LichLamViec.update(req.body);
  return reponseSuccess({ res });
};

const deleteById = async (req, res) => {
  const LichLamViec = await db.LichLamViec.findByPk(req.params.id);
  if (!LichLamViec) return responseInValid({ res, message: "not found can bo" });
  await LichLamViec.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
