const KhuyenMai = require ("../models/KhuyenMai")
const Exception = require ("../models/Exception")
const khuyenMai = require ("../utils/constants/KhuyenMaiConstant")
class KhuyenMaiController 
{
    async index (req,res,next)
    {
        let obj = await KhuyenMai.get ()
        if (!obj.success) return next (new Exception (obj.res, 500))
        return res.json (obj.res)
    }

    async getById (req,res,next)
    {
        let obj = await KhuyenMai.getById (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.id}`},404))
        return res.json (obj.res)
    }
    
    async add (req,res,next)
    {
        let obj = await KhuyenMai.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async update (req,res,next)
    {
        let obj = await KhuyenMai.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (201).json (obj.res)
    }

    async delete (req,res,next)
    {
        let obj = await KhuyenMai.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        return res.sendStatus (204)
    }

    async getKhuyenMaiByNguoiMua (req,res,next)
    {
        let obj = await KhuyenMaiNguoiMua.getByNguoiMua (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found KhuyenMai has id NguoiMua = ${req.params.id}`}, 404))
        return res.status (200).json (obj.res.map (elem => elem[khuyenMai.tableName]))
    }
}

module.exports = new KhuyenMaiController