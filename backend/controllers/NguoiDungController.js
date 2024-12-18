const NguoiDung = require ("../models/NguoiDung")
const Exception = require ("../models/Exception")
const VaiTroNguoiDung = require ("../models/VaiTro_NguoiDung") 
class NguoiDungController 
{
    async index (req,res,next)
    {
        let obj = await NguoiDung.get ()
        if (!obj.success) return next (new Exception (obj.res, 500))
        return res.json (obj.res)
    }

    async getById (req,res,next)
    {
        let obj = await NguoiDung.getById (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.id}`},404))
        return res.json (obj.res)
    }

    async getCurrentUser (req,res,next)
    {
        let {id} = req.user
        let obj = await NguoiDung.getById (id)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${id}`},404))
        return res.json (obj.res)
    }

    async update (req,res,next)
    {
        let obj = await NguoiDung.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (201).json (obj.res)
    }

    async delete (req,res,next)
    {
        let obj = await NguoiDung.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        return res.sendStatus (204)
    }

    async searchSeller (req,res,next)
    {
        let obj = await NguoiDung.search (req.params.keyword)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found keyword = ${req.params.keyword} `}, 404)) 
        return res.json (obj.res)
    }
}

module.exports = new NguoiDungController