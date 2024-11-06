const NguoiBan = require ("../models/NguoiBan")
const Exception = require ("../models/Exception")
const LoaiNguoiBanNguoiBan = require ("../models/LoaiNguoiBan_NguoiBan")
const loaiNguoiBanNguoiBan = require ("../utils/constants/LoaiNguoiBanNguoiBanConstant")
const NhanXet = require ("../models/NhanXet")
const nhanXet = require ("../utils/constants/NhanXetConstant")
const NguoiBanYeuThich = require ("../models/NguoiBanYeuThich")
const nguoiBan = require ("../utils/constants/NguoiBanConstant")
const roleService = require ("../services/RoleService")
const jwt = require ("jsonwebtoken")
const anhNhanXet = require ("../utils/constants/AnhNhanXetConstant")
const nhanxet = require ("../utils/constants/NhanXetConstant")
const nguoidung = require ("../utils/constants/NguoiDungConstant")
class NguoiBanController 
{
    async index (req,res,next)
    {
        let obj = await NguoiBan.get ()
        if (!obj.success) return next (new Exception (obj.res, 500))
        return res.json (obj.res)
    }

    async getById (req,res,next)
    {
        let obj = await NguoiBan.getById (req.params.id,[nguoiBan.id,nguoiBan.anh,nguoiBan.diaChi,nguoiBan.thanhPho,nguoiBan.moCua,nguoiBan.dongCua,nguoiBan.hotline,nguoiBan.email].join (","))
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.id}`},404))
        return res.json (obj.res)
    }

    async getCurrentNguoiBan (req,res,next)
    {
        let obj = await NguoiBan.getById (req.user.id, "*")
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found NguoiBan id = ${req.user.id}`},404))
        return res.json (obj.res)
    }
    
    async add (req,res,next)
    {
        let obj = await NguoiBan.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        let idSellerRole = await roleService.getRoleId ("Seller")
        let idNguoiBan = obj.res[0][nguoiBan.id]
        if (!idSellerRole) return next (new Exception ({msg: `role Seller is ${idSellerRole}`},500))
        let queryVaiTroNguoiDung = await roleService.addRoleToUser (idSellerRole,idNguoiBan)
        if (!queryVaiTroNguoiDung.success) return next (new Exception (queryVaiTroNguoiDung.res,500))
        let userId = req.user.id
        let userRoles = await roleService.getIdRolesByUser (userId)
        let accessToken = jwt.sign ({userId,userRoles},process.env.secretTokenKey, {expiresIn: "24h"})
        return res.status(201).json ({"res": obj.res, accessToken})
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
        let idRoleSeller = await roleService.getRoleId ("Seller")
        let deleteRoleOfNguoiBan = await roleService.deleteRoleOfUser (req.body[nguoiBan.id], idRoleSeller)
        if (!deleteRoleOfNguoiBan.success) return next (new Exception (deleteRoleOfNguoiBan.res,500))
        if (!deleteRoleOfNguoiBan.res.affectedRows) return next (new Exception ({msg: "Not found resource"}, 500))
        let userId = req.user.id
        let userRoles = await roleService.getIdRolesByUser (userId)
        let accessToken = jwt.sign ({userId,userRoles},process.env.secretTokenKey, {expiresIn: "24h"})
        return res.json ({accessToken})
    }

    
    async deleteLoaiNguoiBan (req,res,next)
    {
        let obj = await LoaiNguoiBanNguoiBan.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.sendStatus (204)
    }

    async addLoaiNguoiBan (req,res,next)
    {
        let obj = await LoaiNguoiBanNguoiBan.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status (201).json (obj.res)  
    }

    async replyNhanXet (req,res,next)
    {
        let obj = await NhanXet.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        return res.status (200).json (obj.res)
    }

    async getByNguoiBanYeuThich (req,res,next)
    {
        let obj = await NguoiBanYeuThich.getByNguoiMua (req.params.idNguoiMua)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.idNguoiMua}`},404))
        return res.status (200).json (obj.res.map (elem => elem[nguoiBan.tableName]))
    }

    async getNhanXetByNguoiBan (req,res,next)
    {
        let obj = await NhanXet.getByNguoiBan (req.params.idNguoiBan)
        if (!obj.success) return next (new Exception (obj.res,500))
        if (!obj.res.length) return next (new Exception ({msg: `Not found id = ${req.params.idNguoiBan}`},404))
        let newObj = {}
        obj.res.forEach (elem => {
            let {AnhDinhKem} = elem[anhNhanXet.tableName]
            let comment = elem[nhanxet.tableName]
            let {TenNguoiDung,AnhNguoiDung} = elem[nguoidung.tableName]

            if (!newObj[comment[nhanxet.maMonAn]])
            {
                newObj[comment[nhanxet.maMonAn]] = {}   
                newObj[comment[nhanxet.maMonAn]][nhanxet.tableName] = {} 
            }

            if (!newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]])
            {
                newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]] = {
                    ...comment,
                    TenNguoiDung,
                    AnhNguoiDung
                }
                newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]][anhNhanXet.tableName] = []
            }

            if (AnhDinhKem) newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]][anhNhanXet.tableName].push (AnhDinhKem)

        })

        return res.status (200).json (Object.values (newObj).map (elem => {
            let comment = Object.values (elem[nhanxet.tableName])
            return {
                ...elem,
                NhanXet: comment
            }
        }))
    }
}

module.exports = new NguoiBanController