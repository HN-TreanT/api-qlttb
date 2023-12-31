const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const getAll = async (req, res) => {
  let filter = {};
 if(req.query.search) {
    filter.TenPhong = {[Op.substring]: req.query.search}
 }
  const { count, rows } = await db.PhongHoc.findAndCountAll({
    where: { ...filter },
    ...req.pagination,
    include:[
      {
        model: db.TrangThietBi, as:"TrangThietBi"
      }
    ]
  });

  const total = await db.PhongHoc.count({
    where: { ...filter },
  })
  return responseSuccessWithData({
    res,
    data: {
      count: total,
      data: rows,
    },
  });
};

const getById = async (req, res) => {
  const record = await db.PhongHoc.findByPk(req.params.id);
  if (!record) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: record });
};

const create = async (req, res) => {
  const phonghoc = await db.PhongHoc.findOne({where: {TenPhong: req.body?.TenPhong}})
  if (phonghoc) return responseInValid({res, message:"Phòng đã tồn tại"})
  const data = await db.PhongHoc.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const record = await db.PhongHoc.findByPk(req.params.id);
  if (!record) return responseInValid({ res, message: "not found" });
  await record.update(req.body);
  return responseSuccessWithData({ res, data: record });
};

const deleteById = async (req, res) => {
  const record = await db.PhongHoc.findByPk(req.params.id);
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
