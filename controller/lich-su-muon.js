const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};

  if (req.query.ten_nguoi_muon) filter.NguoiMuon = { [Op.substring]: req.query.ten_nguoi_muon };
  if (req.query.so_dien_thoai) filter.SoDienThoai = req.query.so_dien_thoai;
  if (req.query.Ma_CB) {
    filter.Ma_CB = req.query.Ma_CB;
  }

  if (req.query.time_start && req.query.time_end) {
    filter.createdAt = { [Op.between]: [req.query.time_start, req.query.time_end] };
  }

  const { count, rows } = await db.LichSuMuon.findAndCountAll({
    where: { ...filter },
    ...req.pagination,
    include: [
      { model: db.LichHoc, as: "LichHoc"  ,
    },
      {
        model: db.CanBo,
        as: "CanBo",
      },
      {
        model: db.LSM_TTB,
        as: "LSM_TTB",
        include: [
          {
            model: db.TrangThietBi,
            as: "TrangThietBi",
          },
        ],
      },
    ],
  });
  const total = await db.LichSuMuon.findAll({
    where: { ...filter },
    ...req.pagination,
    include: [
      { model: db.LichHoc, as: "LichHoc"  ,
    },
      {
        model: db.CanBo,
        as: "CanBo",
      },
    ],
  });
  // const newRows = rows.map(async (item) => {
  //   const lsm_ttbs = await db.LSM_TTB.findAll({where: {Ma_LSM : item.Ma_LSM}, 
  //     include: [
  //       {
  //         model: db.TrangThietBi, as:"TrangThietBi"
  //       }
  //     ]
  //   })
  //    const lst_id_ttb = lsm_ttbs.map((lsm_ttb) => lsm_ttb.TrangThietBi.Ma_TTB)
  //   return {
  //     ...item,
  //     lst_id_ttb: lst_id_ttb
  //   }
    
  // })
  // console.log(newRows)
  return responseSuccessWithData({ res, data: { count: total.length, data: rows } });
};

const getById = async (req, res) => {
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id, {
    include: [
      { model: db.LichHoc, as: "LichHoc" },
      {
        model: db.CanBo,
        as: "CanBo",
      },
      {
        model: db.LSM_TTB,
        as: "LSM_TTB",
        include: [
          {
            model: db.TrangThietBi,
            as: "TrangThietBi",
          },
        ],
      },
    ],
  });
  if (!LichSuMuon) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: LichSuMuon });
};

const create = async (req, res) => {
  const { NguoiMuon, SoDienThoai, Ma_CB, Ma_LH, lst_id_ttb, ChuThich, TrangThai } = req.body;
  const lsm = await db.LichSuMuon.create({ NguoiMuon, SoDienThoai, Ma_CB, Ma_LH, ChuThich, TrangThai });
  let lst_lsm_ttb = [];
  if (lst_id_ttb) {
    lst_lsm_ttb = lst_id_ttb.map((item) => {
      return {
        Ma_LSM: lsm.Ma_LSM,
        Ma_TTB: item,
        TrangThai: "Chưa trả",
      };
    });
    await db.TrangThietBi.update({ TrangThai: 1 }, { where: { Ma_TTB: lst_id_ttb } });
  }
  await db.LSM_TTB.bulkCreate(lst_lsm_ttb);

  return responseSuccessWithData({ res, data: lsm });
};

const edit = async (req, res) => {
  const { NguoiMuon, SoDienThoai, Ma_CB, Ma_LH, lst_id_ttb, ChuThich, TrangThai } = req.body;
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id);
  if (!LichSuMuon) return responseInValid({ res, message: "not found" });
  await LichSuMuon.update({ NguoiMuon, SoDienThoai, Ma_CB, Ma_LH, ChuThich, TrangThai });
  let new_lst_lsm_ttb = [];
  if (lst_id_ttb) {
    new_lst_lsm_ttb = lst_id_ttb.map((item) => {
      return {
        Ma_TTB: item,
        Ma_LSM: LichSuMuon.Ma_LSM,
        TrangThai: "Chưa trả",
      };
    });
  }
  await db.LSM_TTB.destroy({ where: { Ma_LSM: LichSuMuon.Ma_LSM } });
  await db.LSM_TTB.bulkCreate(new_lst_lsm_ttb);
  return responseSuccessWithData({ res, data: LichSuMuon });
};

const deleteById = async (req, res) => {
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id);
  if (!LichSuMuon) return responseInValid({ res, message: "not found" });
  await db.LSM_TTB.destroy({where: {Ma_LSM : LichSuMuon.Ma_LSM}})
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
