import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SideLink from "./SideBarEle";
export default function SideBar() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/loginSeller");
  };
  return (
    <div
      id="sidebar"
      className="flex h-screen sticky top-0 flex-col transition-all duration-300 w-64 p-4  border-r border-[#F58220]"
    >
      <img src="../../images/logo.png" className="relative h-10 w-10 mx-auto" />
      <div className="flex flex-col flex-grow h-full mt-5 text-sm">
        <Link
          to="/home/seller"
          className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg"
        >
          Dashboard
        </Link>

        <SideLink label="Orders" list={[["Orders list", "/orders_list"]]} />
        <SideLink
          label="Dishes"
          list={[
            ["Dish List", "/dish"],
            ["Add Dish", "/add_dish"],
          ]}
        />
        <SideLink label="Vouchers" list={[["Voucher List", "/voucher"]]} />
        <Link
          to="/foodtype"
          className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg"
        >
          FoodType
        </Link>
        <Link
          to="/sellerType"
          className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg"
        >
          Seller Type
        </Link>
        <Link
          to="/profile"
          className="py-3 px-4 mt-auto hover:bg-gray-200 hover:rounded-lg"
        >
          Profile
        </Link>
        <button
          onClick={handleLogOut}
          className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
