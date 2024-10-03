const nguoiBanRouter = require ("./NguoiBanRoute")
const nguoiMuaRouter = require ("./NguoiMuaRoute")
const loaiNguoiBanRouter = require ("./LoaiNguoiBanRoute")
const loaiMonAnRouter = require ("./LoaiMonAnRoute")
const monAnRouter = require ("./MonAnRoute")
const khuyenMaiRouter = require ("./KhuyenMaiRoute")
const trangThaiDonHangRouter = require ("./TrangThaiDonHangRoute")
const phuongThucGiaoDichRouter = require ("./PhuongThucGiaoDichRoute")
const donHangRouter = require ("./DonHangRouter")
const taiXeRouter = require ("./TaiXeRouter")

function route (app)
{
    app.use ("/nguoiban",nguoiBanRouter)
    app.use ("/nguoimua",nguoiMuaRouter)
    app.use ("/loainguoiban",loaiNguoiBanRouter)
    app.use ("/loaiMonAn",loaiMonAnRouter)
    app.use ("/monan",monAnRouter)
    app.use ("/khuyenmai",khuyenMaiRouter)
    app.use ("/trangthaidonhang",trangThaiDonHangRouter)
    app.use ("/phuongthucgiaodich",phuongThucGiaoDichRouter)
    app.use ("/donhang",donHangRouter)
    app.use ("/taixe",taiXeRouter)
}

module.exports = route