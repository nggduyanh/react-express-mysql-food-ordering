import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DeleteFoodRestaurant, GetFoodRestaurant, handleRefreshPage} from "../routebackend";
import { UserAccount } from "../App";
import SideBar from "../Components/SideBar";
export default function Dish() {
  const { userData } = useContext(UserAccount);
  console.log("useData", userData);
  const [listDish, setListDish] = useState([]);
  
  useEffect(() => {
    fetch(GetFoodRestaurant)
      .then((response) => response.json())
      .then((data) => {
        const filterDish = data.filter((dish) => {
          return dish.MaNguoiBan === userData.MaNguoiBan;
        });
        // console.log("filterDish", filterDish);
        setListDish(filterDish);
      });
  }, [userData]);

  const handleRemoveFood = async (id) => {
    const findDish = listDish.find((dish) => dish.MaMonAn === id);
    try{
      const deleteId = {
        MaMonAn: findDish.MaMonAn
      }
      const response = await axios.delete("http://localhost:3030/monan/delete", {
        data: deleteId, // Truyền dữ liệu trong thuộc tính data
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      alert("Success Delete");
      handleRefreshPage();
    }catch(err) {
      console.error("Error deleting dish:", err);
    }
  };

  const listFood = listDish?.map((item) => {
    return (
      <tr>
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-default-600">
          <div className="flex items-center gap-4">
            <img
              src="./images/Dashboard/pizza.png"
              alt=""
              className="h-[72px] max-w-[72px]"
            />
            <div>
              <p className="text-sm mb-1">{item.TenMonAn}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          {item.MaLoaiMonAn}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          $79
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          16
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          Admin
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          Published
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600 ">
          <div className="flex gap-4">
            <Link to="/edit_dish" state={item} >
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
            
            <button onClick = {() => handleRemoveFood(item.MaMonAn)}>
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
  // console.log(listFood);
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
              <img
                src="./images/avatar.png"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-medium ml-2">Kaiya Botosh</h3>
          </nav>
          <section className="p-6">
            <h1>Dishes List</h1>
            <div className="rounded-lg border border-default-200">
              <div className="py-4 px-6 flex justify-between items-center">
                <h2>Dishes List</h2>
                <div className="flex gap-4 items-center">
                  <button className="px-4 py-3 rounded-md bg-[#F1F5F9]">
                    Sort
                  </button>
                  <Link
                    to="/add_dish"
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
                    Add Dish
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
                      Dish Name
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      Created By
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
                  {listFood}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}