const Exception = require ("../models/Exception")
const NhanXet = require ("../models/NhanXet")
const nhanxet = require ("../utils/constants/NhanXetConstant")
const KhuyenMaiNguoiMua = require ("../models/KhuyenMai_NguoiMua")
const khuyenMaiNguoiMua = require ("../utils/constants/KhuyenMaiNguoiMua")
const NguoiBanYeuThich = require ("../models/NguoiBanYeuThich")
const nguoiBanYeuThich = require ("../utils/constants/NguoiBanYeuThichConstant")
class NguoiMuaController 
{
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
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (201).json (obj.res)
    }

    async getNguoiMuaByNhanXet (req,res,next)
    {
        let obj = await NhanXet.getByMonAn (req.params.idMonAn)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found NguoiMua with NhanXet has ${req.params.idMonAn} `}, 404))
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
        if (!obj.res.affectedRows) return next (new Exception ({msg: `Not found resource `}, 404))
        return res.sendStatus (204) 
    }

    async addNguoiBanYeuThich (req,res,next)
    {
        let obj = await NguoiBanYeuThich.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async deleteNguoiBanYeuThich (req,res,next)
    {
        let obj = await NguoiBanYeuThich.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: `Not found resource `}, 404))
        return res.sendStatus (204) 
    }
}

module.exports = new NguoiMuaController