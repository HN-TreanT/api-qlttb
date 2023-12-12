const Route = require("express").Router();
const controller = require("../controller/lich-su-cap-nhat");
const tryCatch = require("../middleware/tryCatch");
const {uploadFileExcel, checkFileExcel, } = require("../middleware/file")
const {requireLogin, requireRole} = require('../middleware/auth')
Route.get("/",requireLogin, requireRole('A','U'), tryCatch(controller.getAll));
Route.get("/:id",requireLogin, requireRole('A','U'),  tryCatch(controller.getById));
Route.post("/",requireLogin, requireRole('A','U'),  tryCatch(controller.create));
Route.put("/:id",requireLogin, requireRole('A','U'),  tryCatch(controller.edit));
Route.delete("/:id",requireLogin, requireRole('A','U'), tryCatch( controller.deleteById));
Route.post("/import-excel",uploadFileExcel, checkFileExcel,  tryCatch(controller.importExcel));

module.exports = Route;
