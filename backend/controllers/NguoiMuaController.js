const NguoiMua = require ("../models/NguoiMua")
const Exception = require ("../models/Exception")
const NhanXet = require ("../models/NhanXet")
const nhanxet = require ("../utils/constants/NhanXetConstant")
class NguoiMuaController 
{
    async index (req,res,next)
    {
        let obj = await NguoiMua.get ()
        if (!obj.success) return next (new Exception (obj.res, 500))
        return res.json (obj.res)
    }

    async getById (req,res,next)
    {
        let obj = await NguoiMua.getById (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.id}`},404))
        return res.json (obj.res)
    }
    
    async add (req,res,next)
    {
        let obj = await NguoiMua.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async update (req,res,next)
    {
        let obj = await NguoiMua.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (201).json (obj.res)
    }

    async delete (req,res,next)
    {
        let obj = await NguoiMua.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        return res.sendStatus (204)
    }

    async addNhanXet (req,res,next)
    {
        let nhanXetObj =
        {
            [nhanxet.maNguoiMua] : req.params.id,
            [nhanxet.maMonAn]: req.params.idMonAn,
            ...req.body
        }
        let obj = await NhanXet.add (nhanXetObj)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async updateNhanXet (req,res,next)
    {
        let nhanXetObj =
        {
            [nhanxet.maNguoiMua] : req.params.id,
            [nhanxet.maMonAn]: req.params.idMonAn,
            ...req.body
        }
        let obj = await NhanXet.update (nhanXetObj)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id NguoiMua = ${req.params.id} or id MonAn = ${req.params.idMonAn}`}, 404))
        return res.status (201).json (obj.res)
    }

    async getNhanXetByNguoiMua (req,res,next)
    {
        let obj = await NhanXet.getByNguoiMua (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id NguoiMua = ${req.params.id}`}, 404))
        return res.status (200).json (obj.res)
    }
}

module.exports = new NguoiMuaController