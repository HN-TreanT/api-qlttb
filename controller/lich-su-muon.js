const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};

  if (req.query.ten_nguoi_muon) filter.NguoiMuon = { [Op.substring]: req.query.ten_nguoi_muon };
  if (req.query.so_dien_thoai) filter.SoDienThoai = req.query.so_dien_thoai;
  if (req.query.TrangThai) filter.TrangThai = req.query.TrangThai;
  if(req.query.batdau && req.query.ketthuc) filter.createdAt = {[Op.between] : [req.query.batdau, req.query.ketthuc]}

  if (req.query.Ma_CB) {
    filter.Ma_CB = req.query.Ma_CB;
  }

  if (req.query.time_start && req.query.time_end) {
    filter.createdAt = { [Op.between]: [req.query.time_start, req.query.time_end] };
  }

  const { count, rows } = await db.LichSuMuon.findAndCountAll({
    where: { ...filter },
    order: [
      ["createdAt", "DESC"]
    ],
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
  const total = await db.LichSuMuon.count({
    where : {...filter}
  })
  // const total = await db.LichSuMuon.findAll({
  //   where: { ...filter },
  //   ...req.pagination,
  //   include: [
  //     { model: db.LichHoc, as: "LichHoc"  ,
  //   },
  //     {
  //       model: db.CanBo,
  //       as: "CanBo",
  //     },
  //   ],
  // });
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
  return responseSuccessWithData({ res, data: { count: total, data: rows } });
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
  const { NguoiMuon, SoDienThoai, Ma_CB, Ma_LH, ChuThich, TrangThai } = req.body;
  const lsm = await db.LichSuMuon.create({ NguoiMuon, SoDienThoai, Ma_CB, Ma_LH, ChuThich, TrangThai });
  return responseSuccessWithData({ res, data: lsm });
};

const edit = async (req, res) => {
  const { NguoiMuon, SoDienThoai, Ma_CB, Ma_LH, ChuThich, TrangThai } = req.body;
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id);
  if (!LichSuMuon) return responseInValid({ res, message: "not found" });
  await LichSuMuon.update({ NguoiMuon, SoDienThoai, Ma_CB, Ma_LH, ChuThich, TrangThai });
  return responseSuccessWithData({ res, data: LichSuMuon });
};

const deleteById = async (req, res) => {
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id);
  if (!LichSuMuon) return responseInValid({ res, message: "not found" });
  const list_lsm_ttb = await db.LSM_TTB.findAll({where: {Ma_LSM: LichSuMuon.Ma_LSM}})
  // await db.LSM_TTB.destroy({where: {Ma_LSM : LichSuMuon.Ma_LSM}})
  list_lsm_ttb.map(async (item) => {
    await db.LSM_TTB.destroy({where: {Ma_LSM_TTB: item.Ma_LSM_TTB}})
    if(item?.Ma_TTB) {
      await db.TrangThietBi.update({TrangThai: 0}, {where: {Ma_TTB: item?.Ma_TTB}})

    }
  })
  await LichSuMuon.destroy();
  return reponseSuccess({ res });
};

const traThietBi = async (req, res) => {
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id);
  if (!LichSuMuon) return responseInValid({ res, message: "not found" });
  await LichSuMuon.update({TrangThai: 1})
  await db.LSM_TTB.update(req.body, { where: { Ma_LSM: LichSuMuon.Ma_LSM } })
  if (req.body) {
   req.body.forEach(async (item) => {
      await db.LSM_TTB.update({
        ...item,
        TrangThai: "Đã trả"
      }, {where: {Ma_LSM_TTB: item?.Ma_LSM_TTB}})
      if(item?.Ma_TTB) {
         if (item?.Hong) {
          await db.TrangThietBi.update({TrangThai: 3}, {where: {Ma_TTB: item?.Ma_TTB}})
         } else {
          await db.TrangThietBi.update({TrangThai: 0}, {where: {Ma_TTB: item?.Ma_TTB}})
         }

      }
   });
  }
  return responseSuccessWithData({res, data: LichSuMuon})
} 

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
  traThietBi
};
