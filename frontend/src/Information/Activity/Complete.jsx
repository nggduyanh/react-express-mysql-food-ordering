import { useOutletContext } from "react-router-dom";
import OrderStatus from "./OrderStatus";

export default function Complete() {
  const { order, orderStatus } = useOutletContext();
  const orderComplete = orderStatus?.[3];
  const orderList = order
    ?.filter((items) => {
      return items.TrangThai === parseInt(orderComplete?.MaTrangThai);
    })
    .filter((items) => {
      return items.TrangThaiThanhToan === 1;
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
