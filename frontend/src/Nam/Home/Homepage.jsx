import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
import {
  formatCurrency,
  formatTime,
  // GetFoodRestaurant,
  // GetUserInfo,
  // localStaticFile,
} from "../../routebackend";
// import { useActionData } from "react-router-dom";
// import axios from "axios";
// import { UserAccount } from "../App";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import LineChart from "./LineChart";
import { formatDate } from "../../Route";
// import useFetchData from "../Components/useFetchData";
// import { formatDate } from "react-datepicker/dist/date_utils";

export default function Homepage() {
  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  // let userData = useFetchData(GetUserInfo, tokenValue);
  // const userInfo = userData?.data?.[0];
  // console.log("userInfo", userInfo);
  const [Seller, getSeller] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3030/nguoiban/current`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        getSeller(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tokenValue]);

  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    if (Seller?.length > 0) {
      fetch(
        `http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            throw new Error("No order found");
          }
          if (!response.ok) {
            throw new Error("No response founded");
          }
          return;
        })
        .then((data) => {
          setOrders(data);
        });
    }
  }, [Seller, tokenValue]);

  const TotalRevenue = Array.isArray(Orders)
    ? Orders.reduce((total, order) => total + order.GiaBan, 0)
    : 0;

  const [OrdersThisMonth, setOrdersThisMonth] = useState([]);
  useEffect(() => {
    if (Seller?.length > 0) {
      const today = new Date();
      fetch(
        `http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            throw new Error("No order found");
          }
          if (!response.ok) {
            throw new Error("No response founded");
          }
          return response.json();
        })
        .then((data) => {
          const filterOrder = data?.filter((order) => {
            return (
              new Date(order?.ThoiGianTao)?.getMonth() + 1 ===
              today?.getMonth() + 1
            );
          });
          setOrdersThisMonth(filterOrder);
        })
        .catch((err) => {
          setOrdersThisMonth([]);
        });
    }
  }, [Seller, tokenValue]);

  const [OrdersLastMonth, setOrdersLastMonth] = useState([]);
  useEffect(() => {
    if (Seller?.length > 0) {
      const lastmonth = new Date();
      fetch(
        `http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            throw new Error("No order found");
          }
          if (!response.ok) {
            throw new Error("No response founded");
          }
          return response.json();
        })
        .then((data) => {
          const filterOrder = data?.filter((order) => {
            return (
              new Date(order?.ThoiGianTao)?.getMonth() + 1 ===
              lastmonth?.getMonth()
            );
          });
          setOrdersLastMonth(filterOrder);
        })
        .catch((err) => {
          setOrdersLastMonth([]);
        });
    }
  }, [Seller, tokenValue]);

  let OrdersMonthPercent;
  if (OrdersLastMonth.length === 0 && OrdersThisMonth.length === 0) {
    OrdersMonthPercent = 0;
  } else if (OrdersLastMonth.length === 0) {
    OrdersMonthPercent = 100;
  } else {
    OrdersMonthPercent =
      ((OrdersThisMonth.length - OrdersLastMonth.length) /
        OrdersLastMonth.length) *
      100;
  }
  const OrdersTMI =
    OrdersMonthPercent >= 0
      ? OrdersMonthPercent + "% increase"
      : -OrdersMonthPercent + "% decrease";

  const [CanceledOrderThisMonth, setCanceledOrderThisMonth] = useState([]);
  useEffect(() => {
    if (Seller?.length > 0) {
      const today = new Date();
      fetch(
        `http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            throw new Error("No order found");
          }
          if (!response.ok) {
            throw new Error("No response found");
          }
          return response.json();
        })
        .then((data) => {
          const filterOrder = data?.filter((order) => {
            return (
              order?.TrangThai === 5 &&
              new Date(order?.ThoiGianTao)?.getMonth() + 1 ===
                today?.getMonth() + 1
            );
          });
          setCanceledOrderThisMonth(filterOrder);
        })
        .catch((err) => {
          setCanceledOrderLastMonth([]);
        });
    }
  }, [Seller, tokenValue]);

  const [CanceledOrderLastMonth, setCanceledOrderLastMonth] = useState([]);
  useEffect(() => {
    if (Seller?.length > 0) {
      const lastmonth = new Date();
      fetch(
        `http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            throw new Error("No order found");
          }
          if (!response.ok) {
            throw new Error("No response founded");
          }
          return response.json();
        })
        .then((data) => {
          const filterOrder = data?.filter((order) => {
            return (
              order?.TrangThai === 5 &&
              new Date(order?.ThoiGianTao)?.getMonth() + 1 ===
                lastmonth?.getMonth()
            );
          });
          setCanceledOrderLastMonth(filterOrder);
        })
        .catch((err) => {
          setCanceledOrderLastMonth([]);
        });
    }
  }, [Seller, tokenValue]);

  let CanceledOrdersMonthPercent;
  if (
    CanceledOrderLastMonth.length === 0 &&
    CanceledOrderThisMonth.length === 0
  ) {
    CanceledOrdersMonthPercent = 0;
  } else if (CanceledOrderLastMonth.length === 0) {
    CanceledOrdersMonthPercent = 100;
  } else {
    CanceledOrdersMonthPercent =
      ((CanceledOrderThisMonth.length - CanceledOrderLastMonth.length) /
        CanceledOrderLastMonth.length) *
      100;
  }
  const CanceledOrdersTMI =
    CanceledOrdersMonthPercent >= 0
      ? CanceledOrdersMonthPercent + "% increase"
      : -CanceledOrdersMonthPercent + "% decrease";

  const [SuccessOrderThisMonth, setSuccessOrderThisMonth] = useState([]);
  useEffect(() => {
    if (Seller?.length > 0) {
      const today = new Date();
      fetch(
        `http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            throw new Error("No order found");
          }
          if (!response.ok) {
            throw new Error("No response founded");
          }
          return response.json();
        })
        .then((data) => {
          const filterOrder = data?.filter((order) => {
            return (
              order?.TrangThai === 4 &&
              new Date(order?.ThoiGianTao)?.getMonth() + 1 ===
                today?.getMonth() + 1
            );
          });
          setSuccessOrderThisMonth(filterOrder);
        })
        .catch((err) => {
          setCanceledOrderLastMonth([]);
        });
    }
  }, [Seller, tokenValue]);

  const [SuccessOrderLastMonth, setSuccessOrderLastMonth] = useState([]);
  useEffect(() => {
    if (Seller?.length > 0) {
      const lastmonth = new Date();
      fetch(
        `http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            throw new Error("No order found");
          }
          if (!response.ok) {
            throw new Error("No response founded");
          }
          return response.json();
        })
        .then((data) => {
          const filterOrder = data?.filter((order) => {
            return (
              order?.TrangThai === 4 &&
              new Date(order?.ThoiGianTao)?.getMonth() + 1 ===
                lastmonth?.getMonth()
            );
          });
          setSuccessOrderLastMonth(filterOrder);
        })
        .catch((err) => {
          setSuccessOrderLastMonth([]);
        });
    }
  }, [Seller, tokenValue]);

  let SuccessOrdersMonthPercent;
  if (
    SuccessOrderLastMonth.length === 0 &&
    SuccessOrderThisMonth.length === 0
  ) {
    SuccessOrdersMonthPercent = 0;
  } else if (CanceledOrderLastMonth.length === 0) {
    SuccessOrdersMonthPercent = 100;
  } else {
    SuccessOrdersMonthPercent =
      ((SuccessOrderThisMonth.length - SuccessOrderLastMonth.length) /
        SuccessOrderLastMonth.length) *
      100;
  }
  const SuccessOrdersTMI =
    SuccessOrdersMonthPercent >= 0
      ? SuccessOrdersMonthPercent + "% increase"
      : -SuccessOrdersMonthPercent + "% decrease";

  const [RecentOrders, setRecentOrders] = useState([]);
  useEffect(() => {
    if (Seller?.length > 0) {
      const today = new Date();
      fetch(
        `http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            throw new Error("No order found");
          }
          if (!response.ok) {
            throw new Error("No response founded");
          }
          return response.json();
        })
        .then((data) => {
          const filterOrder = data?.filter((order) => {
            return (
              order?.TrangThai === 1 &&
              new Date(order?.ThoiGianTao)?.getMonth() + 1 ===
                today?.getMonth() + 1 &&
              new Date(order?.ThoiGianTao)?.getDate() === today?.getDate()
            );
          });
          setRecentOrders(filterOrder);
        })
        .catch((err) => {
          setRecentOrders([]);
        });
    }
  }, [Seller, tokenValue]);

  const listRecentOrder = RecentOrders?.map((item) => {
    return (
      <tr key={item}>
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-default-600">
          {item?.MaDonHang}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          {formatDate(item?.ThoiGianTao)}
        </td>
        {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          {formatTime(item?.ThoiGianTao)}
        </td> */}
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          {formatCurrency(item?.GiaBan)}
        </td>
      </tr>
    );
  });

  return (
    // <h1>Hello World</h1>
    <div className="">
      <div className="relative flex h-full">
        <SideBar />
        <div className="flex-1 mt-0 max-w-full">
          <NavBar />
          <section className="p-6">
            <h1 className="text-xl font-medium">Dashboard</h1>
            <div className="mt-6 grid grid-cols-4 gap-6">
              <div className="p-4 border border-default-200 rounded-lg flex flex-col items-center justify-center w-auto">
                <h4 className="text-[#F58220] font-semibold text-2xl mb-2">
                  {formatCurrency(TotalRevenue)}
                </h4>
                <h6 className="font-medium text-lg mb-4">Total Revenue</h6>
              </div>
              <div className="p-4 border border-default-200 rounded-lg flex flex-col items-center justify-between w-auto">
                <h4 className="text-[#F58220] font-semibold text-2xl mb-2">
                  {OrdersThisMonth.length}
                </h4>
                <h6 className="font-medium text-lg mb-4">Receive Orders</h6>
                {OrdersMonthPercent >= 0 && (
                  <p className="text-[#22C55E] text-sm font-medium">
                    {OrdersTMI}
                  </p>
                )}
                {OrdersMonthPercent < 0 && (
                  <p className="text-[#EF4444] text-sm font-medium">
                    {OrdersTMI}
                  </p>
                )}
              </div>
              <div className="p-4 border border-default-200 rounded-lg flex flex-col items-center justify-between w-auto">
                <h4 className="text-[#F58220] font-semibold text-2xl mb-2">
                  {CanceledOrderThisMonth.length}
                </h4>
                <h6 className="font-medium text-lg mb-4">Canceled Orders</h6>
                {CanceledOrdersMonthPercent >= 0 && (
                  <p className="text-[#22C55E] text-sm font-medium">
                    {CanceledOrdersTMI}
                  </p>
                )}
                {CanceledOrdersMonthPercent < 0 && (
                  <p className="text-[#EF4444] text-sm font-medium">
                    {CanceledOrdersTMI}
                  </p>
                )}
              </div>
              <div className="p-4 border border-default-200 rounded-lg flex flex-col items-center justify-between w-auto">
                <h4 className="text-[#F58220] font-semibold text-2xl mb-2">
                  {SuccessOrderThisMonth.length}
                </h4>
                <h6 className="font-medium text-lg mb-4">Successful Orders</h6>
                {SuccessOrdersMonthPercent >= 0 && (
                  <p className="text-[#22C55E] text-sm font-medium">
                    {SuccessOrdersTMI}
                  </p>
                )}
                {SuccessOrdersMonthPercent < 0 && (
                  <p className="text-[#EF4444] text-sm font-medium">
                    {SuccessOrdersTMI}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <h1 className="text-xl font-medium mb-6">Revenue</h1>
                <div className="bg-gray-100 flex items-center justify-center w-full">
                  <LineChart />
                </div>
                <h1 className="text-xl font-medium mt-6">
                  Best Selling Products
                </h1>
                <div className="mt-6 grid grid-cols-3 gap-6">
                  <div className="p-4 border border-[#F58220] rounded-lg flex flex-col items-center justify-between w-auto">
                    <h4 className="text-[#F58220] font-semibold text-2xl mb-2">
                      325.7K
                    </h4>
                    <h6 className="font-medium text-lg mb-4">Total Revenue</h6>
                    <p className="text-[#22C55E] text-sm font-medium">
                      10% increase
                    </p>
                  </div>
                  <div className="p-4 border border-[#F58220] rounded-lg flex flex-col items-center justify-between w-auto">
                    <h4 className="text-[#F58220] font-semibold text-2xl mb-2">
                      325.7K
                    </h4>
                    <h6 className="font-medium text-lg mb-4">New Orders</h6>
                    <p className="text-[#22C55E] text-sm font-medium">
                      10% increase
                    </p>
                  </div>
                  <div className="p-4 border border-[#F58220] rounded-lg flex flex-col items-center justify-between w-auto">
                    <h4 className="text-[#F58220] font-semibold text-2xl mb-2">
                      325.7K
                    </h4>
                    <h6 className="font-medium text-lg mb-4">Receive Orders</h6>
                    <p className="text-[#22C55E] text-sm font-medium">
                      10% increase
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-default-200 rounded-lg">
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
                <table className="min-w-full divide-y divide-default-200">
                  <thead>
                    <tr className="bg-[#F1F5F9]">
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
                        Date
                      </th>
                      {/* <th
                        scope="col"
                        className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                      >
                        Time
                      </th> */}
                      <th
                        scope="col"
                        className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-default-200">
                    {listRecentOrder}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
