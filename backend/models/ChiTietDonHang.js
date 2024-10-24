const query = require ("../services/QueryService")
const chiTietDonHang = require ("../utils/constants/ChiTietDonHangConstant")
const monAn = require ("../utils/constants/MonAnConstant")
class ChiTietDonHang 
{
    async get ()
    {
        return await query.select ("*",chiTietDonHang.tableName)
    }

    async add (obj)
    {
        return await query.insertWithManualPrimaryKey (chiTietDonHang.tableName,obj,[chiTietDonHang.maMonAn,chiTietDonHang.maDonHang])
    }

    async update (obj)
    {
        return await query.update (chiTietDonHang.tableName,obj,`where ${chiTietDonHang.maDonHang} = ? and ${chiTietDonHang.maMonAn} = ?`, [obj[chiTietDonHang.maDonHang],obj[chiTietDonHang.maMonAn]], [chiTietDonHang.maDonHang,chiTietDonHang.maMonAn])   
    }
    
    async remove (obj)
    {
        return await query.remove (chiTietDonHang.tableName,`where ${chiTietDonHang.maDonHang} = ? and ${chiTietDonHang.maMonAn} = ?`,[obj[chiTietDonHang.maDonHang],obj[chiTietDonHang.maMonAn]])
    }

    async getMonAnByDonHang (id)
    {
        return await query.selectWithJoin ("*",chiTietDonHang.tableName,`join ${monAn.tableName} on ${monAn.tableName}.${monAn.id} = ${chiTietDonHang.tableName}.${chiTietDonHang.maMonAn}`, `where ${chiTietDonHang.maDonHang} = ?`,[id])
    }
}


module.exports = new ChiTietDonHang