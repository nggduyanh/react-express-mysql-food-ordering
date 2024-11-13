const axios = require("axios");
const moment = require("moment"); // npm install moment
const CryptoJS = require("crypto-js"); // npm install crypto-js
const qs = require("qs");
const DonHang = require("../models/DonHang");
const ChiTietDonHang = require("../models/ChiTietDonHang");

async function CreatePayment(req, res) {
  console.log("CreatePayment call");
  const transID = req.body.MaDonHang;
  const embed_data = {
    preferred_payment_method: [],
    redirecturl: process.env.clientDomain + "/home/activity/ongoing",
    orderInfo: req.body,
  };

  const order = {
    app_id: process.env.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}-`,
    app_user: req.body.MaNguoiMua,
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(req.body.ListItems),
    embed_data: JSON.stringify(embed_data),
    amount: req.body.GiaBan,
    description: `Payment for the order #${transID}`,
    bank_code: "",
    callback_url: process.env.ngrokForwarding + "/payment/callback",
  };
  console.log("order", order);
  const data =
    process.env.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;

  order.mac = CryptoJS.HmacSHA256(data, process.env.key1).toString();

  try {
    const result = await axios.post(process.env.endpointCreate, null, {
      params: order,
    });

    console.log("First OrderStatus call");
    OrderStatus(order.app_trans_id, transID);

    return res.status(200).json(result.data);
    // ,order:{app_trans_id:order.app_trans_id,app_time:order.app_time,orderInfo:embed_data.orderInfo}
  } catch (error) {
    console.log(error);
  }
}

async function CallBack(req, res) {
  const results = {};
  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;

    const mac = CryptoJS.HmacSHA256(dataStr, process.env.key2).toString();
    if (reqMac == mac) {
      results.return_code = 1;
      results.return_message = "success";

      await DonHang.update({
        MaDonHang: JSON.parse(JSON.parse(dataStr).embed_data).orderInfo
          .MaDonHang,
        TrangThaiThanhToan: true,
      });

      console.log("mac success");
    } else {
      results.return_code = -1;
      results.return_message = "invalid callback";

      console.log("mac invalid");
    }
  } catch (ex) {
    results.return_code = 0;
    results.return_message = ex.message;
    console.log(error);
  }
  return res.json(results);
}

async function OrderStatus(trans_id, orderID) {
  console.log("OrderStatus call");

  const reqData = {
    app_id: process.env.app_id,
    app_trans_id: trans_id,
  };

  const data =
    reqData.app_id + "|" + reqData.app_trans_id + "|" + process.env.key1;
  reqData.mac = CryptoJS.HmacSHA256(data, process.env.key1).toString();

  const reqConfig = {
    method: "post",
    url: process.env.endpointQueryStatus,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(reqData),
  };

  try {
    await new Promise((resovle) => setTimeout(resovle, 5000));
    const orderStatusResult = await axios(reqConfig);

    if (orderStatusResult.data.return_code === 3) {
      await OrderStatus(trans_id, orderID);
      console.log(orderID + ": return code=3");
    } else if (orderStatusResult.data.return_code === 1) {
      await DonHang.update({ MaDonHang: orderID, TrangThaiThanhToan: true });
      console.log(orderID + ": return code = 1");
    } else {
      await ChiTietDonHang.remove({ MaDonHang: orderID });
      await DonHang.remove({ MaDonHang: orderID });
      console.log(orderID + ": return code = 2 ");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { CreatePayment, CallBack, OrderStatus };
