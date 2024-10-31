const query = require ("../services/QueryService")
const nguoiban = require ("../utils/constants/NguoiBanConstant")
class NguoiBan 
{
    async get ()
    {
        return await query.select ("*",nguoiban.tableName)
    }

    async getById (id,field)
    {
        return await query.select (field,nguoiban.tableName,`where ${nguoiban.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insertWithManualPrimaryKey (nguoiban.tableName,obj,[nguoiban.id])
    }

    async update (obj)
    {
        return await query.update (nguoiban.tableName,obj,`where ${nguoiban.id} = ?`, [obj[nguoiban.id]], nguoiban.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (nguoiban.tableName,`where ${nguoiban.id} = ?`,[obj[nguoiban.id]])
    }

}

module.exports = new NguoiBan