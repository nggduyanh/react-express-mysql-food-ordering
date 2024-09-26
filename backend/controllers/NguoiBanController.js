const NguoiBan = require ("../models/NguoiBan")
const Exception = require ("../models/Exception")
class NguoiBanController 
{
    async index (req,res,next)
    {
        res.json (await NguoiBan.get ())
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
        res.json (await NguoiBan.add (req.body))
    }

    async update (req,res,next)
    {
        res.json (await NguoiBan.update (req.body))
    }

    async delete (req,res,next)
    {
        res.json (await NguoiBan.remove (req.body))
    }
}

module.exports = new NguoiBanController