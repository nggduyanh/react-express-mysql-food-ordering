const LoaiNguoiBan = require ("../models/LoaiNguoiBan")
const Exception = require ("../models/Exception")
const LoaiNguoiBanNguoiBan = require ("../models/LoaiNguoiBan_NguoiBan")
const loaiNguoiBan = require ("../utils/constants/LoaiNguoiBanConstant")
class LoaiNguoiBanController 
{
    async index (req,res,next)
    {
        let obj = await LoaiNguoiBan.get ()
        if (!obj.success) return next (new Exception (obj.res, 500))
        return res.json (obj.res)
    }

    async getById (req,res,next)
    {
        let obj = await LoaiNguoiBan.getById (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.id}`},404))
        return res.json (obj.res)
    }
    
    async add (req,res,next)
    {
        let obj = await LoaiNguoiBan.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async update (req,res,next)
    {
        let obj = await LoaiNguoiBan.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (201).json (obj.res)
    }

    async delete (req,res,next)
    {
        let obj = await LoaiNguoiBan.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        return res.sendStatus (204)
    }
    
    async getLoaiNguoiBanByNguoiBan (req,res,next)
    {
        let obj = await LoaiNguoiBanNguoiBan.getByNguoiBan (req.params.idNguoiBan)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id NguoiBan = ${req.params.idNguoiBan}`},404))
        return res.status (200).json (obj.res.map (elem => elem[loaiNguoiBan.tableName]))
    }

}

module.exports = new LoaiNguoiBanController