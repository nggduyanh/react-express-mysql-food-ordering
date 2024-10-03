const query = require ("../services/QueryService")
const donHang = require ("../utils/constants/DonHangConstant")

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
}


module.exports = new DonHang