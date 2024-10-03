const query = require ("../services/QueryService")
const loaiNguoiBanNguoiBan = require ("../utils/constants/LoaiNguoiBanNguoiBanConstant")
const nguoiban = require ("../utils/constants/NguoiBanConstant")
const loaiNguoiBan = require ("../utils/constants/LoaiNguoiBanConstant")
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

    async getByLoaiNguoiBan (id)
    {
        return await query.selectWithJoin ("*",loaiNguoiBanNguoiBan.tableName, `join ${nguoiban.tableName} on ${nguoiban.tableName}.${nguoiban.id} = ${loaiNguoiBanNguoiBan.tableName}.${loaiNguoiBanNguoiBan.maNguoiBan}`, `where ${loaiNguoiBanNguoiBan.tableName}.${loaiNguoiBanNguoiBan.maLoaiNguoiBan} = ?`, [id])
    }

    async getByNguoiBan (id)
    {
        return await query.selectWithJoin ("*",loaiNguoiBanNguoiBan.tableName, `join ${loaiNguoiBan.tableName} on ${loaiNguoiBan.tableName}.${loaiNguoiBan.id} = ${loaiNguoiBanNguoiBan.tableName}.${loaiNguoiBanNguoiBan.maLoaiNguoiBan}`, `where ${loaiNguoiBanNguoiBan.tableName}.${loaiNguoiBanNguoiBan.maNguoiBan} = ?`, [id])
    }
}

module.exports = new LoaiNguoiBanNguoiBan