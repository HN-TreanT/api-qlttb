const Route = require("express").Router();
const controller = require("../controller/lich-bao-duong");
const tryCatch = require("../middleware/tryCatch");

Route.get("/",requireRole('A','U'),  tryCatch(controller.getAll));
Route.get("/:id",requireRole('A','U'),  tryCatch(controller.getById));
Route.post("/",requireRole('A'),  tryCatch(controller.create));
Route.put("/:id",requireRole('A'),  controller.edit);
Route.delete("/:id",requireRole('A'),  controller.deleteById);

module.exports = Route;
