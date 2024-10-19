import { useOutletContext } from "react-router-dom";
import OrderStatus from "./OrderStatus";

export default function Complete() {
  const { order } = useOutletContext();
  return (
    <div className="overflow-auto max-h-[750px]">
      {order.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-3xl text-gray-500 ">No such history</p>
          <img src="/empty_box.png" alt="" className="w-80 h-80" />
        </div>
      ) : (
        order.map((items) => <OrderStatus key={items} />)
      )}
    </div>
  );
}
