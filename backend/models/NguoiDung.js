const query = require ("../services/QueryService")
const nguoidung = require ("../utils/constants/NguoiDungConstant")

class NguoiDung 
{
    async get ()
    {
        return await query.select ("*",nguoidung.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",nguoidung.tableName,`where ${nguoidung.id} = ?`,[id])
    }
    
    async getByPassAndPhone (sdt,pass)
    {
        return await query.select ("*",nguoidung.tableName,`where ${nguoidung.mk} = ? and ${nguoidung.sdt} = ?`,[pass,sdt])
    }

    async add (obj)
    {
        return await query.insert (nguoidung.tableName,obj,nguoidung.id)
    }

    async update (obj)
    {
        return await query.update (nguoidung.tableName,obj,`where ${nguoidung.id} = ?`, [obj[nguoidung.id]], nguoidung.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (nguoidung.tableName,`where ${nguoidung.id} = ?`,[obj[nguoidung.id]])
    }
}


module.exports = new NguoiDung