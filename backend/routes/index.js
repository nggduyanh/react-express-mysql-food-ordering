const nguoiBanRouter = require ("./NguoiBanRoute")
const nguoiMuaRouter = require ("./NguoiMuaRoute")
const loaiNguoiBanRouter = require ("./LoaiNguoiBanRoute")
function route (app)
{
    app.use ("/nguoiban",nguoiBanRouter)
    app.use ("/nguoimua",nguoiMuaRouter)
    app.use ("/loainguoiban",loaiNguoiBanRouter)
}

module.exports = route