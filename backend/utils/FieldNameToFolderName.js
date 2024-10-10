const nguoiDung = require ("./constants/NguoiDungConstant")
const nguoiBan = require ("./constants/NguoiBanConstant")
const taiXe = require ("./constants/TaiXeConstant")
const monAn = require ("./constants/MonAnConstant")

function convertFieldNameToFolderName (field)
{
    if (field === nguoiDung.anh ) return "DaiDien"
    else if (field === nguoiBan.cccd) return "CanCuoc"
    else if (field === taiXe.bangLai) return "BangLai"
    else if (field === monAn.anh) return "MonAn"
    else if (field === nguoiBan.anh) return "NguoiBan"
}

module.exports = convertFieldNameToFolderName