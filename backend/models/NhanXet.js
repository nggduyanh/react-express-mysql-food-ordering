const query = require ("../services/QueryService")
const nhanxet = require ("../utils/constants/NhanXetConstant")
const nguoimua = require ("../utils/constants/NguoiDungConstant")
const nguoiban = require ("../utils/constants/NguoiBanConstant")
const monan = require ("../utils/constants/MonAnConstant")
const anhnhanxet = require ("../utils/constants/AnhNhanXetConstant")
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
        return await query.selectWithJoin ("*",nhanxet.tableName, `left join ${anhnhanxet.tableName} on ${anhnhanxet.tableName}.${anhnhanxet.maNguoiMua} = ${nhanxet.tableName}.${nhanxet.maNguoiMua} and ${anhnhanxet.tableName}.${anhnhanxet.maMonAn} = ${nhanxet.tableName}.${nhanxet.maMonAn} join ${nguoimua.tableName} on ${nguoimua.tableName}.${nguoimua.id} = ${nhanxet.tableName}.${nhanxet.maNguoiMua}`,`where ${nhanxet.tableName}.${nhanxet.maMonAn} = ?`, [id])    
    }

    async getByNguoiMua (id)
    {
        return await query.selectWithJoin ("*",nhanxet.tableName,`left join ${anhnhanxet.tableName} on ${anhnhanxet.tableName}.${anhnhanxet.maNguoiMua} = ${nhanxet.tableName}.${nhanxet.maNguoiMua} and ${anhnhanxet.tableName}.${anhnhanxet.maMonAn} = ${nhanxet.tableName}.${nhanxet.maMonAn} join ${monan.tableName} on ${monan.tableName}.${monan.id} = ${nhanxet.tableName}.${nhanxet.maMonAn}` , `where ${nhanxet.tableName}.${nhanxet.maNguoiMua} = ?`, [id])   
    }

    async getByNguoiBan (id)
    {
        return await query.selectWithJoin ("*",nhanxet.tableName, `left join ${anhnhanxet.tableName} on ${anhnhanxet.tableName}.${anhnhanxet.maNguoiMua} = ${nhanxet.tableName}.${nhanxet.maNguoiMua} and ${anhnhanxet.tableName}.${anhnhanxet.maMonAn} = ${nhanxet.tableName}.${nhanxet.maMonAn} join ${nguoimua.tableName} on ${nguoimua.tableName}.${nguoimua.id} = ${nhanxet.tableName}.${nhanxet.maNguoiMua} join ${monan.tableName} on ${monan.tableName}.${monan.id} = ${nhanxet.tableName}.${nhanxet.maMonAn}`,`where ${monan.tableName}.${monan.maNguoiBan} = ?`, [id])    
    }
}

module.exports = new NhanXet