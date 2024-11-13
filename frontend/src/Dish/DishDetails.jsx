import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatCurrency, GetFoodTypeRestaurant } from "../routebackend";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";

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
        console.log("FilterTypeFood", filterTypeFood);
        setTypeFood(filterTypeFood);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setTypeFood([]);
        } else console.log("Another error", err.message);
      });
  }, [data]);
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
                <div className="flex mb-5 gap-2">
                  {typeFood.map((type) => {
                    return (
                      <div className="rounded-full border border-default-200 px-3 py-1.5 text-xs">
                        {type.TenLoaiMonAn}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
