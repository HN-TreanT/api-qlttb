const canboRoute = require("./canbo.route");
const lsbdRoute = require("./lich-su-bao-duong.route");
const lbdRoute = require("./lich-bao-duong.route");
const lscnRoute = require("./lich-su-cap-nhat.route");
const llvRoute = require("./lich-lam-viec.route");
const ls_ttbRoute = require("./lichsu-ttb.route");
const ttbRoute = require("./trang-thiet-bi.route");
const lsttRoute = require("./lich-su-tinh-trang.route");
const ttttbRoute = require("./tinh-trang-ttb.route");
const lichsumuonRoute = require("./lich-su-muon.route");
const lsm_ttbRoute = require("./lichsumuon-ttb.route");
const lichhocRoute = require("./lich-hoc.route");

const route = (app) => {
  app.use(canboRoute);
  app.use(lsbdRoute);
  app.use(lbdRoute);
  app.use(lscnRoute);
  app.use(llvRoute);
  app.use(ls_ttbRoute);
  app.use(ttbRoute);
  app.use(lsttRoute);
  app.use(ttttbRoute);
  app.use(lichsumuonRoute);
  app.use(lsm_ttbRoute);
  app.use(lichhocRoute);
};
module.exports = route;
