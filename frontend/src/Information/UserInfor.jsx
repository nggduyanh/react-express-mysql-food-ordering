import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import BtnSelection from "./BtnSelection";

export default function UserInfo() {
  const userData = useLocation();
  return (
    <div className="w-11/12 mx-auto flex m-14 gap-6">
      <div className="shadow-xl border border-gray-300 w-1/4 h-screen">
        <BtnSelection
          src={
            userData.state?.AnhNguoiDung === null
              ? "/avatar.png"
              : userData.state?.AnhNguoiDung
          }
          className="btnSelections p-5"
        >
          <p>{userData.state?.TenNguoiDung}</p>
          <p>{userData.state?.Email}</p>
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
