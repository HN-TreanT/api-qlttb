const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
  let filterLichHoc = {};
  let filterCanBo = {};
  let filterThietBi = {};

  if (req.query.ten_nguoi_muon) filter.NguoiMuon = { [Op.substring]: req.query.ten_nguoi_muon };
  if (req.query.so_dien_thoai) filter.SoDienThoai = req.query.so_dien_thoai;
  if (req.query.search_lich_hoc) {
    filterLichHoc[Op.or] = {
      Lop: { [Op.substring]: req.query.search_lich_hoc },
      PhongHoc: { [Op.substring]: req.query.search_lich_hoc },
    };
  }
  if (req.query.ten_can_bo) {
    filterCanBo.Ten_CB = { [Op.substring]: req.query.Ten_CB };
  }

  if (req.query.Ten_TTB) filterThietBi.Ten_TTB = { [Op.substring]: req.query.Ten_TTB };

  if (req.query.time_start && req.query.time_end) {
    filter.createdAt = { [Op.between]: [req.query.time_start, req.query.time_end] };
  }
  const LichSuMuons = await db.LichSuMuon.findAll({
    where: { ...filter },
    ...req.pagination,
    include: [
      { model: db.LichHoc, as: "LichHoc", where: { ...filterLichHoc } },
      {
        model: db.CanBo,
        as: "CanBo",
        where: { ...filterCanBo },
      },
      {
        model: db.LSM_TTB,
        as: "LSM_TTB",
        include: [
          {
            model: db.TrangThietBi,
            as: "TrangThietBi",
            where: { ...filterThietBi },
          },
        ],
      },
    ],
  });
  return responseSuccessWithData({ res, data: LichSuMuons });
};

const getById = async (req, res) => {
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id);
  if (!LichSuMuon) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LichSuMuon });
};

const create = async (req, res) => {
  const { NguoiMuon, SoDienThoai, Ma_CB, Ma_LH, lst_id_lsm_ttb } = req.body;
  const lsm = await db.LichSuMuon.create({ NguoiMuon, SoDienThoai, Ma_CB, Ma_LH });
  let lst_lsm_ttb = [];
  if (lst_id_lsm_ttb) {
    lst_lsm_ttb = lst_id_lsm_ttb.map((item) => {
      return {
        Ma_LSM: lsm.Ma_LSM,
        Ma_TTB: item,
        TrangThai: "Chưa trả",
      };
    });
  }
  await db.LSM_TTB.bulkCreate(lst_lsm_ttb);
  return reponseSuccess({ res, data: lsm });
};

const edit = async (req, res) => {
  const { NguoiMuon, SoDienThoai, Ma_CB, Ma_LH, lst_lsm_ttb } = req.body;
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id);
  if (!LichSuMuon) return responseInValid({ res, message: "not found can bo" });
  await LichSuMuon.update({ NguoiMuon, SoDienThoai, Ma_CB, Ma_LH });
  if (lst_lsm_ttb) {
    lst_lsm_ttb = lst_lsm_ttb.map((item) => {
      return {
        ...item,
        Ma_LSM: LichSuMuon.Ma_LSM,
      };
    });
  }
  await db.LSM_TTB.destroy({ where: { Ma_LSM: LichSuMuon.Ma_LSM } });
  await db.LSM_TTB.bulkCreate(lst_lsm_ttb);
  return responseSuccessWithData({ res, data: LichSuMuon });
};

const deleteById = async (req, res) => {
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id);
  if (!LichSuMuon) return responseInValid({ res, message: "not found can bo" });
  await LichSuMuon.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
