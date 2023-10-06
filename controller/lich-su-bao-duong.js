const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const LichSuBaoDuongs = await db.LichSuBaoDuong.findAll();
  return responseSuccessWithData({ res, data: LichSuBaoDuongs });
};

const getById = async (req, res) => {
  const LichSuBaoDuong = await db.LichSuBaoDuong.findByPk(req.params.id);
  if (!LichSuBaoDuong) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LichSuBaoDuong });
};

const create = async (req, res) => {
  await db.LichSuBaoDuong.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const LichSuBaoDuong = await db.LichSuBaoDuong.findByPk(req.params.id);
  if (!LichSuBaoDuong) return responseInValid({ res, message: "not found can bo" });
  await LichSuBaoDuong.update(req.body);
  return reponseSuccess({ res });
};

const deleteById = async (req, res) => {
  const LichSuBaoDuong = await db.LichSuBaoDuong.findByPk(req.params.id);
  if (!LichSuBaoDuong) return responseInValid({ res, message: "not found can bo" });
  await LichSuBaoDuong.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
