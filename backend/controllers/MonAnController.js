const NguoiBan = require ("../models/MonAn")
const Exception = require ("../models/Exception")
class MonAnController 
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

    async getByNguoiBan (req,res,next)
    {
        let obj = await NguoiBan.getByNguoiBan (req.params.id)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id NguoiBan = ${req.params.id}`},404))
        return res.status (200).json (obj.res)
    }
}

module.exports = new MonAnController