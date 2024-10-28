import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./DropDown";
import { UserAccount } from "../App";
import {
  AddFoodRestaurant,
  GetFoodTypeRestaurant,
  handleRefreshPage,
} from "../routebackend";
import axios from "axios";
import SideBar from "../Components/SideBar";

export default function AddDish() {
  const { userData } = useContext(UserAccount);
  const [typeFood, setTypeFood] = useState([]);
  useEffect(() => {
    fetch(GetFoodTypeRestaurant)
      .then((res) => {
        if (!res.ok) {
          throw new Error("List empty");
        }
        return res.json();
      })
      .then((data) => {
        const filterTypeFood = data.filter((type) => {
          return type.MaNguoiBan === userData.MaNguoiBan;
        });
        console.log("FilterTypeFood", filterTypeFood);
        setTypeFood(filterTypeFood);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setTypeFood([]);
        } else console.log("Another error", err.message);
      });
  }, [userData]);
  const [dish, setDish] = useState({
    TenMonAn: "",
    AnhMonAn: null,
    GiaBan: "",
    MoTa: "",
    MaLoaiMonAn: "",
    MaNguoiBan: userData.MaNguoiBan,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDish((prevForm) => {
      return {
        ...prevForm,
        [name]: name === "gia" ? parseInt(value) : value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formUserData = new FormData();
    formUserData.append("TenMonAn", dish.TenMonAn);
    formUserData.append("AnhMonAn", anoimg);
    formUserData.append("GiaBan", dish.GiaBan);
    formUserData.append("MoTa", dish.MoTa);
    formUserData.append("MaLoaiMonAn", dish.MaLoaiMonAn);
    formUserData.append("MaNguoiBan", dish.MaNguoiBan);
    //  for (let pair of formUserData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    try {
      const response = await axios.post(AddFoodRestaurant, formUserData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Add sucesss");
      handleRefreshPage();
    } catch (err) {
      console.error("Error adding dish:", err);
    }
  };
  const [srcimg, setSrcImg] = useState(null);
  const [anoimg, setAnoImg] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSrcImg(URL.createObjectURL(file));
      setAnoImg(file);
    }
  };
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
            <h1>Add Dish</h1>
            <Link to="/dish">
              <h3>Back to list</h3>
            </Link>
            <div className="grid grid-cols-3 gap-6">
              <div className="border border-default-200 p-6 rounded-lg">
                <div className="border border-default-200 p-6 rounded-lg mb-4 flex justify-center items-center">
                  <div
                    aria-hidden="true"
                    className="relative h-[300px] flex flex-col items-center justify-center"
                  >
                    <input
                      type="file"
                      accept=".jpeg,.jpg,.png,.gif,.svg"
                      name="bgfile"
                      id="bgfile"
                      onChange={handleFileChange}
                      className="relative z-10 opacity-0 w-full h-full"
                    />
                    <div className="absolute h-full w-full border border-[#F97316] border-dashed border-2 rounded-lg flex items-center justify-center bg-[#FFF0E9]">
                      <label htmlFor="">Upload Image</label>
                    </div>
                    <img
                      src={srcimg}
                      alt=""
                      className="absolute h-full w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="border border-default-200 p-6 rounded-lg grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <h5 className="mb-2">Product Name</h5>
                    <input
                      type="text"
                      name="TenMonAn"
                      onChange={handleChange}
                      placeholder="Product Name"
                      className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6"
                    />
                    <h5 className="mb-2">Product Catagory</h5>
                    <select
                      name="MaLoaiMonAn"
                      onChange={handleChange}
                      id=""
                      className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6"
                    >
                      <option value="" hidden>
                        Choose category
                      </option>
                      {typeFood.map((type) => {
                        return (
                          <option value={type.MaLoaiMonAn}>
                            {type.TenLoaiMonAn}
                          </option>
                        );
                      })}
                    </select>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="mb-2">Selling Price</h5>
                        <input
                          type="text"
                          name="GiaBan"
                          onChange={handleChange}
                          placeholder="Selling Price"
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="mb-2">Product Name</h5>
                    <textarea
                      name="MoTa"
                      id=""
                      onChange={handleChange}
                      placeholder="short Description"
                      className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6 h-36"
                    ></textarea>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="px-4 py-2 text-[#EF4444] font-medium flex gap-2 items-center justify-center text-center bg-red-500/10 rounded-lg ml-auto">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path>
                      <path d="M22 21H7"></path>
                      <path d="m5 11 9 9"></path>
                    </svg>
                    Clear
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-white font-medium flex gap-2 items-center justify-center text-center bg-[#F97316] rounded-lg"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
