const NhanXet = require ("../models/NhanXet")
const Exception = require ("../models/Exception")
class NhanXetController 
{
    async index (req,res,next)
    {
        let obj = await NhanXet.get ()
        if (!obj.success) return next (new Exception (obj.res, 500))
        return res.json (obj.res)
    }
    
    async add (req,res,next)
    {
        let obj = await NhanXet.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async update (req,res,next)
    {
        let obj = await NhanXet.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (201).json (obj.res)
    }

    async delete (req,res,next)
    {
        let obj = await NhanXet.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        return res.sendStatus (204)
    }

    async getByNguoiMua (req,res,next)
    {
        let obj = await NhanXet.getByNguoiMua (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id NguoiMua = ${req.params.id}`}, 404))
        return res.status (200).json (obj.res)
    }

    async getByMonAn (req,res,next) 
    {
        let obj = await NhanXet.getByMonAn (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id MonAn = ${req.params.id}`}, 404))
        return res.status (200).json (obj.res) 
    }
}

module.exports = new NhanXetController