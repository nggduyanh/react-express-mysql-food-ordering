import React from "react";
import { Link } from "react-router-dom";
import SideLink from "./SideBarEle";
export default function SideBar() {
  return (
    <div
      id="sidebar"
      className="flex flex-col transition-all duration-300 w-64 p-4 border-r border-[#F58220]"
    >
      <img src="./images/logo.png" className="relative h-10 w-10 mx-auto" />
      <div className="flex flex-col h-full mt-5 text-sm">
        <Link
          to="/home"
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
        <SideLink
          label="Vouchers"
          list={[
            ["Voucher List", "/voucher"],
          ]}
        />
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
  );
}
