const NguoiMua = require ("../models/NguoiMua")
const Exception = require ("../models/Exception")
const NhanXet = require ("../models/NhanXet")
const nhanxet = require ("../utils/constants/NhanXetConstant")
const KhuyenMaiNguoiMua = require ("../models/KhuyenMai_NguoiMua")
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
        let obj = await NhanXet.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async updateNhanXet (req,res,next)
    {
        let obj = await NhanXet.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id NguoiMua = ${req.body[nhanxet.maNguoiMua]} or id MonAn = ${req.body[nhanxet.maMonAn]}`}, 404))
        return res.status (201).json (obj.res)
    }

    async getNguoiMuaByNhanXet (req,res,next)
    {
        let obj = await NhanXet.getByMonAn (req.params.idMonAn)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found NhanXet has id MonAn = ${req.params.idMonAn} `}, 404))
        return res.status (200).json (obj.res)
    }

    async addKhuyenMai (req,res,next)
    {
        let obj = await KhuyenMaiNguoiMua.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async deleteKhuyenMai (req,res,next)
    {
        let obj = await KhuyenMaiNguoiMua.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found NhanXet has id MonAn = ${req.params.idMonAn} `}, 404))
        return res.sendStatus (204) 
    }
}

module.exports = new NguoiMuaController