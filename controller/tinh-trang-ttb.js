const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
  const { ViTri, TinhTrang } = req.query;
  if (ViTri) filter.ViTri = { [Op.substring]: ViTri };
  if (TinhTrang) filter.TinhTrang = { [Op.substring]: TinhTrang };
  const { rows, count } = await db.TinhTrangTTB.findAndCountAll({
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
  const TinhTrangTTB = await db.TinhTrangTTB.findByPk(req.params.id);
  if (!TinhTrangTTB) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: TinhTrangTTB });
};

const create = async (req, res) => {
  const data = await db.TinhTrangTTB.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const TinhTrangTTB = await db.TinhTrangTTB.findByPk(req.params.id);
  if (!TinhTrangTTB) return responseInValid({ res, message: "not found" });
  await TinhTrangTTB.update(req.body);
  return responseSuccessWithData({ res, data: TinhTrangTTB });
};

const deleteById = async (req, res) => {
  const TinhTrangTTB = await db.TinhTrangTTB.findByPk(req.params.id);
  if (!TinhTrangTTB) return responseInValid({ res, message: "not found" });
  await TinhTrangTTB.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
