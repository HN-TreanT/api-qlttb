const db = require("../models/init-models");
const { reponseSuccess, responseSuccessWithData, responseInValid, responseServerError } = require("../helper/ResponseRequests");
const { Op } = require("sequelize");
const Excel = require('exceljs')
const moment = require('moment-timezone')

const getAll = async (req, res) => {
  let filter = {};
  let order = [];
  if(req.query.Ma_PH) {
    filter.Ma_PH = req.query.Ma_PH
  }
  if(req.query.NgayHoc) {
    filter.NgayHoc = req.query.NgayHoc
  }
  if (req.query.order_ngayhoc) order = [...order, ["NgayHoc", `${req.query.order_ngayhoc}`]];
  if (req.query.order_TG_BD) order = [...order, ["TG_BD", `${req.query.order_TG_BD}`]];
  if(req.query.batdau && req.query.ketthuc) filter.NgayHoc = {[Op.between] : [req.query.batdau, req.query.ketthuc]}
  const { count, rows } = await db.LichHoc.findAndCountAll({
     where: { ...filter },
     order: [...order],
    ...req.pagination,
    include: [
      { model: db.PhongHoc, as: "PhongHoc",
      },
      {
        model: db.LichHoc_Lop, as:"LichHoc_Lop",
        include: [
          { model: db.Lop, as: "Lop"}
        ]
      }
    ]
  });
   const total = await db.LichHoc.findAll({ where: { ...filter },
    include: [
      { model: db.PhongHoc, as: "PhongHoc",
      },
      {
        model: db.LichHoc_Lop, as:"LichHoc_Lop",
        include: [
          { model: db.Lop, as: "Lop"}
        ]
      }
    ]
  })

  return responseSuccessWithData({
    res,
    data: {
      count: total.length,
      data: rows,
    },
  });
};

const getById = async (req, res) => {
  const LichHoc = await db.LichHoc.findByPk(req.params.id, {
    include: [
      { model: db.PhongHoc, as: "PhongHoc",
    
      },
      {
        model: db.LichHoc_Lop, as:"LichHoc_Lop",
        include: [
          { model: db.Lop, as: "Lop"}
        ]
      }
    ]
  });
  if (!LichHoc) return responseInValid({ res, message: "not found" });
  return responseSuccessWithData({ res, data: LichHoc });
};

const create = async (req, res) => {
  const {id_lops} = req.body
  const data = await db.LichHoc.create(req.body);
  let list_lops = []
  if(id_lops) {
    list_lops =  id_lops.map((item) => {
      return {
        Ma_Lop: item,
        Ma_LH: data.Ma_LH
      }
    })
  }
  await db.LichHoc_Lop.bulkCreate(list_lops)
  return responseSuccessWithData({ res, data: data });
};

const edit = async (req, res) => {
  const {id_lops} = req.body
  const LichHoc = await db.LichHoc.findByPk(req.params.id);
  if (!LichHoc) return responseInValid({ res, message: "not found" });
  await LichHoc.update(req.body);
  let list_lops = []
  if(id_lops) {
    list_lops =  id_lops.map((item) => {
      return {
        Ma_Lop: item,
        Ma_LH: LichHoc.Ma_LH
      }
    })
  }
  await db.LichHoc_Lop.destroy({where : {Ma_LH : LichHoc.Ma_LH}})
  await db.LichHoc_Lop.bulkCreate(list_lops)
  return responseSuccessWithData({ res, data: LichHoc });
};

const deleteById = async (req, res) => {
  const LichHoc = await db.LichHoc.findByPk(req.params.id);
  if (!LichHoc) return responseInValid({ res, message: "not found" });
  await LichHoc.destroy()
  return reponseSuccess({ res });
};
const importExcel = async (req, res) => {
  const url = req.url
  var workbook = new Excel.Workbook()

  workbook.xlsx.readFile(url).then(async function() {
    try {
       var worksheet = workbook.getWorksheet(1) 
        let nonEmptyRowCount = 0;
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            // Kiểm tra giá trị cột A
            if (row.getCell(1).value !== null && row.getCell(1).value !== undefined && row.getCell(1).value !== '') {
                nonEmptyRowCount++;
            }
        });
         const countRow = nonEmptyRowCount - 2
         for(let i =6; i< countRow + 6; i++) {
             const row = worksheet.getRow(i)
             const NgayHoc = row.getCell("G").value
             const TG_BD = row.getCell("I").value
             const TG_KT = row.getCell("L").value
             const PhongHoc = row.getCell("O").value
             const phonghoc = await db.PhongHoc.findOne({where: {TenPhong: PhongHoc}})
             const LopThamGias = row.getCell("B").value
             const arrayLop = LopThamGias.toString().split(",").map((item) => item.trim())
             const lops = await db.Lop.findAll({where: {Code: arrayLop}})


            //  const originalDatetimeStr = "1899-12-30T07:00:00.000Z";

            // // Chuyển đổi thành đối tượng moment và đặt múi giờ là UTC
            // const originalDatetime = moment.utc(originalDatetimeStr);

            // // Chuyển đổi thành định dạng mong muốn và đặt múi giờ là UTC
            // const formattedTime = originalDatetime.format("HH:mm:ss");
             const dataLichHoc = {
               NgayHoc: NgayHoc,
               Ma_PH: phonghoc.Ma_PH,
              //  TG_BD:moment(TG_BD).format("HH:mm:ss"),
              //  TG_KT:moment(TG_KT).format("HH:mm:ss"),
              TG_BD:moment.utc(TG_BD).format("HH:mm:ss"),
              TG_KT:moment.utc(TG_KT).format("HH:mm:ss"),
              
             }
             console.log(dataLichHoc)
             
             const lichhoc = await db.LichHoc.create(dataLichHoc)
             if (lichhoc) {
                const lich_hoc_lops = lops.map((item) => {
                  return {
                    Ma_Lop: item.Ma_Lop,
                    Ma_LH: lichhoc.Ma_LH
                  }
                })

                await db.LichHoc_Lop.bulkCreate(lich_hoc_lops)
             }
           

         }
         return reponseSuccess({res})
    } catch(err) {
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
  importExcel
};
