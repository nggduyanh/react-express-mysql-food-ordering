const nguoiBanRouter = require ("./NguoiBanRoute")
const nguoiMuaRouter = require ("./NguoiMuaRoute")
const loaiNguoiBanRouter = require ("./LoaiNguoiBanRoute")
const loaiMonAnRouter = require ("./LoaiMonAnRoute")
const monAnRouter = require ("./MonAnRoute")
const nhanXetRouter = require ("./NhanXetRoute")

function route (app)
{
    app.use ("/nguoiban",nguoiBanRouter)
    app.use ("/nguoimua",nguoiMuaRouter)
    app.use ("/loainguoiban",loaiNguoiBanRouter)
    app.use ("/loaiMonAn",loaiMonAnRouter)
    app.use ("/monan",monAnRouter)
    app.use ("/nhanxet",nhanXetRouter)
}

module.exports = route