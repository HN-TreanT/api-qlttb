const Route = require("express").Router();
const controller = require("../controller/canbo");
const { requireLogin, requireRole } = require("../middleware/auth");
const tryCatch = require("../middleware/tryCatch");

Route.get("/",requireLogin,requireRole('A'), tryCatch(controller.getAll));
Route.get("/:id",requireLogin,requireRole('A'),  tryCatch(controller.getById));
Route.post("/",requireLogin,requireRole('A'),  tryCatch(controller.create));
Route.put("/:id",requireLogin,  controller.edit);
Route.delete("/:id",requireLogin,requireRole('A'), controller.deleteById);

module.exports = Route;
