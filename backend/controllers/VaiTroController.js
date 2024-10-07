const VaiTro = require ("../models/VaiTro")
const Exception = require ("../models/Exception")
const VaiTroNguoiDung = require ("../models/VaiTro_NguoiDung")
const vaiTro = require ("../utils/constants/VaiTroConstant")
class VaiTroController 
{
    async index (req,res,next)
    {
        let obj = await VaiTro.get ()
        if (!obj.success) return next (new Exception (obj.res, 500))
        return res.json (obj.res)
    }

    async getById (req,res,next)
    {
        let obj = await VaiTro.getById (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.id}`},404))
        return res.json (obj.res)
    }
    
    async add (req,res,next)
    {
        let obj = await VaiTro.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async update (req,res,next)
    {
        let obj = await VaiTro.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (201).json (obj.res)
    }

    async delete (req,res,next)
    {
        let obj = await VaiTro.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        return res.sendStatus (204)
    }

    async getRoleByNguoiDung (req,res,next)
    {
        let obj = await VaiTroNguoiDung.getByNguoiDung (req.params.idNguoiDung)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id Role of NguoiDung which has id = ${req.params.idNguoiDung}`},404))
        return res.status (200).json (obj.res.map (elem => elem[vaiTro.tableName]))
    }
}

module.exports = new VaiTroController