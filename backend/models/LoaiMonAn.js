const query = require ("../services/QueryService")
const loaiMonAn = require ("../utils/constants/LoaiMonAnConstant")
class LoaiMonAn 
{
    async get ()
    {
        return await query.select ("*",loaiMonAn.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",loaiMonAn.tableName,`where ${loaiMonAn.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insert (loaiMonAn.tableName,obj,loaiMonAn.id)
    }

    async update (obj)
    {
        return await query.update (loaiMonAn.tableName,obj,`where ${loaiMonAn.id} = ?`, [obj[loaiMonAn.id]], loaiMonAn.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (loaiMonAn.tableName,`where ${loaiMonAn.id} = ?`,[obj[loaiMonAn.id]])
    }

}

module.exports = new LoaiMonAn