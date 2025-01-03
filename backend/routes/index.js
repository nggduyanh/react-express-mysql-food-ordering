const nguoiBanRouter = require("./NguoiBanRoute");
const nguoiDungRouter = require("./NguoiDungRoute");
const loaiNguoiBanRouter = require("./LoaiNguoiBanRoute");
const loaiMonAnRouter = require("./LoaiMonAnRoute");
const monAnRouter = require("./MonAnRoute");
const khuyenMaiRouter = require("./KhuyenMaiRoute");
const trangThaiDonHangRouter = require("./TrangThaiDonHangRoute");
const phuongThucGiaoDichRouter = require("./PhuongThucGiaoDichRoute");
const donHangRouter = require("./DonHangRouter");
const taiXeRouter = require("./TaiXeRouter");
const vaiTroRouter = require("./VaiTroRoute");
const nguoiMuaRouter = require("./NguoiMuaRouter");
const verifyToken = require("../middlewares/VerifyToken");
const authRouter = require("./AuthRouter");
const paymentRouter = require("./PaymentRoute");
const { CreatePayment, CallBack } = require("../controllers/PaymentController");

function route(app) {
  app.use("/auth", authRouter);
  app.post("/payment/callback", CallBack);
  app.use(verifyToken);
  app.use("/nguoiban", nguoiBanRouter);
  app.use("/nguoidung", nguoiDungRouter);
  app.use("/loainguoiban", loaiNguoiBanRouter);
  app.use("/loaiMonAn", loaiMonAnRouter);
  app.use("/monan", monAnRouter);
  app.use("/khuyenmai", khuyenMaiRouter);
  app.use("/trangthaidonhang", trangThaiDonHangRouter);
  app.use("/phuongthucgiaodich", phuongThucGiaoDichRouter);
  app.use("/donhang", donHangRouter);
  app.use("/taixe", taiXeRouter);
  app.use("/vaitro", vaiTroRouter);
  app.use("/nguoimua", nguoiMuaRouter);
  app.use("/payment", paymentRouter);
  //   app.post("/payment", paymentRouter);
  app.post("/payment/create", CreatePayment);

}

module.exports = route;
