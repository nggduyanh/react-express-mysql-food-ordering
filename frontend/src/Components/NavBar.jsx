import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUserInfo } from "../routebackend";
import { UserAccount } from "../App";

export default function NavBar() {
  const { userData } = useContext(UserAccount);
  const [User, setUser] = useState([]);
  useEffect(() => {
    fetch(GetUserInfo)
      .then((response) => response.json())
      .then((data) => {
        const findUser = data.find(
          (item) => item.MaNguoiDung === userData.MaNguoiBan
        );
        setUser(findUser);
      });
  }, [userData]);

  return (
    <nav className="flex h-16 px-6 items-center border-b border-[#F58220]  text-sm">
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
      {/* <div className="bg-white h-10 w-10 rounded-full  overflow-hidden">
              {userData?.AnhNguoiDung !== null ? (
                <img
                  src={localStaticFile + User.AnhNguoiDung}
                  className="object-cover w-full h-full"
                />
              ) : (
                <img
                  src="./images/avatar.png"
                  className="object-cover w-full h-full"
                />
              )}
            </div> */}
      <h3 className="font-medium ml-2">{userData.TenNguoiBan}</h3>
    </nav>
  );
}
