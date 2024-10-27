import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetFoodRestaurant, GetSellerInfo, GetUserInfo, GetUserRole } from "../routebackend";
import { UserAccount } from "../App";
import SideBar from "../Components/SideBar";

export default function Profile() {
  const { userData } = useContext(UserAccount);
  const navigate = useNavigate();
  const [User, setUser] = useState([]);
  const [restaurantProfile, setRestaurantProfile] = useState([]);
  const AddressParts = userData.DiaChi.split(",");
  const Address = AddressParts[0];
  const State = AddressParts[1];
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

//   useEffect(() => {
//     fetch(GetFoodRestaurant)
//       .then((response) => response.json())
//       .then((data) => {
//         const filterDish = data.filter((dish) => {
//           return dish.MaNguoiBan === userData.MaNguoiBan;
//         });
//         // console.log("filterDish", filterDish);
//         setListDish(filterDish);
//       });
//   }, [userData]);

  const [sellerInfo, setSellerInfo] = useState({
    id: "",
    thanhPho: "",
    moCua: "",
    dongCua: "",
    diaChi: "",
    cccd: "",
    giayPhep: "",
    diem: "",
    luotDanhGia: "",
    anh: "",
  });
  const handleChange = (event) => {};
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sellerInfo);
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
                  <div className="flex justify-center">
                    <div className="bg-[#FFF0E9] border border-[#F97316] border-2 border-dashed rounded-full h-48 w-48 flex items-center justify-center">
                      <p>Add photo</p>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="mb-4">
                        <h5 className="mb-2">Restaurant Name</h5>
                        <input
                          type="text"
                          placeholder={userData.TenNguoiBan}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Address</h5>
                        <input
                          type="text"
                          placeholder={Address}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>

                      <div>
                        <h5 className="mb-2">State/Province</h5>
                        <input
                          type="text"
                          placeholder={State}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">City</h5>
                        <input
                          type="text"
                          placeholder={userData.ThanhPho}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Email</h5>
                        <input
                          type="text"
                          placeholder="Cần thêm"
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Phone Number</h5>
                        <input
                          type="text"
                          placeholder="Cần thêm"
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>

                      <button className="col-span-2 px-4 py-2 text-white font-medium flex gap-2 items-center justify-center text-center bg-[#F97316] rounded-lg w-auto ml-auto">
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
