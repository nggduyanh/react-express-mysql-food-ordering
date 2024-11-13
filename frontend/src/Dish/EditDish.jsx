import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAccount } from "../App";
import {
  GetFoodRestaurant,
  GetFoodTypeRestaurant,
  GetUserInfo,
  localStaticFile,
  UpdateFoodRestaurant,
} from "../routebackend";
import axios from "axios";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import useFetchData from "../Components/useFetchData";

export default function EditDish() {
  const data = useLocation();
  const detailsFood = data.state;
  // const { userData } = useContext(UserAccount);
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

  const navigate = useNavigate();
  const Cancel = () => {
    navigate("/dish");
  };

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
          return type.MaNguoiBan === Seller?.[0]?.MaNguoiBan;
        });
        setTypeFood(filterTypeFood);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setTypeFood([]);
        } else console.log("Another error", err.message);
      });
  }, [Seller]);

  const [dish, setDish] = useState({
    MaMonAn: detailsFood.MaMonAn,
    TenMonAn: "",
    AnhMonAn: null,
    GiaBan: "",
    MoTa: "",
    MaLoaiMonAn: "",
    MaNguoiBan: Seller?.[0]?.MaNguoiBan,
  });
  const [srcimg, setSrcImg] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file" && files[0]) {
      const file = files[0];
      setSrcImg(URL.createObjectURL(file));
      setDish((prevForm) => ({
        ...prevForm,
        [name]: file, // Lưu tệp ảnh vào trạng thái của dish
      }));
    } else {
      setDish((prevForm) => ({
        ...prevForm,
        [name]: name === "gia" ? parseInt(value) : value,
      }));
    }
  };
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setDish((prevForm) => {
  //     return {
  //       ...prevForm,
  //       [name]: name === "gia" ? parseInt(value) : value,
  //     };
  //   });
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("dish", dish);
    try {
      const response = await axios.patch(
        `http://localhost:3030/monan/update`,
        dish,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${tokenValue}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        // Kiểm tra trạng thái phản hồi
        alert("Update successful");
        handleRefreshPage();
      } else {
        console.error("Failed to update dish. Status:", response.status);
        alert("Failed to update dish. Please try again.");
      }
    } catch (err) {
      console.error("Error adding dish:", err);
    }
  };
console.log(detailsFood);
  return (
    <div className="h-screen w-screen">
      <div className="flex h-full">
        <SideBar />
        <div class="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <h1>Edit Dish</h1>
            <Link to="/dish">
              <h3>Back to list</h3>
            </Link>
            <div className="grid grid-cols-3 gap-6">
            <div className="border border-default-200 p-6 rounded-lg">
                <div className="border border-default-200 p-6 rounded-lg mb-4 flex justify-center items-center">
                  <div className="relative h-[300px] flex flex-col items-center justify-center">
                    <input
                      type="file"
                      accept=".jpeg,.jpg,.png,.gif,.svg"
                      name="AnhMonAn"
                      // onChange={handleFileChange}
                      onChange={handleChange}
                      className="relative z-10 opacity-0 w-full h-full"
                    />
                    <div className="absolute h-full w-full border-[#F97316] border-dashed border-2 rounded-lg flex items-center justify-center bg-[#FFF0E9]">
                      <label htmlFor="">Upload Image</label>
                    </div>
                    <img
                      src={localStaticFile + detailsFood.AnhMonAn}
                      alt=""
                      className="absolute h-full w-full rounded-lg"
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
                      placeholder={detailsFood.TenMonAn}
                      className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6"
                    />
                    <h5 className="mb-2">Product Catagory</h5>
                    <select
                      name="MaLoaiMonAn"
                      onChange={handleChange}
                      id=""
                      className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6"
                    >
                      {typeFood
                        .filter((type) => {
                          return type.MaLoaiMonAn === detailsFood.MaLoaiMonAn;
                        })
                        .map((items) => {
                          return (
                            <option
                              key={items.MaLoaiMonAn}
                              value={items.MaLoaiMonAn}
                            >
                              {items.TenLoaiMonAn}
                            </option>
                          );
                        })}
                       
                      {typeFood?.map((type) => {
                        return (
                          <option
                            key={type.MaLoaiMonAn}
                            value={type.MaLoaiMonAn}
                          >
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
                          placeholder={detailsFood.GiaBan}
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
                      placeholder={detailsFood.MoTa}
                      className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6 h-36"
                    ></textarea>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={Cancel}
                    className="px-4 py-2 text-[#F97316] font-medium flex gap-2 items-center justify-center text-center border border-[#F97316] rounded-lg ml-auto"
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
                      <path d="M3 7v6h6"></path>
                      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
                    </svg>
                    Cancel
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
