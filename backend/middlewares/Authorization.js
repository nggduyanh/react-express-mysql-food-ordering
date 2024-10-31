const RoleService = require ("../services/RoleService") 
const Exception = require ("../models/Exception")
function authorize (...roles)
{
    return async (req,res,next) => {
        let roleIds = []
        for (let role of roles)
        {
            let id = await RoleService.getRoleId (role)
            if (!id) return next (new Exception ({msg: `Role ${role} is ${id}`}, 500))
            roleIds.push (id)
        }

        let requestIdRoles = req.user.roles
        if (!isPermit (roleIds,requestIdRoles)) return next (new Exception ({msg: "Permission deniend"}, 403))
        
        next ()
    }

}

function isPermit (acceptRoles, userRoles )
{
    for (let userRole of userRoles)
    {
        if (acceptRoles.includes (userRole)) return true
    }
    return false
}

module.exports = authorize