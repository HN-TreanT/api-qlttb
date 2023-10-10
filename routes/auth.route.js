const Route = require("express").Router();
const controller = require("../controller/auth");
const tryCatch = require("../middleware/tryCatch");
const { requireLogin, requireRole } = require("../middleware/auth");

Route.post("/login", tryCatch(controller.login));
Route.post("/register", tryCatch(controller.register));
Route.post("/change-password", tryCatch(controller.change_password));
Route.get("/me", requireLogin, tryCatch(controller.getMe));
module.exports = Route;
