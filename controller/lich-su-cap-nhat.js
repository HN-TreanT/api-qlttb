const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid, responseServerError } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const XLSX = require('xlsx')
const Excel = require('exceljs')
const moment = require('moment')
const getAll = async (req, res) => {
  const { Ma_CB, LoaiCapNhat, NoiDung } = req.query;

  let filter = {};
  if (Ma_CB) filter.Ma_CB = Ma_CB;
  if (LoaiCapNhat) filter.LoaiCapNhat = LoaiCapNhat;
  if (NoiDung) filter.NoiDung = { [Op.substring]: NoiDung };
  const { count, rows } = await db.LichSuCapNhat.findAndCountAll({
    where: { ...filter },
    ...req.pagination,
    include: [
      { model: db.CanBo, as: "CanBo", attributes: { exclude: ["MatKhau"] } },
    
    ],
  });
  return responseSuccessWithData({
    res,
    data: {
      count: count,
      data: rows,
    },
  });
};

const getById = async (req, res) => {
  const LichSuCapNhat = await db.LichSuCapNhat.findByPk(req.params.id, {
    include: [
      { model: db.CanBo, as: "CanBo" },
      {
        model: db.LS_TTB,
        as: "LS_TTB",
        include: [{ model: db.TrangThietBi, as: "TrangThietBi" }],
      },
    ],
  });
  if (!LichSuCapNhat) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: LichSuCapNhat });
};

const create = async (req, res) => {
  const { Ma_CB, LoaiCapNhat, NoiDung, lst_id_TTB } = req.body;
  const LichSuCapNhat = await db.LichSuCapNhat.create({ Ma_CB, LoaiCapNhat, NoiDung });
  return responseSuccessWithData({ res, data: LichSuCapNhat });
};

const edit = async (req, res) => {
  const LichSuCapNhat = await db.LichSuCapNhat.findByPk(req.params.id);
  if (!LichSuCapNhat) return responseInValid({ res, message: "not found" });
  await LichSuCapNhat.update(req.body);
  return responseSuccessWithData({ res, data: LichSuCapNhat });
};

const deleteById = async (req, res) => {
  const LichSuCapNhat = await db.LichSuCapNhat.findByPk(req.params.id);
  if (!LichSuCapNhat) return responseInValid({ res, message: "not found" });
  await db.LS_TTB.destroy({where: {Ma_LSCN: LichSuCapNhat.Ma_LSCN}});
  await LichSuCapNhat.destroy();
  return reponseSuccess({ res });
};


const importExcel =async (req, res) => {
  const file = req.file
  const url = req.url
  var workbook = new Excel.Workbook()
  workbook.xlsx.readFile(url).then(async function () {
   try {
    var worksheet = workbook.getWorksheet(1) 
    var row3 = worksheet.getRow(3)
    const NgayCapNhat = row3.getCell('I').value
    var row7 = worksheet.getRow(7)
    const Ma_CB = row7.getCell('E').value
    const LoaiCapNhat = row7.getCell('J').value

    var row6 = worksheet.getRow(6)
    const soluongthietbi = row6.getCell('J').value

    const dataLSCN = {
      Ma_CB : Ma_CB,
      createdAt:  moment(NgayCapNhat, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      LoaiCapNhat: LoaiCapNhat
    }

    let lscn_ttb = []
    for (let i= 11 ; i < soluongthietbi + 11; i ++) {
        const row = worksheet.getRow(i)
        lscn_ttb.push({
          Ma_TTB: row.getCell('G').value,
        })
    }
    const lscn = await db.LichSuCapNhat.create(dataLSCN)
    if (lscn) {
       const data = lscn_ttb.map((item) => {
          return {
            ...item,
            Ma_LSCN: lscn.Ma_LSCN
          }
        })
        await db.LS_TTB.bulkCreate(data)
    }

    let TinhTrang = ""
    if (LoaiCapNhat === "Thay mới") {
       TinhTrang = "Thiết bị được thay mới"
    } else {
      TinhTrang = "Thiết bị đã được sửa chữa"
    }

    const tinhtrangttb = await db.TinhTrangTTB.create({
      TinhTrang: "Thiết bị được thay mới",
      ViTri: "",
      GhiChu: ""
    })
    let lstinhtrang = lscn_ttb.map((item) => {
       return {
        ...item,
        Ma_TTTTB: tinhtrangttb.Ma_TTTTB,
       TG_DB: moment(NgayCapNhat, 'DD/MM/YYYY').format('YYYY-MM-DD')
       }
      
    })
    await db.LichSuTinhTrang.bulkCreate(lstinhtrang)
    const id_list_ttb = lscn_ttb.map((item) => item.Ma_TTB)
    await db.TrangThietBi.update({TrangThai: 0}, {where: {Ma_TTB: id_list_ttb}})
    return responseSuccessWithData({res, data: lscn})
   } catch (err)  {
      return responseServerError({res, err: err})
   }
  })

}

module.exports = {
  getAll,
  getById,
  create,
  edit,
  deleteById,
  importExcel,
  
};
