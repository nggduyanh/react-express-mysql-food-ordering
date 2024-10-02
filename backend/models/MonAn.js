const query = require ("../services/QueryService")
const monAn = require ("../utils/constants/MonAnConstant")

class MonAn 
{
    async get ()
    {
        return await query.select ("*",monAn.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",monAn.tableName,`where ${monAn.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insert (monAn.tableName,obj,monAn.id)
    }

    async update (obj)
    {
        return await query.update (monAn.tableName,obj,`where ${monAn.id} = ?`, [obj[monAn.id]], monAn.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (monAn.tableName,`where ${monAn.id} = ?`,[obj[monAn.id]])
    }

    async getByNguoiBan (id)
    {
        return await query.select ("*",monAn.tableName,`where ${monAn.maNguoiBan} = ?`, [id])
    }
}


module.exports = new MonAn