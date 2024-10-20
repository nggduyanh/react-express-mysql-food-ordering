import { Outlet } from "react-router-dom";
import BtnSelection from "./BtnSelection";
import { UserContext } from "../Layout/LayoutHeader";
import { useContext } from "react";
import { localStaticFile } from "../Route";
export default function UserInfo() {
  const { userData } = useContext(UserContext);
  return (
    <div className="w-11/12 mx-auto flex m-14 gap-6">
      <div className="shadow-xl border border-gray-300 w-1/4 h-screen">
        <BtnSelection
          src={
            userData?.AnhNguoiDung === null
              ? "/avatar.png"
              : localStaticFile + userData?.AnhNguoiDung
          }
          className="btnSelections p-5"
        >
          <p>{userData?.TenNguoiDung}</p>
          <p>{userData?.Email}</p>
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
        <Outlet context={userData} />
      </div>
    </div>
  );
}
