const DonHang = require ("../models/DonHang")
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
        let obj = await ChiTietDonHang.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res) 
    }

    async updateChiTietDonHang (req,res,next)
    {
        let obj = await ChiTietDonHang.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id MonAn = ${req.body[chiTietDonHang.maMonAn]} and id DonHang = ${req.body[chiTietDonHang.maDonHang]}`},404))
        return res.json (obj.res)
    }

    async deleteChiTietDonHang (req,res,next)
    {
        let obj = await ChiTietDonHang.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        return res.sendStatus (204)
    }
}

module.exports = new DonHangController