import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  // DeleteFoodRestaurant,
  formatCurrency,
  GetFoodRestaurant,
  GetFoodTypeRestaurant,
  GetUserInfo,
  handleRefreshPage,
  localStaticFile,
} from "../../routebackend";
// import { UserAccount } from "../App";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import useFetchData from "../Components/useFetchData";
export default function Dish() {
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

  const [listDish, setListDish] = useState([]);
  useEffect(() => {
    fetch(GetFoodRestaurant, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filterDish = data.filter((dish) => {
          return dish?.MaNguoiBan === Seller?.[0]?.MaNguoiBan;
        });
        setListDish(filterDish);
      });
  }, [Seller, tokenValue]);

  const [listDishT, setlistDishT] = useState([]);
  useEffect(() => {
    fetch(GetFoodTypeRestaurant, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const filterDish = data.filter((dish) => {
          return dish?.MaNguoiBan === Seller?.[0]?.MaNguoiBan;
        });
        setlistDishT(filterDish);
      });
  }, [listDish, Seller, tokenValue]);

  const handleRemoveFood = async (id) => {
    const findDish = listDish.find((dish) => dish.MaMonAn === id);
    try {
      const deleteId = {
        MaMonAn: findDish.MaMonAn,
      };
      const response = await axios.delete(
        "http://localhost:3030/monan/delete",
        {
          data: deleteId, // Truyền dữ liệu trong thuộc tính data
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
          withCredentials: true,
        }
      );
      alert("Success Delete");
      handleRefreshPage();
    } catch (err) {
      console.error("Error deleting dish:", err);
    }
  };

  const listFood = listDish?.map((item, index) => {
    return (
      <tr key={index}>
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-default-600">
          <div className="flex items-center gap-4">
            {item.AnhMonAn !== null && item.AnhMonAn !== "undefined" ? (
              <img
                src={localStaticFile + item.AnhMonAn}
                alt=""
                className="h-[72px] max-w-[72px]"
              />
            ) : (
              <img
                src="./images/Dashboard/pizza.png"
                alt=""
                className="h-[72px] max-w-[72px]"
              />
            )}

            <div>
              <p className="text-sm mb-1">{item.TenMonAn}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          {listDishT.find((dish) => dish.MaLoaiMonAn === item.MaLoaiMonAn)
            ?.TenLoaiMonAn || "N/A"}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          {formatCurrency(item.GiaBan)}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
          {item.MoTa}
        </td>

        <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600 ">
          <div className="flex gap-4">
            <Link to="/edit_dish" state={item}>
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
            </Link>
            <Link to="/dish_details" state={item}>
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
            <button onClick={() => handleRemoveFood(item.MaMonAn)}>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cursor-pointer transition-colors hover:text-red-500"
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
        <div className="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <h1 className="text-xl font-medium">Dishes List</h1>
            <div className="rounded-lg border border-default-200">
              <div className="py-4 px-6 flex justify-between items-center">
                <h2>Dishes List</h2>
                <div className="flex gap-4 items-center">
                  <Link
                    to="/add_dish"
                    className="bg-[#F58220] px-4 py-3 rounded-md"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="me-2 inline-flex align-middle"
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
              <table className="min-w-full divide-y divide-default-200">
                <thead>
                  <tr className="bg-[#F1F5F9]">
                    <th
                      scope="col"
                      className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      Dish Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-start text-sm font-semibold text-default-800"
                    >
                      Description
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
