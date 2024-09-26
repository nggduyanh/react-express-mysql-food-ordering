const nguoiBanRouter = require ("./NguoiBanRoute")
const nguoiMuaRouter = require ("./NguoiMuaRoute")
function route (app)
{
    app.use ("/nguoiban",nguoiBanRouter)
    app.use ("/nguoimua",nguoiMuaRouter)
}

module.exports = route