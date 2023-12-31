const canboRoute = require("./canbo.route");
const lscnRoute = require("./lich-su-cap-nhat.route");
const llvRoute = require("./lich-lam-viec.route");
const ls_ttbRoute = require("./lichsu-ttb.route");
const ttbRoute = require("./trang-thiet-bi.route");
const lsttRoute = require("./lich-su-tinh-trang.route");
const ttttbRoute = require("./tinh-trang-ttb.route");
const lichsumuonRoute = require("./lich-su-muon.route");
const lsm_ttbRoute = require("./lichsumuon-ttb.route");
const lichhocRoute = require("./lich-hoc.route");
const authRoute = require("./auth.route");
const roleRoute = require("./role.route");
const loai_ttbRoute = require("./loai_ttb.route");
const lop = require('./lop.route')
const lichhoc_lop = require('./lichhoc_lop.route')
const phonghoc = require('./phonghoc')
const route = (app) => {
  app.use("/api/can-bo", canboRoute);
  app.use("/api/lich-su-cap-nhat", lscnRoute);
  app.use("/api/lich-lam-viec", llvRoute);
  app.use("/api/ls-trang-thiet-bi", ls_ttbRoute);
  app.use("/api/trang-thiet-bi", ttbRoute);
  app.use("/api/lich-su-tinh-trang", lsttRoute);
  app.use("/api/tinh-trang-ttb", ttttbRoute);
  app.use("/api/lich-su-muon", lichsumuonRoute);
  app.use("/api/lsm-ttb", lsm_ttbRoute);
  app.use("/api/lich-hoc", lichhocRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/role", roleRoute);
  app.use("/api/loai-ttb", loai_ttbRoute);
  app.use("/api/lop", lop);
  app.use("/api/lichhoc_lop", lichhoc_lop);
  app.use("/api/phong_hoc", phonghoc)
};
module.exports = route;
