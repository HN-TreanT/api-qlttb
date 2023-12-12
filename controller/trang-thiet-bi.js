const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
  let filterPh = {};
  let order = [];
  if (req.query.Ten_TTB) filter.Ten_TTB = { [Op.substring]: req.query.Ten_TTB };
  if (req.query.Ma_Loai_TTB) filter.Ma_Loai_TTB = req.query.Ma_Loai_TTB;
  if (req.query.TrangThai) filter.TrangThai = req.query.TrangThai
  if (req.query.order_ngaynhap) order = [...order, ["NgayNhap", `${req.query.order_ngaynhap}`]];
  if (req.query.Ma_PH) filterPh.Ma_PH = req.query.Ma_PH;
  const { rows, count } = await db.TrangThietBi.findAndCountAll({
    where: { ...filter },
    order: [...order],
    ...req.pagination,
    include: [
      { model: db.Loai_TTB, as: "Loai_TTB" },
      { model: db.PhongHoc, as: "PhongHoc" },
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

const  getTTB =  async (req, res) => {
   const {Ma_PH, Ma_Loai_TTB} = req.query
   const {limit, offset} = req.pagination

   const ttb_phong_hocs = await db.TrangThietBi.findAll({
    where: {
     ...(Ma_PH && {Ma_PH: Ma_PH}),
    //  ...{[Op.or] : [{TrangThai: 0}, {TrangThai: 3}]}
      // TrangThai: 0
    }
   })

   //kiểm tra xem ma loại trang thiết bị tìm kiếm trả về có trong trang thiết bị gắn với phòng học hay không
  const ttb_phong_hocs_pass = ttb_phong_hocs.filter((item) => item.TrangThai === 1)
   const check  = ttb_phong_hocs.filter((item) => parseInt(item?.Ma_Loai_TTB) === parseInt(Ma_Loai_TTB))
  if (check.length > 0) {
      return responseSuccessWithData({
        res, 
        data: {
          count: check.length,
          data: check
        }
      })
  }
   const id_Loai_ttb_phonghoc = ttb_phong_hocs_pass.map((item) => {
    return item.Ma_Loai_TTB
   })
   const pagination2 = {
    limit: limit - ttb_phong_hocs_pass.length,
    offset: offset
   }
   if (Ma_Loai_TTB) {
      const {count, rows} = await db.TrangThietBi.findAndCountAll({
        where : {
          Ma_Loai_TTB: Ma_Loai_TTB,
          //  TrangThai: 0
     ...{[Op.or] : [{TrangThai: 0}, {TrangThai: 3}]}

        },
        ...req.pagination,
      })
      return responseSuccessWithData({
        res, 
        data: {
          count: count,
          data: rows
        }
      })
   }
   const ttbs = await db.TrangThietBi.findAll({
    where : {
       Ma_Loai_TTB: {[Op.notIn]: id_Loai_ttb_phonghoc},
       Ma_PH: null,
      //  TrangThai: 0
     ...{[Op.or] : [{TrangThai: 0}, {TrangThai: 3}]}

 
    },
    ...pagination2   
   })
   const dataResponse = [...ttbs, ...ttb_phong_hocs_pass]
  return responseSuccessWithData({
    res, 
    data: {
      count: dataResponse.length,
      data: dataResponse
    }
  })
}

const getById = async (req, res) => {
  const TrangThietBi = await db.TrangThietBi.findByPk(req.params.id);
  if (!TrangThietBi) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: TrangThietBi });
};

const create = async (req, res) => {
  const data = await db.TrangThietBi.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const TrangThietBi = await db.TrangThietBi.findByPk(req.params.id);
  if (!TrangThietBi) return responseInValid({ res, message: "not found" });
  await TrangThietBi.update(req.body);
  return responseSuccessWithData({ res, data: TrangThietBi });
};

const deleteById = async (req, res) => {
  const TrangThietBi = await db.TrangThietBi.findByPk(req.params.id);
  if (!TrangThietBi) return responseInValid({ res, message: "not found" });
  await db.LSM_TTB.destroy({where : {Ma_TTB: TrangThietBi.Ma_TTB}})
  await db.LS_TTB.destroy({where : {Ma_TTB: TrangThietBi.Ma_TTB}})
  await db.LichSuTinhTrang.destroy({where : {Ma_TTB: TrangThietBi.Ma_TTB}})
  await TrangThietBi.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
  getTTB
};
