const query = require ("../services/QueryService")
const loaiNguoiBanNguoiBan = require ("../utils/constants/LoaiNguoiBanNguoiBanConstant")

class LoaiNguoiBanNguoiBan 
{
    async get ()
    {
        return await query.select ("*",loaiNguoiBanNguoiBan.tableName)
    }

    async add (obj)
    {
        return await query.insertWithManualPrimaryKey (loaiNguoiBanNguoiBan.tableName,obj,[loaiNguoiBanNguoiBan.maLoaiNguoiBan,loaiNguoiBanNguoiBan.maNguoiBan])
    }
    
    async remove (obj)
    {
        return await query.remove (loaiNguoiBanNguoiBan.tableName,`where ${loaiNguoiBanNguoiBan.maLoaiNguoiBan} = ? and ${loaiNguoiBanNguoiBan.maNguoiBan} = ?`,[obj[loaiNguoiBanNguoiBan.maLoaiNguoiBan], obj[loaiNguoiBanNguoiBan.maNguoiBan]])
    }
}

module.exports = new LoaiNguoiBanNguoiBan