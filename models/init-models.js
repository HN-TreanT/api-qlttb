const _CanBo = require("./Canbo.model");
const _LichHoc = require("./LichHoc.model");
const _LichLamViec = require("./LichLamViec.model");
const _LichSuCapNhat = require("./LichSuCapNhat.model");
const _LichSuMuon = require("./LichSuMuon.model");

const _PhongHoc = require("./PhongHoc.model")

const _LichSuTinhTrang = require("./LichSuTinhTrang.model");
const _LS_TTB = require("./LS_TTB.model");
const _LSM_TTB = require("./LSM_TTB.model");
const _TinhTrangTTB = require("./TinhTrangTTB.model");
const _TrangThietBi = require("./TrangThietBi.model");

const _role = require("./Role.model");
const Role = require("./Role.model");
const _Loai_TTB = require("./Loai_TTB.model");

const _Lop = require("./Lop.model")
const _LichHoc_Lop = require("./LichHoc_Lop.model")

function initModels() {
  const CanBo = _CanBo;
  const LichHoc = _LichHoc;
  const LichLamViec = _LichLamViec;
  const LichSuCapNhat = _LichSuCapNhat;
  const LichSuMuon = _LichSuMuon;
  const LichSuTinhTrang = _LichSuTinhTrang;
  const LS_TTB = _LS_TTB;
  const LSM_TTB = _LSM_TTB;
  const TinhTrangTTB = _TinhTrangTTB;
  const TrangThietBi = _TrangThietBi;
  const role = _role;
  const Loai_TTB = _Loai_TTB;
  const PhongHoc = _PhongHoc;
  const Lop = _Lop;
  const LichHoc_Lop = _LichHoc_Lop

  
  PhongHoc.hasMany(TrangThietBi, {as:"TrangThietBi", foreignKey:"Ma_PH"})
  TrangThietBi.belongsTo(PhongHoc, {as:"PhongHoc", foreignKey:"Ma_PH"})

  LichHoc.belongsTo(PhongHoc, {as:"PhongHoc", foreignKey:"Ma_PH"})
  PhongHoc.hasMany(LichHoc, {as:"LichHoc", foreignKey:"Ma_PH"})  

  CanBo.hasMany(LichLamViec, { as: "LichLamViec", foreignKey: "Ma_CB" });
  LichLamViec.belongsTo(CanBo, { as: "CanBo", foreignKey: "Ma_CB" });

  CanBo.hasMany(LichSuMuon, { as: "LichSuMuon", foreignKey: "Ma_CB" });
  LichSuMuon.belongsTo(CanBo, { as: "CanBo", foreignKey: "Ma_CB" });

  CanBo.hasMany(LichSuCapNhat, { as: "LichSuCapNhat", foreignKey: "Ma_CB" });
  LichSuCapNhat.belongsTo(CanBo, { as: "CanBo", foreignKey: "Ma_CB" });

  LichSuCapNhat.hasMany(LS_TTB, { as: "LS_TTB", foreignKey: "Ma_LSCN" });
  LS_TTB.belongsTo(LichSuCapNhat, { as: "LichSuCapNhat", foreignKey: "Ma_LSCN" });

  TrangThietBi.hasMany(LS_TTB, { as: "LS_TTB", foreignKey: "Ma_TTB" });
  LS_TTB.belongsTo(TrangThietBi, { as: "TrangThietBi", foreignKey: "Ma_TTB" });

  TrangThietBi.hasMany(LichSuTinhTrang, { as: "LichSuTinhTrang", foreignKey: "Ma_TTB" });
  LichSuTinhTrang.belongsTo(TrangThietBi, { as: "TrangThietBi", foreignKey: "Ma_TTB" });

  TinhTrangTTB.hasMany(LichSuTinhTrang, { as: "LichSuTinhTrang", foreignKey: "Ma_TTTTB" });
  LichSuTinhTrang.belongsTo(TinhTrangTTB, { as: "TinhTrangTTB", foreignKey: "Ma_TTTTB" });

  TrangThietBi.hasMany(LSM_TTB, { as: "LSM_TTB", foreignKey: "Ma_TTB" });
  LSM_TTB.belongsTo(TrangThietBi, { as: "TrangThietBi", foreignKey: "Ma_TTB" });

  LichSuMuon.hasMany(LSM_TTB, { as: "LSM_TTB", foreignKey: "Ma_LSM" });
  LSM_TTB.belongsTo(LichSuMuon, { as: "LichSuMuon", foreignKey: "Ma_LSM" });

  LichHoc.hasMany(LichSuMuon, { as: "LichSuMuon", foreignKey: "Ma_LH" });
  LichSuMuon.belongsTo(LichHoc, { as: "LichHoc", foreignKey: "Ma_LH" });

  role.hasMany(CanBo, { as: "CanBo", foreignKey: "role_id" });
  CanBo.belongsTo(Role, { as: "Role", foreignKey: "role_id" });

  Loai_TTB.hasMany(TrangThietBi, { as: "TrangThietBi", foreignKey: "Ma_Loai_TTB" });
  TrangThietBi.belongsTo(Loai_TTB, { as: "Loai_TTB", foreignKey: "Ma_Loai_TTB" });

  LichHoc.hasMany(LichHoc_Lop, {as:"LichHoc_Lop", foreignKey:"Ma_LH"})
  LichHoc_Lop.belongsTo(LichHoc, {as:"LichHoc", foreignKey:"Ma_LH"})

  Lop.hasMany(LichHoc_Lop, {as:"LichHoc_Lop", foreignKey:"Ma_Lop"})
  LichHoc_Lop.belongsTo(Lop, {as:"Lop", foreignKey:"Ma_Lop"})
  
  return {
    CanBo,
    TrangThietBi,
    LichHoc,
    PhongHoc,
    LichLamViec,
    LichSuMuon,
    LichSuCapNhat,
    LichSuTinhTrang,
    LS_TTB,
    LSM_TTB,
    TinhTrangTTB,
    Role,
    Loai_TTB,
    LichHoc_Lop,
    Lop,
    
  };
}
const db = initModels();
module.exports = db;
