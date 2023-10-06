const Route = require("express").Router();
const controller = require("../controller/lich-lam-viec");
const tryCatch = require("../middleware/tryCatch");

Route.get("/", tryCatch(controller.getAll));
Route.get("/:id", tryCatch(controller.getById));
Route.post("/", tryCatch(controller.create));
Route.put("/:id", controller.edit);
Route.delete("/:id", controller.deleteById);

module.exports = Route;
