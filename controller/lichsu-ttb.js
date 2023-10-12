const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  let filter = {};
  const { count, rows } = await db.LS_TTB.findAndCountAll({
    where: {
      ...filter,
    },
    ...req.pagination,
  });
  return responseSuccessWithData({
    res,
    data: {
      count: rows.length,
      data: rows,
    },
  });
};

const getById = async (req, res) => {
  const LS_TTB = await db.LS_TTB.findByPk(req.params.id);
  if (!LS_TTB) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LS_TTB });
};

const create = async (req, res) => {
  await db.LS_TTB.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const LS_TTB = await db.LS_TTB.findByPk(req.params.id);
  if (!LS_TTB) return responseInValid({ res, message: "not found can bo" });
  await LS_TTB.update(req.body);
  return reponseSuccess({ res });
};

const deleteById = async (req, res) => {
  const LS_TTB = await db.LS_TTB.findByPk(req.params.id);
  if (!LS_TTB) return responseInValid({ res, message: "not found can bo" });
  await LS_TTB.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
