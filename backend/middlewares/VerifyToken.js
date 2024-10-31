const jwt = require ("jsonwebtoken")
const Exception = require ("../models/Exception")

function verifyToken (req,res,next)
{
    let authorization = req.headers.authorization
    if (!authorization) return next (new Exception ({msg: `Authorization in request headers is ${authorization}`}, 401))
    let [type, token] = authorization.split (" ")
    if (!token) return next (new Exception ({msg: `Token is ${token}`}, 401))
    jwt.verify (token, process.env.secretTokenKey, (err,decoded) => {
        if (err) 
        {
            return next (new Exception (err,400))
        }
        let {userId,userRoles} = decoded
        req.user = {
            id: userId,
            roles: userRoles
        }
        next ()
    })
}

module.exports = verifyToken