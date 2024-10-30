const DonHang = require ("../models/DonHang")
const donHang = require ("../utils/constants/DonHangConstant")
const monAn = require ("../utils/constants/MonAnConstant")
const Exception = require ("../models/Exception")
const ChiTietDonHang = require ("../models/ChiTietDonHang")
const chiTietDonHang = require ("../utils/constants/ChiTietDonHangConstant")
class DonHangController 
{
    async index (req,res,next)
    {
        let obj = await DonHang.get ()
        if (!obj.success) return next (new Exception (obj.res, 500))
        return res.json (obj.res)
    }

    async getById (req,res,next)
    {
        let obj = await DonHang.getById (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.id}`},404))
        return res.json (obj.res)
    }
    
    async add (req,res,next)
    {
        let obj = await DonHang.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async update (req,res,next)
    {
        let obj = await DonHang.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (201).json (obj.res)
    }

    async delete (req,res,next)
    {
        let obj = await DonHang.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        return res.sendStatus (204)
    }

    async addChiTietDonHang (req,res,next)
    {
        if (!req.body.arr) return next (new Exception ({msg: "There is no arr in body"}, 400))
        let obj = await ChiTietDonHang.add (req.body.arr)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res) 
    }

    async updateChiTietDonHang (req,res,next)
    {
        let obj = await ChiTietDonHang.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`},404))
        return res.json (obj.res)
    }

    async deleteChiTietDonHang (req,res,next)
    {
        let obj = await ChiTietDonHang.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        return res.sendStatus (204)
    }

    async getByIdNguoiBan (req,res,next)
    {
        let obj = await DonHang.getByNguoiBan (req.params.idNguoiBan)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found idNguoiBan = ${req.params.idNguoiBan}`},404))
        let returnObj = {}
        for (let row of obj.res)
        {
            let donhang = row [donHang.tableName]
            let monan = row [monAn.tableName]
            let chitiet = row [chiTietDonHang.tableName]
            
            if (!returnObj[donhang[donHang.id]]) 
            {
                returnObj[donhang[donHang.id]] = {...donhang}
                returnObj[donhang[donHang.id]][chiTietDonHang.tableName] = []
            }

            returnObj[donhang[donHang.id]][chiTietDonHang.tableName].push ({monan,chitiet})
        }

        return res.json (Object.values (returnObj))
    }
}

module.exports = new DonHangController