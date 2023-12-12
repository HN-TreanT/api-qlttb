const Route = require("express").Router();
const controller = require("../controller/lich-hoc");
const tryCatch = require("../middleware/tryCatch");
const {requireLogin, requireRole} = require("../middleware/auth")
const {uploadFileExcel, checkFileExcel} = require("../middleware/file")
Route.get("/",requireLogin,requireRole('A','U'), tryCatch(controller.getAll));
Route.get("/:id",requireLogin,requireRole('A','U'), tryCatch(controller.getById));
Route.post("/",requireLogin,requireRole('A'), tryCatch(controller.create));
Route.put("/:id",requireLogin,requireRole('A'), controller.edit);
Route.delete("/:id",requireLogin,requireRole('A'), controller.deleteById);
Route.post("/import-excel",uploadFileExcel, checkFileExcel, tryCatch(controller.importExcel));


module.exports = Route;
