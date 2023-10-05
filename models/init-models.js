const _canbo = require("./Canbo.model");
const _LichBaoDuong = require("./LichBaoDuong");
const _LichHoc = require("./LichHoc.model");
const _LichLamViec = require("./LichLamViec.model");
const _LichSuBaoDuong = require("./LichSuBaoDuong.model");
const _LichSuCapNhat = require("./LichSuCapNhat.model");
const _LichSuMuon = require("./LichSuMuon.model");

const _LichSuTinhTrang = require("./LichSuTinhTrang.model");
const _LS_TTB = require("./LS_TTB.model");
const _LSM_TTB = require("./LSM_TTB.model");
const _TinhTrangTTB = require("./TinhTrangTTB.model");
const _TrangThietBi = require("./TrangThietBi.model");

function initModels() {
  const canbo = _canbo;
  const LichBaoDuong = _LichBaoDuong;
  const LichHoc = _LichHoc;
  const LichLamViec = _LichLamViec;
  const LichSuBaoDuong = _LichSuBaoDuong;
  const LichSuCapNhat = _LichSuCapNhat;
  const LichSuMuon = _LichSuMuon;
  const LichSuTinhTrang = _LichSuTinhTrang;
  const LS_TTB = _LS_TTB;
  const LSM_TTB = _LSM_TTB;
  const TinhTrangTTB = _TinhTrangTTB;
  const TrangThietBi = _TrangThietBi;
  return {
    canbo,
    TrangThietBi,
    LichHoc,
    LichLamViec,
    LichBaoDuong,
    LichSuBaoDuong,
    LichSuMuon,
    LichSuCapNhat,
    LichSuTinhTrang,
    LS_TTB,
    LSM_TTB,
    TinhTrangTTB,
  };
}
const db = initModels();
module.exports = db;
