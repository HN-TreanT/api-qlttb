const Route = require("express").Router();
const { reponseSuccess, responseSuccessWithData, responseServerError } = require("../helper/ResponseRequests");
const db = require("../models/init-models");

Route.get("/", async (req, res) => {
  try {
    const roles = await db.Role.findAll();
    return responseSuccessWithData({ res, data: roles });
  } catch (errr) {
    return responseServerError({ res, err: errr.message });
  }
});

Route.post("/", async (req, res) => {
  try {
    await db.Role.create(req.body);
    return reponseSuccess({ res });
  } catch (errr) {
    return responseServerError({ res, err: errr.message });
  }
});
module.exports = Route;
