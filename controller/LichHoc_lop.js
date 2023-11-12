const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
  if(req.query.Ma_Lop) {
    filter.Ma_Lop = req.query.Ma_Lop
  }
  if(req.query.Ma_LH) {
    filter.Ma_LH = req.query.Ma_LH
  } 
 
  const { count, rows } = await db.LichHoc_Lop.findAndCountAll({
     where: { ...filter },
    ...req.pagination,
    include: [
      {model: db.Lop, as:"Lop"},
      {model: db.LichHoc, as:"LichHoc"}
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
  const record = await db.LichHoc_Lop.findByPk(req.params.id, {
    include : [
      {model:db.LichHoc, as:"LichHoc"},
      {model:db.Lop, as:"Lop"}

    ]
  });
  if (!record) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: record });
};

const create = async (req, res) => {
  const data = await db.LichHoc_Lop.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const record = await db.LichHoc_Lop.findByPk(req.params.id);
  if (!record) return responseInValid({ res, message: "not found" });
  await record.update(req.body);
  return responseSuccessWithData({ res, data: record });
};

const deleteById = async (req, res) => {
  const record = await db.LichHoc_Lop.findByPk(req.params.id);
  if (!record) return responseInValid({ res, message: "not found" });
  await record.destroy()
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
