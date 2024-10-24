const VaiTro = require ("../models/VaiTro")
const vaitro = require ("../utils/constants/VaiTroConstant")
function getRole ()
{
    let roles = null

    async function updateRole ()
    {
        let {res} = await VaiTro.get ()
        console.log (res)
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

    return {updateRole , getRoleId}
}

module.exports = getRole ()