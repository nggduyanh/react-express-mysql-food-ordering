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
  const socketSeller = useSocket(import.meta.env.API_URL || "http://localhost:3000"); // URL máy chủ Socket.IO
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
        const existingOrderIndex = prevList.findIndex(
          (existingOrder) => existingOrder?.MaDonHang === order?.MaDonHang
        );

        if (existingOrderIndex !== -1) {
          // Nếu đơn hàng đã tồn tại, cập nhật thông tin
          const updatedList = [...prevList];
          updatedList[existingOrderIndex] = {
            ...prevList[existingOrderIndex],
            ...order,
          };
          return updatedList;
        } else {
          // Nếu đơn hàng chưa tồn tại, thêm mới vào danh sách
          return [...prevList, order];
        }
      });
    });
    return () => {
      socketSeller.off("message"); // Dọn sạch listener khi unmount
    };
  }, [socketSeller, Seller]);
  console.log("socketSeller", listOrder);
  return <Outlet context={{ listOrder }} />;
}
