const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid } = require("../helper/ResponseRequests");
const getAll = async (req, res) => {
  const LichSuMuons = await db.LichSuMuon.findAll();
  return responseSuccessWithData({ res, data: LichSuMuons });
};

const getById = async (req, res) => {
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id);
  if (!LichSuMuon) return responseInValid({ res, message: "not found can bo" });
  return responseSuccessWithData({ res, data: LichSuMuon });
};

const create = async (req, res) => {
  await db.LichSuMuon.create(req.body);
  return reponseSuccess({ res });
};

const edit = async (req, res) => {
  const LichSuMuon = await db.LichSuMuon.findByPk(req.params.id);
  if (!LichSuMuon) return responseInValid({ res, message: "not found can bo" });
  await LichSuMuon.update(req.body);
  return reponseSuccess({ res });
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
