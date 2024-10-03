const query = require ("../services/QueryService")
const khuyenMaiNguoiMua = require ("../utils/constants/KhuyenMaiNguoiMua")
const nguoimua = require ("../utils/constants/NguoiMuaConstant")
const khuyenmai = require ("../utils/constants/KhuyenMaiConstant")
class KhuyenMaiNguoiMua 
{
    
    async add (obj)
    {
        return await query.insertWithManualPrimaryKey (khuyenMaiNguoiMua.tableName,obj,[khuyenMaiNguoiMua.maKhuyenMai,khuyenMaiNguoiMua.maNguoiMua])
    }
    
    async remove (obj)
    {
        return await query.remove (khuyenMaiNguoiMua.tableName,`where ${khuyenMaiNguoiMua.maKhuyenMai} = ? and ${khuyenMaiNguoiMua.maNguoiMua} = ?`,[obj[khuyenMaiNguoiMua.maKhuyenMai], obj[khuyenMaiNguoiMua.maNguoiMua]])
    }

    async getByNguoiMua (id)
    {
        return await query.selectWithJoin ("*",khuyenMaiNguoiMua.tableName, `join ${khuyenmai.tableName} on ${khuyenmai.tableName}.${khuyenmai.id} = ${khuyenMaiNguoiMua.tableName}.${khuyenMaiNguoiMua.maKhuyenMai}`, `where ${khuyenMaiNguoiMua.tableName}.${khuyenMaiNguoiMua.maNguoiMua} = ?`, [id])
    }

    async getByKhuyenMai (id)
    {
        return await query.selectWithJoin ("*",khuyenMaiNguoiMua.tableName, `join ${nguoimua.tableName} on ${nguoimua.tableName}.${nguoimua.id} = ${khuyenMaiNguoiMua.tableName}.${khuyenMaiNguoiMua.maNguoiMua}`, `where ${khuyenMaiNguoiMua.tableName}.${khuyenMaiNguoiMua.maKhuyenMai} = ?`, [id])
    }

    
}

module.exports = new KhuyenMaiNguoiMua