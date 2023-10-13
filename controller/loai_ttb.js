const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const { Ten_Loai } = req.query;

  let filter = {};
  if (Ten_Loai) filter.Ten_Loai = Ten_Loai;
  const { count, rows } = await db.Loai_TTB.findAndCountAll({
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
  const Loai_TTB = await db.Loai_TTB.findByPk(req.params.id);
  if (!Loai_TTB) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: Loai_TTB });
};

const create = async (req, res) => {
  const data = await db.Loai_TTB.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const Loai_TTB = await db.Loai_TTB.findByPk(req.params.id);
  if (!Loai_TTB) return responseInValid({ res, message: "not found can bo" });
  const data = await Loai_TTB.update(req.body);
  return responseSuccessWithData({ res, data: data });
};

const deleteById = async (req, res) => {
  const Loai_TTB = await db.Loai_TTB.findByPk(req.params.id);
  if (!Loai_TTB) return responseInValid({ res, message: "not found can bo" });
  await Loai_TTB.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
