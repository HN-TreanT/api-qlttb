const Route = require("express").Router();
const controller = require("../controller/phonghoc");
const tryCatch = require("../middleware/tryCatch");
const {requireLogin, requireRole} = require('../middleware/auth')
Route.get("/",requireLogin, requireRole('A','U'), tryCatch(controller.getAll));
Route.get("/:id",requireLogin, requireRole('A','U'), tryCatch(controller.getById));
Route.post("/",requireLogin, requireRole('A'), tryCatch(controller.create));
Route.put("/:id",requireLogin, requireRole('A'), controller.edit);
Route.delete("/:id",requireLogin, requireRole('A'), controller.deleteById);

module.exports = Route;
