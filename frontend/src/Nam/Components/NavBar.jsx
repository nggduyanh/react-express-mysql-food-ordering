import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { GetUserInfo, localStaticFile } from "../../routebackend";
// import { UserAccount } from "../App";
import useFetchData from "./useFetchData";
import { useOutletContext } from "react-router-dom";
import { PiExclamationMarkFill } from "react-icons/pi";
import { GetSellerInfo } from "../../Route";
export default function NavBar() {
  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  let [userData] = useFetchData(GetUserInfo, tokenValue);
  const { listOrder } = useOutletContext();
  const userInfo = userData?.data?.[0];
  const [Seller, getSeller] = useState([]);
  useEffect(() => {
    fetch(GetSellerInfo, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        getSeller(data);
      });
  }, [userData, tokenValue]);
  const [isNotification, setIsNotification] = useState(false);
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    if (listOrder?.length === 0) {
      setIsNotification(false);
    } else {
      setIsNotification(true);
    }
  }, [listOrder]);
  return (
    <nav className="flex h-16 px-6 items-center border-b border-[#F58220]  text-sm">
      <div className="ml-auto bg-gray-200 p-2 rounded-full mr-4 relative">
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="24"
          width="24"
          className="cursor-pointer"
          onClick={() => setIsShown((prevShown) => !prevShown)}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
        {isNotification && (
          <PiExclamationMarkFill className="absolute -top-3 -right-2 text-red-500 font-bold  text-2xl" />
        )}
        {isShown && (
          <div className="absolute bg-white border border-orange-500 rounded-lg w-60 h-40 -left-52 top-11 overflow-auto max-h-[200px] p-2">
            {isNotification === true ? (
              listOrder?.filter((item) => {
                return item?.MaDonHang !== undefined;
              })?.map((items) => {
                return (
                  <div
                    key={items.MaDonHang}
                    className="flex items-center justify-between mb-2 px-2 py-3 bg-orange-500 text-white font-bold rounded-lg"
                  >
                    <p>OrderId: {items?.MaDonHang || "waiting to payment"}</p>
                    <p>Amount: {items?.SoLuong || "?"}</p>
                  </div>
                );
              })
            ) : (
              <p>No order found</p>
            )}
          </div>
        )}
      </div>
      <div className="bg-white h-10 w-10 rounded-full  overflow-hidden">
        {userInfo?.AnhNguoiDung && userInfo?.AnhNguoiDung !== null ? (
          <img
            src={localStaticFile + userInfo?.AnhNguoiDung}
            className="object-cover w-full h-full"
          />
        ) : (
          <img
            src="../../../images/avatar.png"
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <h3 className="font-medium ml-2">{Seller?.[0]?.TenNguoiBan}</h3>
    </nav>
  );
}
