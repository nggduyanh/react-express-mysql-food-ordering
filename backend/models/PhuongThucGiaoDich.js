const query = require ("../services/QueryService")
const phuongThucGiaoDich = require ("../utils/constants/PhuongThucGiaoDich")

class PhuongThucGiaoDich 
{
    async get ()
    {
        return await query.select ("*",phuongThucGiaoDich.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",phuongThucGiaoDich.tableName,`where ${phuongThucGiaoDich.id} = ?`,[id])
    }

    async add (obj)
    {
        return await query.insert (phuongThucGiaoDich.tableName,obj,phuongThucGiaoDich.id)
    }

    async update (obj)
    {
        return await query.update (phuongThucGiaoDich.tableName,obj,`where ${phuongThucGiaoDich.id} = ?`, [obj[phuongThucGiaoDich.id]], phuongThucGiaoDich.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (phuongThucGiaoDich.tableName,`where ${phuongThucGiaoDich.id} = ?`,[obj[phuongThucGiaoDich.id]])
    }
}


module.exports = new PhuongThucGiaoDich