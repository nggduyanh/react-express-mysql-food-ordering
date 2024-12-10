const query = require ("../services/QueryService")
const donHang = require ("../utils/constants/DonHangConstant")
const chiTietDonHang = require ("../utils/constants/ChiTietDonHangConstant")
const monAn = require ("../utils/constants/MonAnConstant")
class DonHang 
{
    async get ()
    {
        return await query.select ("*",donHang.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",donHang.tableName,`where ${donHang.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insert (donHang.tableName,obj,donHang.id)
    }

    async update (obj)
    {
        return await query.update (donHang.tableName,obj,`where ${donHang.id} = ?`, [obj[donHang.id]], donHang.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (donHang.tableName,`where ${donHang.id} = ?`,[obj[donHang.id]])
    }

    async getByNguoiBan (id)
    {
        return await query.selectWithJoin ("*",donHang.tableName,`join ${chiTietDonHang.tableName} on ${donHang.tableName}.${donHang.id} = ${chiTietDonHang.tableName}.${chiTietDonHang.maDonHang} join ${monAn.tableName} on ${chiTietDonHang.tableName}.${chiTietDonHang.maMonAn} = ${monAn.tableName}.${monAn.id}`,`where ${monAn.maNguoiBan} = ?`,[id])
        
    }
}


module.exports = new DonHang