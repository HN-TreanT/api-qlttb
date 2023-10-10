const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  let filter = {};
  const LichBaoDuongs = await db.LichBaoDuong.findAll({
    where: { ...filter },
    ...req.pagination,
  });
  return responseSuccessWithData({ res, data: LichBaoDuongs });
};

const getById = async (req, res) => {
  const LichBaoDuong = await db.LichBaoDuong.findByPk(req.params.id);
  if (!LichBaoDuong) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LichBaoDuong });
};

const create = async (req, res) => {
  await db.LichBaoDuong.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const LichBaoDuong = await db.LichBaoDuong.findByPk(req.params.id);
  if (!LichBaoDuong) return responseInValid({ res, message: "not found can bo" });
  await LichBaoDuong.update(req.body);
  return reponseSuccess({ res });
};

const deleteById = async (req, res) => {
  const LichBaoDuong = await db.LichBaoDuong.findByPk(req.params.id);
  if (!LichBaoDuong) return responseInValid({ res, message: "not found can bo" });
  await LichBaoDuong.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
