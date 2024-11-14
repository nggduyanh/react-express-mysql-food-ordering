import { useOutletContext } from "react-router-dom";
import OrderStatus from "./OrderStatus";
import { useEffect } from "react";

export default function OnGoing() {
  const { order, orderStatus } = useOutletContext();
  const orderReceive = orderStatus?.[0];
  const orderPrepare = orderStatus?.[1];
  const orderAlreadyGoing = orderStatus?.[2];
  const orderList = order
    ?.filter((items) => {
      return (
        items.TrangThai === parseInt(orderReceive?.MaTrangThai) ||
        items.TrangThai === parseInt(orderPrepare?.MaTrangThai) ||
        items.TrangThai === parseInt(orderAlreadyGoing?.MaTrangThai) ||
        items.TrangThaiThanhToan === 1
      );
    })
    .map((items) => {
      return <OrderStatus {...items} key={items.MaDonHang} />;
    });
  return (
    <div className="overflow-auto max-h-[720px]">
      {orderList?.length > 0 ? (
        orderList
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-3xl text-gray-500 ">No such history</p>
          <img src="/empty_box.png" alt="" className="w-80 h-80" />
        </div>
      )}
    </div>
  );
}
