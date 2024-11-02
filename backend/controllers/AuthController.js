const NguoiDung = require ("../models/NguoiDung")
const Exception = require ("../models/Exception")
const nguoidung = require ("../utils/constants/NguoiDungConstant")
const vaitro = require ("../utils/constants/VaiTroConstant")
const VaiTroNguoiDung = require ("../models/VaiTro_NguoiDung")
const roleService = require ("../services/RoleService")
const jwt = require ("jsonwebtoken")
const mailService = require ("../services/MailService")
const OTPGenerator = require ("../utils/GenerateOTP")
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
        const {MatKhau, TenNguoiDung} = req.body
        if (!MatKhau || !TenNguoiDung) 
        {
            const message = {
                msg : `Not found ${ !MatKhau? "MatKhau" : "TenNguoiDung" }`
            }
            return next (new Exception (message,400))
        }
        
        let obj = await NguoiDung.getByPassAndName (TenNguoiDung,MatKhau)
        if (!obj.res.length) return next (new Exception ({msg: `Not found user with MatKhau = ${MatKhau} and TenNguoiDung = ${TenNguoiDung}`},404))
        
        let [user] = obj.res
        let userId = user[nguoidung.id]
        let userRoles = await roleService.getIdRolesByUser (userId)
        let accessToken = jwt.sign ({userId,userRoles},process.env.secretTokenKey, {expiresIn: "1h"})
        return res.status (200).json ({"NguoiDung": user, accessToken})
    }

    async resetPasswordByMail (req,res,next)
    {
        const {Email,TenNguoiDung} = req.body
        if (!Email) return next (new Exception ({msg: `Email is ${Email}`},400))
        if (!TenNguoiDung) return next (new Exception ({msg: `TenNguoiDung is ${TenNguoiDung}`},400))
        let query = await NguoiDung.getByName (TenNguoiDung)
        if (!query.res.length) return next (new Exception ({msg: `NguoiDung not found with TenNguoiDung = ${TenNguoiDung}`},404))
        let [user] = query.res
        let otp = OTPGenerator (6)
        console.log (otp)
        let currentTime = Date.now ()
        let updateOTP = await NguoiDung.update ({[nguoidung.id]: user[nguoidung.id], [nguoidung.otp]: `${otp}`, [nguoidung.otpExpire]: `${currentTime}`})
        if (!updateOTP.success) return (new Exception (updateOTP.res,500))
        
        let content = {
            to: Email,
            subject: "Reset Your Password",
            text: "Hello",
            html: `<p>Your OTP is <span style="font-weight:bold;">${otp}</span></p>`
        }

        let mail = await mailService.sendEmail (content)
        if (!mail.success) return (new Exception (mail,500))
        
        return res.status (201).json (mail)
    } 

    async verifyOTP (req,res,next)
    {
        const {TenNguoiDung,OTP} = req.body
        if (!OTP) return next (new Exception ({msg: `OTP is ${OTP}`},400))
        if (!TenNguoiDung) return next (new Exception ({msg: `TenNguoiDung is ${TenNguoiDung}`}, 400))
        
        let query = await NguoiDung.getByName (TenNguoiDung)
        if (!query.success) return next (new Exception (query.res,500))
        let [user] = query.res
        let userOTP = user[nguoidung.otp]
        let expireOTP = parseInt(user[nguoidung.otpExpire])
        if (userOTP !== OTP) return next (new Exception ({msg: `OTP is not valid`},400))
        let timeLimitOTP = 30 //second
        if (Date.now () - expireOTP >= timeLimitOTP * 1000) return next (new Exception ({msg: "OTP is expired"}, 400))
        let userId = user[nguoidung.id]
        query = await NguoiDung.update ({[nguoidung.id]: userId, [nguoidung.otp]: null, [nguoidung.otpExpire]: null})
        let userRoles = await roleService.getIdRolesByUser (userId)
        let accessToken = jwt.sign ({userId,userRoles},process.env.secretTokenKey, {expiresIn: "1h"})
        return res.status (200).json ({"NguoiDung": user, accessToken})
    }
} 

module.exports = new AuthController