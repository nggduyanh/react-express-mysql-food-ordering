const NguoiBan = require ("../models/NguoiBan")
const Exception = require ("../models/Exception")
const LoaiNguoiBanNguoiBan = require ("../models/LoaiNguoiBan_NguoiBan")
const loaiNguoiBanNguoiBan = require ("../utils/constants/LoaiNguoiBanNguoiBanConstant")
const NhanXet = require ("../models/NhanXet")
const nhanXet = require ("../utils/constants/NhanXetConstant")
const NguoiBanYeuThich = require ("../models/NguoiBanYeuThich")
const nguoiBan = require ("../utils/constants/NguoiBanConstant")
class NguoiBanController 
{
    async index (req,res,next)
    {
        let obj = await NguoiBan.get ()
        if (!obj.success) return next (new Exception (obj.res, 500))
        return res.json (obj.res)
    }

    async getById (req,res,next)
    {
        let obj = await NguoiBan.getById (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.id}`},404))
        return res.json (obj.res)
    }
    
    async add (req,res,next)
    {
        let obj = await NguoiBan.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async update (req,res,next)
    {
        let obj = await NguoiBan.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (201).json (obj.res)
    }

    async delete (req,res,next)
    {
        let obj = await NguoiBan.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        return res.sendStatus (204)
    }

    
    async deleteLoaiNguoiBan (req,res,next)
    {
        let obj = await LoaiNguoiBanNguoiBan.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.sendStatus (204)
    }

    async addLoaiNguoiBan (req,res,next)
    {
        let obj = await LoaiNguoiBanNguoiBan.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status (201).json (obj.res)  
    }

    async replyNhanXet (req,res,next)
    {
        let obj = await NhanXet.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (200).json (obj.res)
    }

    async getByNguoiBanYeuThich (req,res,next)
    {
        let obj = await NguoiBanYeuThich.getByNguoiMua (req.params.idNguoiMua)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.idNguoiMua}`},404))
        return res.status (200).json (obj.res.map (elem => elem[nguoiBan.tableName]))
    }

    async getNhanXetByNguoiBan (req,res,next)
    {
        let obj = await NhanXet.getByNguoiMua (req.params.idNguoiBan)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.idNguoiMua}`},404))
        return res.status (200).json (obj.res)
    }
}

module.exports = new NguoiBanController