import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import { UserAccount } from "../../App";
import {
  GetDetailsOrder,
  GetOrder,
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
  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(GetOrder)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  }, [userData]);
  Orders.forEach((element) => {
    console.log("element", element.MaDonHang);
  });
  const [Order, setOrder] = useState([]);
  useEffect(() => {
    Orders.forEach((element) => {
      fetch(`http://localhost:3030/monan/donhang/${element.MaDonHang}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          // const filterOrder = data.filter((order) => {
          //   return order.MaNguoiBan === userData.MaNguoiBan;
          // });
          // setOrder(filterOrder);
        });
    });
  }, [userData]);

  Order.forEach((element) => {
    console.log("element", element);
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
                      {/* <h2>{SuccessOrder.length}</h2> */}
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
                          Dish
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
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-default-200">
                      <tr>
                        <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-default-600">
                          12/03/2022
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-default-600">
                          #C0E4F7
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap text-sm text-default-600">
                          <div className="flex items-center gap-4">
                            <img
                              src="./images/Dashboard/pizza.png"
                              alt=""
                              className="h-[72px] max-w-[72px]"
                            />
                            <div>
                              <p className="text-sm mb-1">Italian Pizza</p>
                              <div className="flex gap-2">
                                <div className="flex gap-1.5">
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 576 512"
                                    class="fill-yellow-400 text-yellow-400"
                                    height="18"
                                    width="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                  </svg>
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 576 512"
                                    class="fill-yellow-400 text-yellow-400"
                                    height="18"
                                    width="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                  </svg>
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 576 512"
                                    class="fill-yellow-400 text-yellow-400"
                                    height="18"
                                    width="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                  </svg>
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 576 512"
                                    class="fill-yellow-400 text-yellow-400"
                                    height="18"
                                    width="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                  </svg>
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 640 512"
                                    class="text-yellow-400"
                                    height="18"
                                    width="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M320 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L320.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L320.1 439.8 191.8 508.3C181 514 167.9 513.1 158 506s-14.9-19.3-12.9-31.3L169.8 329 65.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L227 150.3 291.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L470.5 329l24.6 145.7z"></path>
                                  </svg>
                                </div>
                                <span className="text-xs"> (231)</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap text-sm text-default-600">
                          $359.69
                        </td>
                      </tr>
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
