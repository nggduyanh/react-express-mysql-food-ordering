const query = require ("../services/QueryService")
const khuyenMai = require ("../utils/constants/KhuyenMaiConstant")
class KhuyenMai 
{
    async get ()
    {
        return await query.select ("*",khuyenMai.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",khuyenMai.tableName,`where ${khuyenMai.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insert (khuyenMai.tableName,obj,khuyenMai.id)
    }

    async update (obj)
    {
        return await query.update (khuyenMai.tableName,obj,`where ${khuyenMai.id} = ?`, [obj[khuyenMai.id]], khuyenMai.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (khuyenMai.tableName,`where ${khuyenMai.id} = ?`,[obj[khuyenMai.id]])
    }

}

module.exports = new KhuyenMai