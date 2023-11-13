const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  let filter = {};
  let order = [];
  if (req.query.Ma_CB) filter.Ma_CB = req.query.Ma_CB;
  if (req.query.order_ngay) order = [...order, ["Ngay", `${req.query.order_ngay}`]];
  const { count, rows } = await db.LichLamViec.findAndCountAll({
    where: { ...filter },
    order: [...order],
    ...req.pagination,
    include:[
      {
        model: db.CanBo, as:"CanBo"
      }
    ]
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
  const LichLamViec = await db.LichLamViec.findByPk(req.params.id);
  if (!LichLamViec) return responseInValid({ res, message: "Không tìm thấy lịch làm việc" });
  return responseSuccessWithData({ res, data: LichLamViec });
};

const create = async (req, res) => {
  const data = await db.LichLamViec.create(req.body);
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const LichLamViec = await db.LichLamViec.findByPk(req.params.id);
  if (!LichLamViec) return responseInValid({ res, message: "Không tìm thấy lịch làm việc" });
  await LichLamViec.update(req.body);
  return responseSuccessWithData({ res, data: LichLamViec });
};

const deleteById = async (req, res) => {
  const LichLamViec = await db.LichLamViec.findByPk(req.params.id);
  if (!LichLamViec) return responseInValid({ res, message: "Không tìm thấy lịch làm việc" });
  await LichLamViec.destroy();
  return reponseSuccess({ res });
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
};
