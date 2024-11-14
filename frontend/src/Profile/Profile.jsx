import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GetFoodRestaurant,
  GetSellerInfo,
  GetUserInfo,
  GetUserRole,
} from "../routebackend";
import { UserAccount } from "../App";
import SideBar from "../Components/SideBar";
import axios from "axios";
import NavBar from "../Components/NavBar";
import useFetchData from "../Components/useFetchData";
import PersonalDetails from "./PersonalDetails";
import RestaurantInfo from "./RestaurantInfo";

export default function Profile() {
  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  let [userData] = useFetchData(GetUserInfo, tokenValue);
  const userInfo = userData?.data?.[0];

  const [Seller, setSeller] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3030/nguoiban/current`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSeller(data);
      });
  }, [userInfo]);

  useEffect(() => {
    if (Seller?.MaNguoiBan) {
      setSeller((prevForm) => {
        return {
          ...prevForm,
          MaNguoiBan: Seller?.MaNguoiBan,
        };
      });
    }
  }, [userInfo ]);

  // console.log(userData.TenNguoiBan);
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(User);
  //   console.log(Seller);
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:3030/nguoidung/update`,
  //       User,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );
  //     const res = await axios.patch(
  //       `http://localhost:3030/nguoiban/update`,
  //       Seller,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );
  //     if (response.status === 201) {
  //       alert("Update successful");
  //       handleRefreshPage();
  //     } else {
  //       console.error("Failed to update dish. Status:", response.status);
  //       alert("Failed to update dish. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Error adding dish:", err);
  //   }
  // };

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full">
        <SideBar />
        <div class="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <h1 className="text-xl font-medium mb-6">Profile</h1>
            <div className="flex flex-col gap-6">
              <PersonalDetails
                TenChuSoHuu={Seller?.[0]?.TenChuSoHuu}
                NgaySinh={Seller?.[0]?.NgaySinhChuSoHuu}
                QueQuan={Seller?.[0]?.QueQuanChuSoHuu}
                SDT={userInfo?.SoDienThoai}
                Email={userInfo?.Email}
              />
              <RestaurantInfo
              TenCuaHang= {Seller?.[0]?.TenNguoiBan}
              Hotline = {Seller?.[0]?.Hotline}
              Email = {Seller?.[0]?.Email}
              Address = {Seller?.[0]?.DiaChi}
              City = {Seller?.[0]?.ThanhPho}
              MoCua = {Seller?.[0]?.ThoiGianMoCua}
              DongCua = {Seller?.[0]?.ThoiGianDongCua}
              Var = {[Seller, setSeller]}
              />

              
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
