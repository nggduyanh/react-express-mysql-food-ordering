import { Outlet } from "react-router-dom";
import BtnSelection from "./BtnSelection";
import avatar from "../assets/avatar.png";

export default function UserInfo() {
  return (
    <div className="w-11/12 mx-auto flex m-14 gap-6">
      <div className="shadow-xl border border-gray-300 w-1/4 h-screen">
        <BtnSelection src={avatar} className="btnSelections p-5">
          <p>Nguyen Van A</p>
          <p>nguyenvana@gmail.com</p>
        </BtnSelection>
        <BtnSelection className="btnSelections p-5" des="address">
          <p>Setting Address</p>
        </BtnSelection>
        <BtnSelection className="btnSelections p-5" des="favourite">
          <p>Favourite Restaurant</p>
        </BtnSelection>
        <BtnSelection className="btnSelections p-5" des="payment">
          <p>Payment</p>
        </BtnSelection>
      </div>
      <div className="shadow-xl border border-gray-300 w-3/4 h-screen">
        <Outlet />
      </div>
    </div>
  );
}
