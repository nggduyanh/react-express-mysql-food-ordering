const query = require ("../services/QueryService")
const nguoiBanYeuThich = require ("../utils/constants/NguoiBanYeuThichConstant")
const nguoiBan = require ("../utils/constants/NguoiBanConstant")
const nguoimua = require ("../utils/constants/NguoiDungConstant")
class NguoiBanYeuThich 
{
    
    async add (obj)
    {
        return await query.insertWithManualPrimaryKey (nguoiBanYeuThich.tableName,obj,[nguoiBanYeuThich.maNguoiBan,nguoiBanYeuThich.maNguoiMua])
    }
    
    async remove (obj)
    {
        return await query.remove (nguoiBanYeuThich.tableName,`where ${nguoiBanYeuThich.maNguoiBan} = ? and ${nguoiBanYeuThich.maNguoiMua} = ?`,[obj[nguoiBanYeuThich.maNguoiBan], obj[nguoiBanYeuThich.maNguoiMua]])
    }

    async getByNguoiMua (id)
    {
        return await query.selectWithJoin ("*",nguoiBanYeuThich.tableName, `join ${nguoiBan.tableName} on ${nguoiBan.tableName}.${nguoiBan.id} = ${nguoiBanYeuThich.tableName}.${nguoiBanYeuThich.maNguoiBan}`, `where ${nguoiBanYeuThich.tableName}.${nguoiBanYeuThich.maNguoiMua} = ?`, [id])
    }

    async getByNguoiBan (id)
    {
        return await query.selectWithJoin ("*",nguoiBanYeuThich.tableName, `join ${nguoimua.tableName} on ${nguoimua.tableName}.${nguoimua.id} = ${nguoiBanYeuThich.tableName}.${nguoiBanYeuThich.maNguoiMua}`, `where ${nguoiBanYeuThich.tableName}.${nguoiBanYeuThich.maNguoiBan} = ?`, [id])
    }

    
}

module.exports = new NguoiBanYeuThich