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

export default function Profile() {
  const { userData } = useContext(UserAccount);

  const navigate = useNavigate();
  const [User, setUser] = useState([]);
  useEffect(() => {
    fetch(GetUserInfo)
      .then((res) => {
        if (!res.ok) {
          throw new Error("List empty");
        }
        return res.json();
      })
      .then((data) => {
        const filterUser = data.find((user) => {
          return user.MaNguoiDung === userData.MaNguoiBan;
        });
        setUser(filterUser);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setTypeFood([]);
        } else console.log("Another error", err.message);
      });
  }, [userData]);

  const [Seller, setSeller] = useState({
    MaNguoiBan: userData.MaNguoiBan,
    TenNguoiBan: "",
    ThanhPho: "",
    ThoiGianMoCua: userData.ThoiGianMoCua,
    ThoiGianDongCua: userData.ThoiGianDongCua,
    DiaChi: "",
    AnhNguoiBan: null,
    CanCuoc: null,
    GiayPhep: null,
    Diem: userData.Diem,
    LuotDanhGia: userData.LuotDanhGia,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };
  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setSeller((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  // console.log(userData.TenNguoiBan);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(User);
    console.log(Seller);
    try {
      const response = await axios.patch(
        `http://localhost:3030/nguoidung/update`,
        User,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const res = await axios.patch(
        `http://localhost:3030/nguoiban/update`,
        Seller,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
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
          <NavBar />
          <section className="p-6">
            <h1 className="text-xl font-medium mb-6">Profile</h1>
            <div className="flex flex-col gap-6">
              {/* <div className="border border-default-200 p-6 rounded-lg">
                <h4 class="mb-4 text-xl font-medium text-default-900">
                  Personal Details
                </h4>
                <div className="grid grid-cols-5 gap-6">
                  <div className="flex justify-center">
                    <div className="bg-[#FFF0E9] border border-[#F97316] border-2 border-dashed rounded-full h-48 w-48 flex items-center justify-center">
                      <p>Add photo</p>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h5 className="mb-2">First Name</h5>
                        <input
                          type="text"
                          placeholder="Enter your First Name"
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Last Name</h5>
                        <input
                          type="text"
                          placeholder="Enter your Last Name"
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>

                      <div>
                        <h5 className="mb-2">User Name</h5>
                        <input
                          type="text"
                          placeholder={User.TenNguoiDung}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Email</h5>
                        <input
                          type="text"
                          placeholder={User.Email}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Phone Number</h5>
                        <input
                          type="text"
                          placeholder={User.SoDienThoai}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>

                      <button className="col-span-2 px-4 py-2 text-white font-medium flex gap-2 items-center justify-center text-center bg-[#F97316] rounded-lg w-auto ml-auto">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="border border-default-200 p-6 rounded-lg">
                <h4 class="mb-4 text-xl font-medium text-default-900">
                  Restaurant
                </h4>
                <div className="grid grid-cols-5 gap-6">
                  <div className="flex justify-center ">
                    <div
                      aria-hidden="true"
                      className="relative h-48 w-48 flex flex-col items-center justify-center"
                    >
                      <input
                        type="file"
                        accept=".jpeg,.jpg,.png,.gif,.svg"
                        name="bgfile"
                        id="bgfile"
                        onChange={handleFileChange}
                        className="relative z-10 opacity-0 w-full h-full rounded-full"
                      />
                      <div className=" absolute bg-[#FFF0E9] border-[#F97316] border-2 border-dashed rounded-full h-48 w-48 flex items-center justify-center">
                        <p>Add photo</p>
                      </div>
                      <img
                        src={srcimg}
                        alt=""
                        className="absolute h-full w-full rounded-full"
                      />
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="mb-4 col-span-2">
                        <h5 className="mb-2">Restaurant Name</h5>
                        <input
                          type="text"
                          name="TenNguoiBan"
                          onChange={handleChange1}
                          placeholder={userData.TenNguoiBan}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Phone Number</h5>
                        <input
                          type="text"
                          name="SoDienThoai"
                          onChange={handleChange}
                          placeholder={User.SoDienThoai}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Email</h5>
                        <input
                          type="text"
                          name="Email"
                          onChange={handleChange}
                          placeholder={User.Email}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Address</h5>
                        <input
                          type="text"
                          name="DiaChi"
                          onChange={handleChange1}
                          placeholder={userData.DiaChi}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>

                      <div>
                        <h5 className="mb-2">City</h5>
                        <input
                          name="ThanhPho"
                          onChange={handleChange1}
                          type="text"
                          placeholder={userData.ThanhPho}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <button
                        onClick={handleSubmit}
                        className="col-span-2 px-4 py-2 text-white font-medium flex gap-2 items-center justify-center text-center bg-[#F97316] rounded-lg w-auto ml-auto"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-default-200 p-6 rounded-lg">
                <h4 class="mb-4 text-xl font-medium text-default-900">
                  Change Password
                </h4>
                <div className="mb-4">
                  <h5 className="mb-2">Current Password</h5>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="border border-default-200 py-3 px-4 rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <h5 className="mb-2">New Password</h5>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    className="border border-default-200 py-3 px-4 rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <h5 className="mb-2">Confirm Password</h5>
                  <input
                    type="password"
                    placeholder="Enter your confirm password"
                    className="border border-default-200 py-3 px-4 rounded-lg w-full"
                  />
                </div>
                <button className="px-4 py-2 text-white font-medium flex gap-2 items-center justify-center text-center bg-[#F97316] rounded-lg ml-auto">
                  Save Changes
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
