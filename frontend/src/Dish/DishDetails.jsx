import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  formatCurrency,
  formatDate,
  formatTime,
  GetFoodTypeRestaurant,
  GetUserInfo,
} from "../routebackend";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import useFetchData from "../Components/useFetchData";

export default function DishDetails() {
  const data = useLocation();
  const detailsFood = data.state;
  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  let [userData] = useFetchData(GetUserInfo, tokenValue);
  const userInfo = userData?.data?.[0];

  const [typeFood, setTypeFood] = useState([]);
  useEffect(() => {
    fetch(GetFoodTypeRestaurant, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("List empty");
        }
        return res.json();
      })
      .then((data) => {
        const filterTypeFood = data.filter((type) => {
          return type.MaLoaiMonAn === detailsFood.MaLoaiMonAn;
        });
        setTypeFood(filterTypeFood);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setTypeFood([]);
        } else console.log("Another error", err.message);
      });
  }, [data]);
  //http://localhost:3030/nguoiban/nhanxet/1

  const [NhanXet, setNhanXet] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3030/nguoiban/nhanxet/1`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("List empty");
        }
        return res.json();
      })
      .then((data) => {
        const filterData = data.filter((item) => {
          return item?.MonAn?.MaMonAn === 4;
        });
        setNhanXet(filterData);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setNhanXet([]);
        } else console.log("Another error", err.message);
      });
  });

  // console.log(NhanXet?.[0]?.NhanXet.MaNguoiMua);
  const [Buyers, setBuyers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3030/nguoidung/`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("List empty");
        }
        return res.json();
      })
      .then((data) => {
        setBuyers(data);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setBuyers([]);
        } else console.log("Another error", err.message);
      });
  });

  // console.log(Buyers);

  const list = NhanXet.map((item) => {
    // console.log(item?.NhanXet?.MaNguoiMua)
    return (
      <div className="w-full flex gap-3 p-2 rounded-lg border border-default-200 items-center">
        <img
          src="../../images/avatar.png"
          alt=""
          className="rounded-full h-10"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <h1 className="text-md ">
              {item?.NhanXet?.MaNguoiDung}
              {Buyers.find(
                (buyer) => buyer?.MaNguoiDung === item?.NhanXet?.MaNguoiMua
              )?.TenNguoiDung || "N/A"}
              <span className="text-xs text-gray-500 ml-2">
                {formatDate(item?.NhanXet?.ThoiGianTao)}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                {formatTime(item?.NhanXet?.ThoiGianTao)}
              </span>
            </h1>
            <span className="text-sm">Diem: {item?.NhanXet?.Diem}</span>
          </div>
          
          <p>{item?.NhanXet?.NoiDung}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full">
        <SideBar />
        <div class="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <h1>Food Name</h1>
            <Link to="/dish">
              <h3>Back to list</h3>
            </Link>
            <div className="pt-6 grid grid-cols-2 gap-6">
              <div className="border border-default-200 p-6 rounded-lg">
                <div className="flex justify-center items-center">
                  <img
                    src="./images/Dashboard/burito1.png"
                    alt=""
                    className="mx-9"
                  />
                </div>
                {/* <div className="flex gap-2 h-32 justify-center">
                                    <div className="border border-[#F58220] rounded-lg overflow-hidden h-32 w-32">
                                        <img src="./images/Dashboard/burito2.png" alt="" className="h-full" />
                                    </div>
                                    <div className="border border-[#F58220] rounded-lg overflow-hidden h-32 w-32">
                                        <img src="./images/Dashboard/burito1.png" alt="" className="h-full" />
                                    </div>
                                    <div className="border border-[#F58220] rounded-lg overflow-hidden h-32 w-32">
                                        <img src="./images/Dashboard/burito3.png" alt="" className="h-full" />
                                    </div>
                                </div> */}
              </div>
              <div className="border border-default-200 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h1 className="text-4xl">{detailsFood.TenMonAn}</h1>
                  <h3 className="text-3xl">
                    {formatCurrency(detailsFood.GiaBan)}
                  </h3>
                </div>

                <p className="mb-4 text-md text-default-500">
                  {detailsFood.MoTa}
                </p>
                <div className="flex mb-4 gap-2">
                  {typeFood.map((type) => {
                    return (
                      <div className="rounded-full border border-default-200 px-3 py-1.5 text-xs">
                        {type.TenLoaiMonAn}
                      </div>
                    );
                  })}
                </div>
                <h4 className="text-xl mb-4">Đánh giá</h4>
                {list}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
