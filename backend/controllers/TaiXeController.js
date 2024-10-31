const TaiXe = require ("../models/TaiXe")
const taiXe = require ("../utils/constants/TaiXeConstant")
const Exception = require ("../models/Exception")
class TaiXeController 
{
    async index (req,res,next)
    {
        let obj = await TaiXe.get ()
        if (!obj.success) return next (new Exception (obj.res, 500))
        return res.json (obj.res)
    }

    async getById (req,res,next)
    {
        let obj = await TaiXe.getById (req.params.id,"*")
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.id}`},404))
        return res.json (obj.res)
    }
    
    async add (req,res,next)
    {
        let obj = await TaiXe.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        let idDriverRole = roleService.getRoleId ("Driver")
        let idTaiXe = obj.res[0][taiXe.id]
        if (!idDriverRole) return next (new Exception ({msg: `role Driver is ${idDriverRole}`},500))
        let queryVaiTroNguoiDung = await roleService.addRoleToUser (idDriverRole,idTaiXe)
        if (!queryVaiTroNguoiDung.success) return next (new Exception (queryVaiTroNguoiDung.res,500))
        let userId = req.user.id
        let userRoles = await roleService.getIdRolesByUser (userId)
        let accessToken = jwt.sign ({userId,userRoles},process.env.secretTokenKey, {expiresIn: "1h"})
        return res.status(201).json ({"res":obj.res,accessToken})
    }

    async getCurrentTaiXe (req,res,next)
    {
        let obj = await TaiXe.getById (req.user.id, "*")
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found TaiXe id = ${req.user.id}`},404))
        return res.json (obj.res)
    }

    async update (req,res,next)
    {
        let obj = await TaiXe.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (201).json (obj.res)
    }

    async delete (req,res,next)
    {
        let obj = await TaiXe.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 404))
        let idRoleDriver = await roleService.getRoleId ("Driver")
        let deleteRoleOfNguoiBan = await roleService.deleteRoleOfUser (req.body[nguoiBan.id], idRoleDriver)
        if (!deleteRoleOfNguoiBan.success) return next (new Exception (deleteRoleOfNguoiBan.res,500))
        if (!deleteRoleOfNguoiBan.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 500))
        let userId = req.user.id
        let userRoles = await roleService.getIdRolesByUser (userId)
        let accessToken = jwt.sign ({userId,userRoles},process.env.secretTokenKey, {expiresIn: "1h"})
        return res.json ({accessToken})
    }
}

module.exports = new TaiXeController