import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import {
  formatCurrency,
  formatDate,
  GetPaymentMethods,
  GetUserInfo,
  GetVoucher,
  localStaticFile,
} from "../../../routebackend";
// import { UserAccount } from "../../App";
import useFetchData from "../../Components/useFetchData";
import NavBar from "../../Components/NavBar";
export default function OrderDetails() {
  const data = useLocation();
  const detailsOrder = data.state;

  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  let [userData] = useFetchData(GetUserInfo, tokenValue);
  const userInfo = userData?.data?.[0];

  const [Seller, getSeller] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3030/nguoiban/current`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        getSeller(data);
      });
  }, [userData]);

  const [KhuyenMai, setKhuyenMai] = useState([]);
  if (
    detailsOrder.MaKhuyenMai !== null &&
    detailsOrder.MaKhuyenMai !== undefined
  ) {
    useEffect(() => {
      fetch(GetVoucher, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("KhuyenMai", data);
          const findKhuyenMai = data.find(
            (item) => item.MaKhuyenMai === detailsOrder.MaKhuyenMai
          );
          setKhuyenMai(findKhuyenMai);
        });
    }, [detailsOrder]);
  }

  const isDiscount =
    KhuyenMai.length === 0
      ? 0
      : KhuyenMai.GiaTri === null
      ? KhuyenMai.PhanTram
      : KhuyenMai.GiaTri;

  const Discount =
    isDiscount === 0
      ? "No Discount"
      : KhuyenMai.GiaTri === null
      ? isDiscount + "%"
      : formatCurrency(isDiscount);

  let price = 0;
  for (var i = 0; i < detailsOrder.ChiTietDonHang.length; i++) {
    price +=
      detailsOrder.ChiTietDonHang[i].monan.GiaBan *
      detailsOrder.ChiTietDonHang[i].chitiet.SoLuong;
  }

  const ShippingFee = price > 500000 ? 0 : 16000;

  let total = 0;
  if (isDiscount === 0) {
    total = price + ShippingFee;
  } else {
    if (KhuyenMai.GiaTri === null) {
      total = price - (price * isDiscount) / 100 + ShippingFee;
    } else {
      total = price - isDiscount + ShippingFee;
    }
  }

  const [Payment, setPayment] = useState([]);
  useEffect(() => {
    fetch(GetPaymentMethods, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const findPayment = data.find(
          (item) =>
            item.MaPhuongThucGiaoDich === detailsOrder.MaPhuongThucGiaoDich
        );
        setPayment(findPayment);
      });
  }, [detailsOrder]);

  const listFoodOrder = detailsOrder?.ChiTietDonHang?.map((item) => {
    const imgUrl =
      item.monan?.AnhMonAn || "../../../../images/Dashboard/pizza.png";
    return (
      <tr key={item} className="border border-gray-300">
        <td className="p-2 whitespace-nowrap text-sm text-default-600">
          <div className="flex items-center gap-4">
            <img
              src={localStaticFile + imgUrl}
              alt=""
              className="h-[72px] max-w-[72px]"
            />
            <div>
              <p className="text-sm  font-medium mb-1">{item.monan.TenMonAn}</p>
            </div>
          </div>
        </td>
        <td className="py-2 px-4 whitespace-nowrap text-sm text-default-600">
          {item.chitiet.SoLuong}
        </td>
        <td className="py-2 px-4 whitespace-nowrap text-sm text-default-600">
          {formatCurrency(item.monan.GiaBan)}
        </td>
        <td className="py-2 px-4 whitespace-nowrap text-sm text-default-600">
          {formatCurrency(item.monan.GiaBan * item.chitiet.SoLuong)}
        </td>
      </tr>
    );
  });

  return (
    <div className="">
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <div className="flex justify-between mb-4">
              <h1 className="text-xl font-medium">Order Details</h1>
              <Link to="/orders_list">
                <h3 className="text-base">Back to list</h3>
              </Link>
            </div>
            <div className="border border-[#F58220] rounded-lg">
              <div className="p-6 flex items-center justify-between gap-8 border-b border-[#F58220] text-base">
                <div className="flex items-center gap-8">
                  <h1 className="font-semibold text-lg">
                    Order {detailsOrder.MaDonHang}
                  </h1>
                  <h3 className="text-base">
                    {detailsOrder.ChiTietDonHang.length} Products
                  </h3>
                </div>
                <h3 className="text-base">
                  {formatDate(detailsOrder.ThoiGianTao)}
                </h3>
              </div>
              <div className="grid grid-cols-4 p-6 gap-6">
                <div className="col-span-3 grid grid-cols-2 gap-6">
                  <div className="border border-[#F58220] rounded-lg">
                    <h1 className="border-b border-[#F58220] p-4">
                      Shipping Address
                    </h1>
                    <div className="p-4">
                      <div className="mb-4">
                        <h4 className="mb-1">{userInfo?.TenNguoiDung}</h4>
                        <p>{detailsOrder.DiaChiDen}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="mb-1">Email</h4>
                        <p>{userInfo?.Email}</p>
                      </div>
                      <div>
                        <h4 className="mb-1">Phone</h4>
                        <p>{userInfo?.SoDienThoai}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-[#F58220] rounded-lg">
                    <h1 className="border-b border-[#F58220] p-4">
                      Total Payment :
                    </h1>
                    <div className="px-4">
                      <div className="py-4 flex justify-between">
                        <p>Subtotal:</p>
                        <span>{formatCurrency(price)}</span>
                      </div>
                      <div className="py-4 flex justify-between">
                        <p>Discount: </p>
                        <span>{Discount}</span>
                      </div>
                      <div className="py-4 flex justify-between border-b border-[#F58220]">
                        <p>Shipping Fee: </p>
                        <span>{ShippingFee}</span>
                      </div>
                      <div className="py-4 flex justify-between">
                        <p>Total:</p>
                        <span>{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-[#F58220] rounded-lg">
                  <h1 className="border-b border-[#F58220] p-4">
                    Delivery Details
                  </h1>
                  <div className="p-6 text-center">
                    <img
                      src="./images/Dashboard/ship.png"
                      alt=""
                      className="mx-auto mb-3"
                    />
                    <h2 className="mb-3">Jay Logistics</h2>
                    <h2 className="mb-3">ID: JLST2023477890</h2>
                    <p className="mb-3">
                      Payment Mode: {Payment?.TenPhuongThucGiaoDich}
                    </p>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="my-10 relative">
                    <div className="mx-20">
                      <div className="h-1.5 bg-[#F58220] rounded-full"></div>
                    </div>
                    <div className="flex justify-between mx-10">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center h-10 w-10 bg-[#F58220] rounded-full">
                          <span className="">01</span>
                        </div>
                        <h4 className="p-2 mt-4">Order received</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center h-10 w-10 bg-[#F58220] rounded-full">
                          <span className="">02</span>
                        </div>
                        <h4 className="p-2 mt-4">Processing</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center h-10 w-10 bg-[#F58220] rounded-full">
                          <span className="">03</span>
                        </div>
                        <h4 className="p-2 mt-4">On the way</h4>
                      </div>

                      <div className="relative flex flex-col items-center">
                        <div className="flex items-center justify-center h-10 w-10 bg-[#F58220] rounded-full">
                          <span className="">04</span>
                        </div>
                        <h4 className="p-2 mt-4">Delivered</h4>
                      </div>
                    </div>
                  </div>
                  <table className="w-full border-collapse border border-[#F58220] rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-[#F1F5F9] border border-gray-300">
                        <th
                          scope="col"
                          className="px-4 py-4 text-start text-sm font-semibold text-default-800 "
                        >
                          Dish
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Sub Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-default-200">
                      {listFoodOrder}
                    </tbody>
                  </table>
                </div>

                <div className="">
                  <h1 className="border border-[#F58220] p-4 rounded-t-lg">
                    Logistics Details
                  </h1>
                  {Payment.MaPhuongThucGiaoDich === 1 && (
                    <div className="px-4 border-x border-b border-[#F58220] rounded-b-lg">
                      <div className="py-4 flex justify-between">
                        <p>Payment Method :</p>
                        <span>{Payment.TenPhuongThucGiaoDich}</span>
                      </div>
                    </div>
                  )}
                  {Payment.MaPhuongThucGiaoDich === 2 && (
                    <div className="px-4 border-x border-b border-[#F58220] rounded-b-lg">
                      <div className="py-4 flex justify-between border-b border-[#F58220]">
                        <p>Transaction ID :</p>
                        <span>#20234567213</span>
                      </div>
                      <div className="py-4 flex justify-between border-b border-[#F58220]">
                        <p>Payment Method :</p>
                        <span>{Payment.TenPhuongThucGiaoDich}</span>
                      </div>
                      <div className="py-4 flex justify-between">
                        <p>Card Holder Name :</p>
                        <span>Jaylon Calzoni</span>
                      </div>
                    </div>
                  )}
                  {Payment.MaPhuongThucGiaoDich === 3 && (
                    <div className="px-4 border-x border-b border-[#F58220] rounded-b-lg">
                      <div className="py-4 flex justify-between border-b border-[#F58220]">
                        <p>Transaction ID :</p>
                        <span>#20234567213</span>
                      </div>
                      <div className="py-4 flex justify-between border-b border-[#F58220]">
                        <p>Payment Method :</p>
                        <span>{Payment.TenPhuongThucGiaoDich}</span>
                      </div>
                      <div className="py-4 flex justify-between">
                        <p>Card Holder Name :</p>
                        <span>Jaylon Calzoni</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
