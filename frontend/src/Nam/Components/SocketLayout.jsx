import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useSocket from "../../Hook/useSocket";
import { GetUserInfo } from "../../routebackend";
import { GetSellerInfo } from "../../Route";
import useFetchData from "./useFetchData";

export default function SocketLayout() {
  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  let [userData] = useFetchData(GetUserInfo, tokenValue);
  const [listOrder, setListOrder] = useState([]);
  // const userInfo = userData?.data?.[0];
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
  const socketSeller = useSocket("http://localhost:3030"); // URL máy chủ Socket.IO
  useEffect(() => {
    if (!socketSeller) return;
    // Lắng nghe sự kiện từ server
    socketSeller.on("connect", () => {
      console.log("Connected to WebSocket server:", socketSeller.id);
    });
    socketSeller.emit("seller_connect", Seller?.[0]?.MaNguoiBan);
    socketSeller.on("receive_order", (order) => {
      console.log("order_Seller_UserInterfaces", order);
      setListOrder((prevList) => {
        // Kiểm tra xem MaDonHang đã tồn tại trong danh sách chưa
        if (
          !prevList.some(
            (existingOrder) => existingOrder.MaDonHang === order.MaDonHang
          )
        ) {
          return [...prevList, order]; // Thêm order mới vào danh sách
        }
        return prevList; // Giữ nguyên danh sách nếu đã tồn tại
      });
    });
    return () => {
      socketSeller.off("message"); // Dọn sạch listener khi unmount
    };
  }, [socketSeller, Seller]);
  console.log("socketSeller", listOrder);
  return <Outlet context={{ listOrder }} />;
}
