const query = require ("../services/QueryService")
const nguoimua = require ("../utils/constants/NguoiMuaConstant")

class NguoiMua 
{
    async get ()
    {
        return await query.select ("*",nguoimua.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",nguoimua.tableName,`where ${nguoimua.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insert (nguoimua.tableName,obj,nguoimua.id)
    }

    async update (obj)
    {
        return await query.update (nguoimua.tableName,obj,`where ${nguoimua.id} = ?`, [obj[nguoimua.id]], nguoimua.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (nguoimua.tableName,`where ${nguoimua.id} = ?`,[obj[nguoimua.id]])
    }
}


module.exports = new NguoiMua