import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  DeleteFoodRestaurant,
  DeleteVoucher,
  formatCurrency,
  formatDate,
  formatPercent,
  formatTime,
  GetFoodRestaurant,
  GetUserInfo,
  GetVoucher,
  handleRefreshPage,
} from "../routebackend";
import { UserAccount } from "../App";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import useFetchData from "../Components/useFetchData";
export default function Voucher() {
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
  }, [userInfo]);

  const [listVoucher, setListVoucher] = useState([]);
  useEffect(() => {
    fetch(GetVoucher, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const filterVoucher = data.filter((voucher) => {
          return voucher.MaNguoiBan === Seller?.[0]?.MaNguoiBan;
        });
        setListVoucher(filterVoucher);
      });
  }, [Seller]);
// console.log('listVoucher', listVoucher);

  const handleRemoveVoucher = async (id) => {
    const findVoucher = listVoucher.find(
      (voucher) => voucher.MaKhuyenMai === id
    );
    console.log("findVoucher", findVoucher);
    try {
      const deleteId = {
        MaKhuyenMai: findVoucher.MaKhuyenMai,
      };
      const response = await axios.delete(DeleteVoucher, {
        data: deleteId, // Truyền dữ liệu trong thuộc tính data
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
        withCredentials: true,
      });
      alert("Success Delete");
      handleRefreshPage();
    } catch (err) {
      console.error("Error deleting dish:", err);
    }
  };

  console.log("listVoucher", listVoucher);
  const Voucherlist = listVoucher?.map((item) => {
    const isoStringStart = item.NgayTao;
    const isoStringEnd = item.NgayHetHan;
    const dateStart = new Date(isoStringStart);
    const dateEnd = new Date(isoStringEnd);
    const localDateStart = formatDate(dateStart);
    const localTimeStart = formatTime(dateStart);
    const localDateEnd = formatDate(dateEnd);
    const localTimeEnd = formatTime(dateEnd);
    return (
      <tr>
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-default-600">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-ticket-detailed"
              viewBox="0 0 20 16"
            >
              <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M5 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2z" />
              <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5z" />
            </svg>
            <div>
              <p className="text-sm">{item.TenKhuyenMai}</p>
            </div>
          </div>
        </td>
        {item.PhanTram !== null && (
          <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
            {formatPercent(item.PhanTram)}
          </td>
        )}
        {item.GiaTri !== null && (
          <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
            {formatCurrency(item.GiaTri)}
          </td>
        )}
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          {item.SoLuong}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          {localDateStart}
          <br />
          {localTimeStart}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          {localDateEnd}
          <br />
          {localTimeEnd}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600"></td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600 ">
          <div className="flex gap-4">
            <Link to="/edit_voucher" state={item}>
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
            </Link>
            <Link to="/dish_details" state={item}>
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

            <button onClick={() => handleRemoveVoucher(item.MaKhuyenMai)}>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="cursor-pointer transition-colors hover:text-red-500"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" x2="10" y1="11" y2="17"></line>
                <line x1="14" x2="14" y1="11" y2="17"></line>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full">
        <SideBar />
        <div class="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <h1>Voucher List</h1>
            <div className="rounded-lg border border-default-200">
              <div className="py-4 px-6 flex justify-between items-center">
                <h2>Voucher List</h2>
                <div className="flex gap-4 items-center">
                  <button className="px-4 py-3 rounded-md bg-[#F1F5F9]">
                    Sort
                  </button>
                  <Link
                    to="/add_voucher"
                    className="bg-[#F58220] px-4 py-3 rounded-md"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="me-2 inline-flex align-middle"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                    Add Voucher
                  </Link>
                </div>
              </div>
              <table class="min-w-full divide-y divide-default-200">
                <thead>
                  <tr className="bg-[#F1F5F9]">
                    <th
                      scope="col"
                      class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      Voucher Name
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      PhanTram / GiaTri
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      SoLuong
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      NgayBatDau
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      NgayHetHan
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
                <tbody className="divide-y divide-default-200">
                  {Voucherlist}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
