const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const { Ma_TTB, Ma_LSCN } = req.query;

  let filter = {};
  if (Ma_TTB) filter.Ma_TTB = Ma_TTB;
  if (Ma_LSCN) filter.Ma_LSCN = Ma_LSCN;

  const { count, rows } = await db.LSM_TTB.findAndCountAll({
    where: { ...filter },
    order: [["createdAt", "DESC"]],
    ...req.pagination,
  });
  return responseSuccessWithData({
    res,
    data: {
      count: rows.length,
      rows: rows,
    },
  });
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
