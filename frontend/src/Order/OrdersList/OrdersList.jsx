import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import { UserAccount } from "../../App";
import {
  formatDate,
  GetDetailsOrder,
  GetOrder,
  GetOrderRestaurant,
  GetUserInfo,
  localStaticFile,
} from "../../routebackend";

export default function OrdersList() {
  const { userData } = useContext(UserAccount);
  const [User, setUser] = useState([]);
  useEffect(() => {
    fetch(GetUserInfo)
      .then((response) => response.json())
      .then((data) => {
        const findUser = data.find(
          (item) => item.MaNguoiDung === userData.MaNguoiBan
        );
        setUser(findUser);
      });
  }, [userData]);

  const [Orders, setOrders] = useState([]); // Tất cả các đơn hàng
  useEffect(() => {
    fetch(`http://localhost:3030/donhang/nguoiban/${userData.MaNguoiBan}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  }, [userData]);

  // console.log(Orders.length);

  const [SuccessOrder, setSuccessOrder] = useState([]); // Đơn hàng được giao thành công
  useEffect(() => {
    fetch(`http://localhost:3030/donhang/nguoiban/${userData.MaNguoiBan}`)
      .then((response) => response.json())
      .then((data) => {
        const filterOrder = data.filter((order) => {
          return order.TrangThai === 1;
        });
        setSuccessOrder(filterOrder);
      });
  }, [userData]);

  // console.log(SuccessOrder.length);

  const listOrder = SuccessOrder.map((item) => {
    if (SuccessOrder.length > 0) {
      return (
        <tr>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-default-600">
            {formatDate(item.ThoiGianTao)}
          </td>
          <td
            // onClick={() => {
            //   // GetOrderRestaurant(item.MaDonHang); // Lấy chi tiết đơn hàng
            //   // GetDetailsOrder(item.MaDonHang); // Lấy chi tiết món ăn trong đơn hàng
            //   window.location.href = "/order_details"; // Chuyển đến trang chi tiết đơn hàng
            // }}
            class="px-4 py-4 whitespace-nowrap text-sm font-medium text-default-600 hover:cursor-pointer"
          >
            {item.MaDonHang}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-default-600">
            {item.GiaBan}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-default-600">
            {item.TrangThai}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-default-600">
            <Link to="/order_details" state={item}>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="cursor-pointer transition-colors hover:text-primary"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </Link>
          </td>
        </tr>
      );
    }
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
              {/* {userData?.AnhNguoiDung !== null ? (
                <img
                  src={localStaticFile + User.AnhNguoiDung}
                  className="object-cover w-full h-full"
                />
              ) : (
                <img
                  src="./images/avatar.png"
                  className="object-cover w-full h-full"
                />
              )} */}
            </div>
            <h3 className="font-medium ml-2">{userData.TenNguoiBan}</h3>
          </nav>
          <section className="p-6">
            <h1>Orders List</h1>
            <div className="grid grid-cols-12 gap-6 mt-6">
              <div className="col-span-9">
                <div className="grid gap-6 grid-cols-3">
                  <div className="p-6 flex items-center border border-[#F58220] rounded-lg gap-4">
                    <div className="bg-[#FDE6D5] h-16 w-16 inline-flex justify-center items-center rounded-full">
                      <svg
                        stroke="#F58220"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="32"
                        width="32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                      </svg>
                    </div>
                    <div>
                      <h1>Food Delivered</h1>
                      <h2>{SuccessOrder.length}</h2>
                    </div>
                  </div>
                  <div className="p-6 flex items-center border border-[#F58220] rounded-lg gap-4">
                    <div className="bg-[#FDE6D5] h-16 w-16 inline-flex justify-center items-center rounded-full">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="32"
                        width="32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                      </svg>
                    </div>
                    <div>
                      <h1>Your Balance</h1>
                      <h2>23,568</h2>
                    </div>
                  </div>
                  <div className="p-6 flex items-center border border-[#F58220] rounded-lg gap-4">
                    <div className="bg-[#FDE6D5] h-16 w-16 inline-flex justify-center items-center rounded-full">
                      <svg
                        stroke="#F58220"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="32"
                        width="32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                      </svg>
                    </div>
                    <div>
                      <h1>Satisfaction Rating</h1>
                      <h2>{userData.Diem}</h2>
                    </div>
                  </div>
                </div>
                <div className="border border-[#F58220] rounded-lg mt-6">
                  <div className="p-6 flex flex-wrap gap-4 justify-between items-center">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-3  rounded-md bg-[#F1F5F9]">
                        Sort
                      </button>
                      <button className="px-4 py-3  rounded-md bg-[#F1F5F9]">
                        Status
                      </button>
                    </div>
                  </div>
                  <table class="w-full divide-y divide-default-200">
                    <thead>
                      <tr className="bg-[#F1F5F9]">
                        <th
                          scope="col"
                          class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-default-200">
                      {listOrder}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col border border-[#F58220] rounded-lg w-auto p-6">
                  <h1>Ongoing Order</h1>
                  <h2>Date</h2>
                  <div>
                    <h1>Waiting</h1>
                    <div className="flex flex-col gap-4 bg-[#FFF2E9] p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <img
                          src="./images/Dashboard/pizza.png"
                          alt=""
                          className="h-16 max-w-16"
                        />
                        <div className="flex flex-col w-full">
                          <div className="flex justify-between">
                            <p className="text-sm mb-1">Italian Pizza</p>
                            <p className="text-sm mb-1">6.25pm</p>
                          </div>
                          <span>#C0E4F7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
