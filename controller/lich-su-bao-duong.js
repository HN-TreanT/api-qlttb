const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const { Ma_LBD, Ma_CB } = req.query;
  let filter = {};
  if (Ma_LBD) filter.Ma_LBD = Ma_LBD;
  if (Ma_CB) filter.Ma_CB = Ma_CB;
  const { count, rows } = await db.LichSuBaoDuong.findAndCountAll({
    where: { ...filter },
    order: [["createdAt", "DESC"]],
    ...req.pagination,
    include: [
      {
        model: db.CanBo,
        as: "CanBo",
      },
      {
        model: db.LichBaoDuong,
        as: "LichBaoDuong",
      },
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
  const LichSuBaoDuong = await db.LichSuBaoDuong.findByPk(req.params.id, {
    include: [
      {
        model: db.CanBo,
        as: "CanBo",
      },
      {
        model: db.LichBaoDuong,
        as: "LichBaoDuong",
      },
    ],
  });
  if (!LichSuBaoDuong) return responseInValid({ res, message: "not found " });
  return responseSuccessWithData({ res, data: LichSuBaoDuong });
};

const create = async (req, res) => {
  const data = await db.LichSuBaoDuong.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const LichSuBaoDuong = await db.LichSuBaoDuong.findByPk(req.params.id);
  if (!LichSuBaoDuong) return responseInValid({ res, message: "not found " });
  await LichSuBaoDuong.update(req.body);
  return responseSuccessWithData({ res, data: LichSuBaoDuong });
};

const deleteById = async (req, res) => {
  const LichSuBaoDuong = await db.LichSuBaoDuong.findByPk(req.params.id);
  if (!LichSuBaoDuong) return responseInValid({ res, message: "not found" });
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
