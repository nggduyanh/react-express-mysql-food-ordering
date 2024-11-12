import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { UserAccount } from "../App";
import useFetchData from "../Components/useFetchData";
import { GetUserInfo } from "../routebackend";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function LineChart() {
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

  const [Orders, setOrders] = useState([]); // Tất cả các đơn hàng
  useEffect(() => {
    fetch(`http://localhost:3030/donhang/nguoiban/${Seller?.[0]?.MaNguoiBan}`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  }, [Seller]);
  const superdata = [];

  const obj = Array.isArray(Orders)
  ? Orders.map((item) => ({
      month: new Date(item.ThoiGianTao).getMonth() + 1,
      count: 0,
      data: item.GiaBan,
    }))
  : [];
  let flag = 0;
  const spobj = [
    {
      month: 1,
      count: 0,
      data: 0,
    }, 
    {
      month: 2,
      count: 0,
      data: 0,
    }, 
    {
      month: 3,
      count: 0,
      data: 0,
    }, 
    {
      month: 4,
      count: 0,
      data: 0,
    }, 
    {
      month: 5,
      count: 0,
      data: 0,
    }, 
    {
      month: 6,
      count: 0,
      data: 0,
    }, 
    {
      month: 7,
      count: 0,
      data: 0,
    }, 
    {
      month: 8,
      count: 0,
      data: 0,
    }, 
    {
      month: 9,
      count: 0,
      data: 0,
    }, 
    {
      month: 10,
      count: 0,
      data: 0,
    }, 
    {
      month: 11,
      count: 0,
      data: 0,
    }, 
    {
      month: 12,
      count: 0,
      data: 0,
    }
  ];
  for (let i = 0; i < obj.length; i++) {
    for (let j = 0; j < spobj.length; j++) {
      if (spobj[j].month === obj[i].month) {
        spobj[j].data += obj[i].data;
        spobj[j].count++;
        flag = 1;
        break;
      }
    }
    flag = 0;
  }
  for(let i = 0; i < spobj.length; i++) {
    superdata.push(spobj[i].data/spobj[i].count);
  }

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
    datasets: [
      {
        label: "Revenue",
        data: superdata,
        borderColor: "#4F46E5", // màu đường
        backgroundColor: "rgba(79, 70, 229, 0.2)", // Semi-transparent Indigo
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#4F46E5", // màu điểm
        tension: 0, // độ cong của đường
      },
    ],
  };
  // Tùy chọn cho biểu đồ
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#4B5563", // labels
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6B7280", // thanh ngang
        },
      },
      y: {
        ticks: {
          color: "#6B7280", // thanh dọc
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="relative h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
