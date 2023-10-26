const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  const { DonVi, CongViec, Ten_CB } = req.query;

  let filter = {};
  let filterLLV = {};
  let filterCanBo = {};
  if (DonVi) filter.DonVi = { [Op.substring]: DonVi };
  if (CongViec) filterLLV.CongViec = { [Op.substring]: CongViec };
  if (Ten_CB) filterCanBo.Ten_CB = { [Op.substring]: Ten_CB };
  const { count, rows } = await db.LichBaoDuong.findAndCountAll({
    where: { ...filter },
    ...req.pagination,
    include: [
      {
        model: db.LichLamViec,
        as: "LichLamViec",
        where: { ...filterLLV },
        include: [
          {
            model: db.CanBo,
            as: "CanBo",
            attributes: { exclude: ["MatKhau"] },
            where: { ...filterCanBo },
          },
        ],
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
  const LichBaoDuong = await db.LichBaoDuong.findByPk(req.params.id, {
    include: [
      {
        model: db.LichLamViec,
        as: "LichLamViec",
        include: [
          {
            model: db.CanBo,
            as: "CanBo",
            attributes: { exclude: ["MatKhau"] },
          },
        ],
      },
    ],
  });
  if (!LichBaoDuong) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: LichBaoDuong });
};

const create = async (req, res) => {
  const data = await db.LichBaoDuong.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const LichBaoDuong = await db.LichBaoDuong.findByPk(req.params.id);
  if (!LichBaoDuong) return responseInValid({ res, message: "not found" });
  await LichBaoDuong.update(req.body);
  return responseSuccessWithData({ res, data: LichBaoDuong });
};

const deleteById = async (req, res) => {
  const LichBaoDuong = await db.LichBaoDuong.findByPk(req.params.id);
  if (!LichBaoDuong) return responseInValid({ res, message: "not found" });
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
