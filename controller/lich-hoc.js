const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
  let filterPhonghOC = {};
  let order = [];
  if(req.query.Ma_PH) {
    filterPhonghOC.Ma_PH = req.query.Ma_PH
  }
  if (req.query.order_ngayhoc) order = [...order, ["NgayHoc", `${req.query.order_ngayhoc}`]];
  if (req.query.order_TG_BD) order = [...order, ["TG_BD", `${req.query.order_TG_BD}`]];
  const { count, rows } = await db.LichHoc.findAndCountAll({
     where: { ...filter },
     order: [...order],
    ...req.pagination,
    include: [
      { model: db.PhongHoc, as: "PhongHoc",
       where: { ...filterPhonghOC } ,
       required:false
      },
      {
        model: db.LichHoc_Lop, as:"LichHoc_Lop"
      }
    ]
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
  const LichHoc = await db.LichHoc.findByPk(req.params.id);
  if (!LichHoc) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: LichHoc });
};

const create = async (req, res) => {
  const data = await db.LichHoc.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const LichHoc = await db.LichHoc.findByPk(req.params.id);
  if (!LichHoc) return responseInValid({ res, message: "not found" });
  await LichHoc.update(req.body);
  return responseSuccessWithData({ res, data: LichHoc });
};

const deleteById = async (req, res) => {
  const LichHoc = await db.LichHoc.findByPk(req.params.id);
  if (!LichHoc) return responseInValid({ res, message: "not found" });
  await LichHoc.destroy()
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
