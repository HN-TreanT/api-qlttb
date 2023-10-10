const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  let filter = {};
  const { count, rows } = await db.LichSuCapNhat.findAndCountAll({
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
  const LichSuCapNhat = await db.LichSuCapNhat.findByPk(req.params.id);
  if (!LichSuCapNhat) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LichSuCapNhat });
};

const create = async (req, res) => {
  await db.LichSuCapNhat.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const LichSuCapNhat = await db.LichSuCapNhat.findByPk(req.params.id);
  if (!LichSuCapNhat) return responseInValid({ res, message: "not found can bo" });
  await LichSuCapNhat.update(req.body);
  return reponseSuccess({ res });
};

const deleteById = async (req, res) => {
  const LichSuCapNhat = await db.LichSuCapNhat.findByPk(req.params.id);
  if (!LichSuCapNhat) return responseInValid({ res, message: "not found can bo" });
  await LichSuCapNhat.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
