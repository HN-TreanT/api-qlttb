const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  let filter = {};
  const { count, rows } = await db.LichSuBaoDuong.findAndCountAll({
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
