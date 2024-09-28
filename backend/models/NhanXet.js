const query = require ("../services/QueryService")
const nhanxet = require ("../utils/constants/NhanXetConstant")

class NhanXet 
{
    async get ()
    {
        return await query.select ("*",nhanxet.tableName)
    }
    
    async add (obj)
    {
        return await query.insertWithManualPrimaryKey (nhanxet.tableName,obj,[nhanxet.maMonAn,nhanxet.maNguoiMua])
    }

    async update (obj)
    {
        return await query.update (nhanxet.tableName,obj,`where ${nhanxet.maMonAn} = ? and ${nhanxet.maNguoiMua} = ?`, [obj[nhanxet.maMonAn],obj[nhanxet.maNguoiMua]], [nhanxet.maMonAn,nhanxet.maNguoiMua])   
    }
    
    async remove (obj)
    {
        return await query.remove (nhanxet.tableName,`where ${nhanxet.maMonAn} = ? and ${nhanxet.maNguoiMua} = ?`, [obj[nhanxet.maMonAn],obj[nhanxet.maNguoiMua]])
    }
}


module.exports = new NhanXet