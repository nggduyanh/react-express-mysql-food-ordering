const nguoiBanRouter = require ("./NguoiBanRoute")
const nguoiDungRouter = require ("./NguoiDungRoute")
const loaiNguoiBanRouter = require ("./LoaiNguoiBanRoute")
const loaiMonAnRouter = require ("./LoaiMonAnRoute")
const monAnRouter = require ("./MonAnRoute")
const khuyenMaiRouter = require ("./KhuyenMaiRoute")
const trangThaiDonHangRouter = require ("./TrangThaiDonHangRoute")
const phuongThucGiaoDichRouter = require ("./PhuongThucGiaoDichRoute")
const donHangRouter = require ("./DonHangRouter")
const taiXeRouter = require ("./TaiXeRouter")
const vaiTroRouter = require ("./VaiTroRoute")

function route (app)
{
    app.use ("/nguoiban",nguoiBanRouter)
    app.use ("/nguoidung",nguoiDungRouter)
    app.use ("/loainguoiban",loaiNguoiBanRouter)
    app.use ("/loaiMonAn",loaiMonAnRouter)
    app.use ("/monan",monAnRouter)
    app.use ("/khuyenmai",khuyenMaiRouter)
    app.use ("/trangthaidonhang",trangThaiDonHangRouter)
    app.use ("/phuongthucgiaodich",phuongThucGiaoDichRouter)
    app.use ("/donhang",donHangRouter)
    app.use ("/taixe",taiXeRouter)
    app.use ("/vaitro",vaiTroRouter)
}

module.exports = route