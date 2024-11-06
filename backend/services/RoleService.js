const VaiTro = require ("../models/VaiTro")
const VaiTroNguoiDung = require ("../models/VaiTro_NguoiDung")
const vaiTroNguoiDung = require ("../utils/constants/VaiTroNguoiDung")
const vaitro = require ("../utils/constants/VaiTroConstant")
function getRole ()
{
    let roles = null

    async function updateRole ()
    {
        let {res} = await VaiTro.get ()
        roles = {}
        res.forEach(role => {
            roles[role[vaitro.ten]] = role[vaitro.id]
        })
        
    }

    async function getRoleId (roleName)
    {
        if (!roles) await updateRole ()
        return roles[roleName]
    }

    async function addRoleToUser(idRole,userId) 
    {
        let addRoleToNguoiDung = {
            [vaiTroNguoiDung.maNguoiDung]: userId,
            [vaiTroNguoiDung.maVaiTro]: idRole
        }
        let obj = await VaiTroNguoiDung.add (addRoleToNguoiDung)   
        return obj
    }

    async function getIdRolesByUser(userId) 
    {
        let queryRoleByUser = await VaiTroNguoiDung.getByNguoiDung (userId)
        return queryRoleByUser.res.map (elem => elem[vaitro.tableName][vaitro.id])    
    }

    async function deleteRoleOfUser(userId,roleId) 
    {
        let obj = {
            [vaiTroNguoiDung.maNguoiDung]: userId,
            [vaiTroNguoiDung.maVaiTro]: roleId
        }
        let queryDelete = await VaiTroNguoiDung.remove (obj)
        return queryDelete
    }
    return {getRoleId, addRoleToUser, getIdRolesByUser, deleteRoleOfUser}
}

module.exports = getRole ()