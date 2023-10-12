const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const { Ma_TTB, Ma_TTTTB } = req.query;
  let filter = {};
  if (Ma_TTB) filter.Ma_TTB = Ma_TTB;
  if (Ma_TTTTB) filter.Ma_TTTTB = Ma_TTTTB;

  const { count, rows } = await db.LichSuTinhTrang.findAndCountAll({
    where: { ...filter },
    order: [["updatedAt", "DESC"]],
    ...req.pagination,
    include: [
      {
        model: db.TrangThietBi,
        as: "TrangThietBi",
      },
      {
        model: db.TinhTrangTTB,
        as: "TinhTrangTTB",
      },
    ],
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
  const LichSuTinhTrang = await db.LichSuTinhTrang.findByPk(req.params.id, {
    include: [
      {
        model: db.TrangThietBi,
        as: "TrangThietBi",
      },
      {
        model: db.TinhTrangTTB,
        as: "TinhTrangTTB",
      },
    ],
  });
  if (!LichSuTinhTrang) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LichSuTinhTrang });
};

const create = async (req, res) => {
  const data = await db.LichSuTinhTrang.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const LichSuTinhTrang = await db.LichSuTinhTrang.findByPk(req.params.id);
  if (!LichSuTinhTrang) return responseInValid({ res, message: "not found can bo" });
  await LichSuTinhTrang.update(req.body);
  return responseSuccessWithData({ res, data: LichSuTinhTrang });
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
