const NguoiDung = require ("../models/NguoiDung")
const Exception = require ("../models/Exception")
const nguoidung = require ("../utils/constants/NguoiDungConstant")
const vaitro = require ("../utils/constants/VaiTroConstant")
const VaiTroNguoiDung = require ("../models/VaiTro_NguoiDung")
const roleService = require ("../services/RoleService")
const jwt = require ("jsonwebtoken")
class AuthController
{

    async signup (req,res,next)
    {
        let objNguoiDung = await NguoiDung.add (req.body)
        if (!objNguoiDung.success) return next (new Exception (objNguoiDung.res,400))
        let idRoleNguoiMua = await roleService.getRoleId ("Buyer")
        if (!idRoleNguoiMua) return next (new Exception ({msg: `role Buyer is ${idRoleNguoiMua}`},500))
        let [newUser] = objNguoiDung.res
        let queryVaiTroNguoiDung = await roleService.addRoleToUser (idRoleNguoiMua,newUser[nguoidung.id])
        if (!queryVaiTroNguoiDung.success) return next (new Exception (queryVaiTroNguoiDung.res,500))
        let userRoles = [idRoleNguoiMua]
        let accessToken = jwt.sign ({"userId": newUser[nguoidung.id], userRoles},process.env.secretTokenKey, {expiresIn: "1h"})
        return res.status(201).json ({"NguoiDung": newUser, accessToken})
    }

    async login (req,res,next)
    {
        const {MatKhau, SoDienThoai} = req.body
        if (!MatKhau || !SoDienThoai) 
        {
            const message = {
                msg : `Not found ${ !MatKhau? "MatKhau" : "SoDienThoai" }`
            }
            return next (new Exception (message,400))
        }
        
        let obj = await NguoiDung.getByPassAndPhone (SoDienThoai,MatKhau)
        if (!obj.res.length) return next (new Exception ({msg: `Not found user with MatKhau = ${MatKhau} and SoDienThoai = ${SoDienThoai}`},404))
        
        let [user] = obj.res
        let userId = user[nguoidung.id]
        console.log (userId)
        let userRoles = await roleService.getIdRolesByUser (userId)
        console.log (userRoles)
        let accessToken = jwt.sign ({userId,userRoles},process.env.secretTokenKey, {expiresIn: "1h"})
        return res.status (200).json ({"NguoiDung": user, accessToken})
    }
} 

module.exports = new AuthController