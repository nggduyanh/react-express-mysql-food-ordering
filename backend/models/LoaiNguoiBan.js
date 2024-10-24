const query = require ("../services/QueryService")
const loainguoiban = require ("../utils/constants/LoaiNguoiBanConstant")
class LoaiNguoiBan 
{
    async get ()
    {
        return await query.select ("*",loainguoiban.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",loainguoiban.tableName,`where ${loainguoiban.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insert (loainguoiban.tableName,obj,loainguoiban.id)
    }

    async update (obj)
    {
        return await query.update (loainguoiban.tableName,obj,`where ${loainguoiban.id} = ?`, [obj[loainguoiban.id]], loainguoiban.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (loainguoiban.tableName,`where ${loainguoiban.id} = ?`,[obj[loainguoiban.id]])
    }

}

module.exports = new LoaiNguoiBan