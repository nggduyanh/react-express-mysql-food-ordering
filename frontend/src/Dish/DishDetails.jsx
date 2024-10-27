import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatCurrency, GetFoodTypeRestaurant } from "../routebackend";

export default function DishDetails() {
  const data = useLocation();
  const detailsFood = data.state;
  const [typeFood, setTypeFood] = useState([]);
  useEffect(() => {
    fetch(GetFoodTypeRestaurant)
      .then((res) =>{
        if(!res.ok){
          throw new Error("List empty")
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
      .catch(err => {
        if(err.message.includes("404")){
          setTypeFood([])
        }
        else console.log("Another error", err.message);
      })
  }, [data]);
  return (
    <div className="h-screen w-screen">
      <div className="flex h-full">
        <div
          id="sidebar"
          class="flex flex-col transition-all duration-300 w-64 p-4 border-r border-[#F58220]"
        >
          <img src="./images/logo.png" className="relative h-10 w-10 mx-auto" />
          <div className="flex flex-col h-full mt-5 text-sm">
            <Link
              to="/home"
              className="py-3 px-4 mt-1 rounded-lg bg-gray-200 hover:bg-gray-200 hover:rounded-lg"
            >
              Dashboard
            </Link>
            <Link
              to="/orders_list"
              className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg"
            >
              Orders List
            </Link>
            <Link
              to="/order_details"
              className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg"
            >
              Order Details
            </Link>
            <Link
              to="/dish"
              className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg"
            >
              Dish List
            </Link>
            
            <Link
              to="/add_dish"
              className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg"
            >
              Add Dish
            </Link>
            <Link
              to="/edit_dish"
              className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg"
            >
              Edit Dish
            </Link>

            <Link
              to="/profile"
              className="py-3 px-4 mt-auto hover:bg-gray-200 hover:rounded-lg"
            >
              Profile
            </Link>
            <Link
              to="/"
              className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg"
            >
              Logout
            </Link>
          </div>
        </div>
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
              <img
                src="./images/avatar.png"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-medium ml-2">Kaiya Botosh</h3>
          </nav>
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
                  {typeFood.map(type => {
                    return <div className="rounded-full border border-default-200 px-3 py-1.5 text-xs">
                    {type.TenLoaiMonAn}
                  </div>
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
