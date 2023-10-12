const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const { Ma_TTB, Ma_LSCN } = req.query;
  let filter = {};
  if (Ma_TTB) filter.Ma_TTB = Ma_TTB;
  if (Ma_LSCN) filter.Ma_LSM = Ma_LSCN;

  const { count, rows } = await db.LS_TTB.findAndCountAll({
    where: {
      ...filter,
    },
    ...req.pagination,
    include: [
      { model: db.LichSuCapNhat, as: "LichSuCapNhat" },
      { model: db.TrangThietBi, as: "TrangThietBi" },
    ],
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
  const LS_TTB = await db.LS_TTB.findByPk(req.params.id, {
    include: [
      { model: db.LichSuMuon, as: "LichSuMuon" },
      { model: db.TrangThietBi, as: "TrangThietBi" },
    ],
  });
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
