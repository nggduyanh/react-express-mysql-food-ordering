const query = require ("../services/QueryService")
const nhanxet = require ("../utils/constants/NhanXetConstant")
const nguoimua = require ("../utils/constants/NguoiDungConstant")
const monan = require ("../utils/constants/MonAnConstant")
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

    async getByMonAn(id) 
    {
        return await query.selectWithJoin ("*",nhanxet.tableName, `join ${nguoimua.tableName} on ${nguoimua.tableName}.${nguoimua.id} = ${nhanxet.tableName}.${nhanxet.maNguoiMua}`,`where ${nhanxet.maMonAn} = ?`, [id])    
    }

    async getByNguoiMua (id)
    {
        return await query.selectWithJoin ("*",nhanxet.tableName,`join ${monan.tableName} on ${monan.tableName}.${monan.id} = ${nhanxet.tableName}.${nhanxet.maMonAn}` , `where ${nhanxet.maNguoiMua} = ?`, [id])   
    }
}

module.exports = new NhanXet