const query = require ("../services/QueryService")
const taiXe = require ("../utils/constants/TaiXeConstant")
class TaiXe 
{
    async get ()
    {
        return await query.select ("*",taiXe.tableName)
    }

    async getById (id,field)
    {
        return await query.select (field,taiXe.tableName,`where ${taiXe.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insertWithManualPrimaryKey (taiXe.tableName,obj,[taiXe.id])
    }

    async update (obj)
    {
        return await query.update (taiXe.tableName,obj,`where ${taiXe.id} = ?`, [obj[taiXe.id]], taiXe.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (taiXe.tableName,`where ${taiXe.id} = ?`,[obj[taiXe.id]])
    }

}

module.exports = new TaiXe