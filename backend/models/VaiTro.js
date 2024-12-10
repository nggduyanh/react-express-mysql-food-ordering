const query = require ("../services/QueryService")
const vaiTro = require ("../utils/constants/VaiTroConstant")
class VaiTro 
{
    async get ()
    {
        return await query.select ("*",vaiTro.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",vaiTro.tableName,`where ${vaiTro.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insert (vaiTro.tableName,obj,vaiTro.id)
    }

    async update (obj)
    {
        return await query.update (vaiTro.tableName,obj,`where ${vaiTro.id} = ?`, [obj[vaiTro.id]], vaiTro.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (vaiTro.tableName,`where ${vaiTro.id} = ?`,[obj[vaiTro.id]])
    }

}

module.exports = new VaiTro