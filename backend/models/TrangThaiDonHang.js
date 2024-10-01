const query = require ("../services/QueryService")
const trangThaiDonHang = require ("../utils/constants/TrangThaiDonHangConstant")
class TrangThaiDonHang 
{
    async get ()
    {
        return await query.select ("*",trangThaiDonHang.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",trangThaiDonHang.tableName,`where ${trangThaiDonHang.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insert (trangThaiDonHang.tableName,obj,trangThaiDonHang.id)
    }

    async update (obj)
    {
        return await query.update (trangThaiDonHang.tableName,obj,`where ${trangThaiDonHang.id} = ?`, [obj[trangThaiDonHang.id]], trangThaiDonHang.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (trangThaiDonHang.tableName,`where ${trangThaiDonHang.id} = ?`,[obj[trangThaiDonHang.id]])
    }

}

module.exports = new TrangThaiDonHang