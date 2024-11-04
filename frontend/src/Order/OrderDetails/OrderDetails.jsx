import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import {
  formatCurrency,
  formatDate,
  GetPaymentMethods,
  GetUserInfo,
  GetVoucher,
} from "../../routebackend";
import { UserAccount } from "../../App";
export default function OrderDetails() {
  const data = useLocation();
  const detailsOrder = data.state;
  const { userData } = useContext(UserAccount);

  const [Buyer, setBuyer] = useState([]);
  useEffect(() => {
    fetch(GetUserInfo)
      .then((response) => response.json())
      .then((data) => {
        const findBuyer = data.find(
          (item) => item.MaNguoiDung === detailsOrder.MaNguoiMua
        );
        setBuyer(findBuyer);
      });
  }, []);

  const [KhuyenMai, setKhuyenMai] = useState([]);
  if (
    detailsOrder.MaKhuyenMai !== null &&
    detailsOrder.MaKhuyenMai !== undefined
  ) {
    useEffect(() => {
      fetch(GetVoucher)
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
    fetch(GetPaymentMethods)
      .then((response) => response.json())
      .then((data) => {
        const findPayment = data.find(
          (item) =>
            item.MaPhuongThucGiaoDich === detailsOrder.MaPhuongThucGiaoDich
        );
        setPayment(findPayment);
      });
  });

  const listFoodOrder = detailsOrder.ChiTietDonHang.map((item) => {
    return (
      <tr className="border border-gray-300">
        <td className="p-2 whitespace-nowrap text-sm text-default-600">
          <div className="flex items-center gap-4">
            <img
              src="./images/Dashboard/pizza.png"
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
    <div className="h-screen w-screen">
      <div className="flex h-full">
        <SideBar />
        <div class="flex-1 mt-0">
          <nav className="flex h-16 px-6 items-center border-b border-[#F58220]  text-sm">
            <div class="flex items-center border border-gray-300 rounded-full p-2">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-default-600"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input
                type="text"
                class="outline-none w-full ps-2"
                placeholder="Search"
              />
            </div>
            <div className="ml-auto bg-gray-200 p-2 rounded-full mr-4">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <div className="bg-white h-10 w-10 rounded-full  overflow-hidden">
              <img
                src="./images/avatar.png"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-medium ml-2">Kaiya Botosh</h3>
          </nav>
          <section className="p-6">
            <div className="flex justify-between mb-4">
              <h1 className="text-xl font-medium">Order Details</h1>
              <Link to="/orders_list"><h3 className="text-base">Back to list</h3></Link>
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
                        {/* <h4 className="mb-1">{Buyer.TenNguoiDung}</h4> */}
                        <p>{detailsOrder.DiaChiDen}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="mb-1">Email</h4>
                        {/* <p>{Buyer.Email}</p> */}
                      </div>
                      <div>
                        <h4 className="mb-1">Phone</h4>
                        {/* <p>{Buyer.SoDienThoai}</p> */}
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
                      Payment Mode: {Payment.TenPhuongThucGiaoDich}
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
                  <table class="w-full border-collapse border border-[#F58220] rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-[#F1F5F9] border border-gray-300">
                        <th
                          scope="col"
                          class="px-4 py-4 text-start text-sm font-semibold text-default-800 "
                        >
                          Dish
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-4 text-start text-sm font-semibold text-default-800"
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
