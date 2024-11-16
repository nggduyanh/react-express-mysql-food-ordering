import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../Components/SideBar";
// import { UserAccount } from "../../App";
import {
  formatCurrency,
  formatDate,
  formatTime,
  // GetDetailsOrder,
  // GetOrder,
  // GetOrderRestaurant,
  GetUserInfo,
  handleRefreshPage,
  // localStaticFile,
  OrderStatus,
} from "../../../routebackend";
import NavBar from "../../Components/NavBar";
import useFetchData from "../../Components/useFetchData";

export default function OrdersList() {
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
  }, [userInfo, tokenValue]);

  const [Orders, setOrders] = useState([]); // Tất cả các đơn hàng
  useEffect(() => {
    fetch(`http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Not found");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        setOrders([]);
      });
  }, [Seller, tokenValue]);

  const [SuccessOrder, setSuccessOrder] = useState([]); // Đơn hàng được giao thành công Trang thai === 4
  useEffect(() => {
    fetch(`http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filterOrder = data?.filter((order) => {
          return order.TrangThai !== 5 && order.TrangThai !== 1;
        });
        setSuccessOrder(filterOrder);
      });
  }, [Seller, tokenValue]);

  const [TrangThai, setTrangThai] = useState([]);
  useEffect(() => {
    fetch(OrderStatus, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTrangThai(data);
      });
  }, [userData, tokenValue]);

  const listOrder = SuccessOrder?.map((item) => {
    if (SuccessOrder.length > 0) {
      return (
        <tr key={item}>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
            {formatDate(item.ThoiGianTao)}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-default-600 hover:cursor-pointer">
            {item.MaDonHang}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
            {formatCurrency(item.GiaBan)}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
            {TrangThai.find((order) => order.MaTrangThai === item.TrangThai)
              ?.TenTrangThai || "N/A"}
          </td>

          <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
            <Link to="/order_details" state={item}>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cursor-pointer transition-colors hover:text-primary"
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

  const handleChangeStatus = async (id) => {
    fetch(`http://localhost:3030/donhang/update/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify({
        TrangThai: 2,
        MaDonHang: id,
      }),
    }).then((res) => res.json());
    handleRefreshPage();
  };
  const [onGoingOrder, setOnGoinOrder] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filterOrder = data.filter((order) => {
          return order.TrangThai === 1;
        });
        setOnGoinOrder(filterOrder);
      });
  }, [Seller, tokenValue]);
  const list = onGoingOrder?.map((item, index) => {
    if (SuccessOrder.length > 0) {
      return (
        <div
          key={index}
          className="flex flex-col gap-4 bg-[#FFF2E9] p-2 rounded-lg mt-4"
        >
          <div className="flex items-center gap-2">
            <img
              src="./images/Dashboard/pizza.png"
              alt=""
              className="h-16 max-w-16"
            />
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <p className="text-sm mb-1">{item.MaDonHang}</p>
                <p className="text-sm mb-1">{formatTime(item.ThoiGianTao)}</p>
              </div>
              <button
                onClick={() => handleChangeStatus(item.MaDonHang)}
                className="bg-orange-500 text-white font-bold rounded-lg"
              >
                Doi trang thai
              </button>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <h1 className="text-xl font-medium">Orders List</h1>
            <div className="grid grid-cols-12 gap-6 mt-6">
              <div className="col-span-9">
                <div className="grid gap-6 grid-cols-3">
                  <div className="p-6 flex items-center border border-default-200 rounded-lg gap-4">
                    <div className="bg-[#FDE6D5] h-16 w-16 inline-flex justify-center items-center rounded-full">
                      <svg
                        stroke="#F58220"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                  <div className="p-6 flex items-center border border-default-200 rounded-lg gap-4">
                    <div className="bg-[#D6F3DF] h-16 w-16 inline-flex justify-center items-center rounded-full">
                      <svg
                        stroke="#23C55E"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                  <div className="p-6 flex items-center border border-default-200 rounded-lg gap-4">
                    <div className="bg-[#FBF0D4] h-16 w-16 inline-flex justify-center items-center rounded-full">
                      <svg
                        stroke="#EAB309"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                      <h2>{Seller?.[0]?.Diem}</h2>
                    </div>
                  </div>
                </div>
                <div className="border border-default-200 rounded-lg mt-6">
                  <div className="p-6 flex flex-wrap gap-4 justify-between items-center">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-3  rounded-md bg-[#F1F5F9]">
                        Status
                      </button>
                    </div>
                  </div>
                  <table className="w-full divide-y divide-default-200">
                    <thead>
                      <tr className="bg-[#F1F5F9]">
                        <th
                          scope="col"
                          className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-default-200">
                      {listOrder}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col border border-[#F58220] rounded-lg w-auto p-6">
                  <h1>Ongoing Order</h1>
                  <div>
                    <h1>Waiting</h1>
                    {list}
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
