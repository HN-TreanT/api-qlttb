const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  let filter = {};
  const LichSuTinhTrangs = await db.LichSuTinhTrang.findAll({
    where: { ...filter },
    ...req.pagination,
  });
  return responseSuccessWithData({ res, data: LichSuTinhTrangs });
};

const getById = async (req, res) => {
  const LichSuTinhTrang = await db.LichSuTinhTrang.findByPk(req.params.id);
  if (!LichSuTinhTrang) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LichSuTinhTrang });
};

const create = async (req, res) => {
  await db.LichSuTinhTrang.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const LichSuTinhTrang = await db.LichSuTinhTrang.findByPk(req.params.id);
  if (!LichSuTinhTrang) return responseInValid({ res, message: "not found can bo" });
  await LichSuTinhTrang.update(req.body);
  return reponseSuccess({ res });
};

const deleteById = async (req, res) => {
  const LichSuTinhTrang = await db.LichSuTinhTrang.findByPk(req.params.id);
  if (!LichSuTinhTrang) return responseInValid({ res, message: "not found can bo" });
  await LichSuTinhTrang.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
