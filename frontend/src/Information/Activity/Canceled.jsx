import OrderStatus from "./OrderStatus";
import { useOutletContext } from "react-router-dom";
export default function Canceled() {
  const { order, orderStatus } = useOutletContext();
  const orderCanceled = orderStatus?.[4];
  const orderList = order
    ?.filter((items) => {
      return items.TrangThai === parseInt(orderCanceled?.MaTrangThai);
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
