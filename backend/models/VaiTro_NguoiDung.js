const query = require ("../services/QueryService")
const vaiTroNguoiDung = require ("../utils/constants/VaiTroNguoiDung")
const vaiTro = require ("../utils/constants/VaiTroConstant")
const nguoiDung = require ("../utils/constants/NguoiDungConstant")
class VaiTroNguoiDung 
{   
    async add (obj)
    {
        return await query.insertWithManualPrimaryKey (vaiTroNguoiDung.tableName,obj,[vaiTroNguoiDung.maNguoiDung,vaiTroNguoiDung.maVaiTro])
    }
    
    async remove (obj)
    {
        return await query.remove (vaiTroNguoiDung.tableName,`where ${vaiTroNguoiDung.maNguoiDung} = ? and ${vaiTroNguoiDung.maVaiTro} = ?`,[obj[vaiTroNguoiDung.maNguoiDung], obj[vaiTroNguoiDung.maVaiTro]])
    }

    async getByNguoiDung (id)
    {
        return await query.selectWithJoin ("*",vaiTroNguoiDung.tableName, `join ${vaiTro.tableName} on ${vaiTro.tableName}.${vaiTro.id} = ${vaiTroNguoiDung.tableName}.${vaiTroNguoiDung.maVaiTro}`, `where ${vaiTroNguoiDung.tableName}.${vaiTroNguoiDung.maNguoiDung} = ?`, [id])
    }

    async getByRole (id)
    {
        return await query.selectWithJoin ("*",vaiTroNguoiDung.tableName, `join ${nguoiDung.tableName} on ${nguoiDung.tableName}.${nguoiDung.id} = ${vaiTroNguoiDung.tableName}.${vaiTroNguoiDung.maNguoiDung}`, `where ${vaiTroNguoiDung.tableName}.${vaiTroNguoiDung.maVaiTro} = ?`, [id])
    }
   
}

module.exports = new VaiTroNguoiDung