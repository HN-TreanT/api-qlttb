const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  const { Ma_CB, LoaiCapNhat, NoiDung } = req.query;

  let filter = {};
  if (Ma_CB) filter.Ma_CB = Ma_CB;
  if (LoaiCapNhat) filter.LoaiCapNhat = LoaiCapNhat;
  if (NoiDung) filter.NoiDung = { [Op.substring]: NoiDung };
  const { count, rows } = await db.LichSuCapNhat.findAndCountAll({
    where: { ...filter },
    ...req.pagination,
    include: [
      { model: db.CanBo, as: "CanBo", attributes: { exclude: ["MatKhau"] } },
    
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
  const LichSuCapNhat = await db.LichSuCapNhat.findByPk(req.params.id, {
    include: [
      { model: db.CanBo, as: "CanBo" },
      {
        model: db.LS_TTB,
        as: "LS_TTB",
        include: [{ model: db.TrangThietBi, as: "TrangThietBi" }],
      },
    ],
  });
  if (!LichSuCapNhat) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: LichSuCapNhat });
};

const create = async (req, res) => {
  const { Ma_CB, LoaiCapNhat, NoiDung, lst_id_TTB } = req.body;
  const LichSuCapNhat = await db.LichSuCapNhat.create({ Ma_CB, LoaiCapNhat, NoiDung });
  return responseSuccessWithData({ res, data: LichSuCapNhat });
};

const edit = async (req, res) => {
  const LichSuCapNhat = await db.LichSuCapNhat.findByPk(req.params.id);
  if (!LichSuCapNhat) return responseInValid({ res, message: "not found" });
  await LichSuCapNhat.update(req.body);
  return responseSuccessWithData({ res, data: LichSuCapNhat });
};

const deleteById = async (req, res) => {
  const LichSuCapNhat = await db.LichSuCapNhat.findByPk(req.params.id);
  if (!LichSuCapNhat) return responseInValid({ res, message: "not found" });
  await db.LS_TTB.destroy({where: {Ma_LSCN: LichSuCapNhat.Ma_LSCN}});
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
