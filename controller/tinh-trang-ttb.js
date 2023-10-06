const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const TinhTrangTTBs = await db.TinhTrangTTB.findAll();
  return responseSuccessWithData({ res, data: TinhTrangTTBs });
};

const getById = async (req, res) => {
  const TinhTrangTTB = await db.TinhTrangTTB.findByPk(req.params.id);
  if (!TinhTrangTTB) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: TinhTrangTTB });
};

const create = async (req, res) => {
  await db.TinhTrangTTB.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const TinhTrangTTB = await db.TinhTrangTTB.findByPk(req.params.id);
  if (!TinhTrangTTB) return responseInValid({ res, message: "not found can bo" });
  await TinhTrangTTB.update(req.body);
  return reponseSuccess({ res });
};

const deleteById = async (req, res) => {
  const TinhTrangTTB = await db.TinhTrangTTB.findByPk(req.params.id);
  if (!TinhTrangTTB) return responseInValid({ res, message: "not found can bo" });
  await TinhTrangTTB.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
