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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function LineChart() {
  const { userData } = useContext(UserAccount);
  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3030/donhang/nguoiban/${userData.MaNguoiBan}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  });
  const superdata = [];
  //   const spdata = Orders.map((item) => {
  //     return {
  //       data: item.GiaBan,
  //     };
  //   })
  // for(let i = 0; i < Orders.length; i++) {
  //     superdata.push( Orders[i].GiaBan)
  // }

  const obj = Orders.map((item) => {
    return {
      month: new Date(item.ThoiGianTao).getMonth() + 1,
      count: 0,
      data: item.GiaBan,
    };
  });
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
