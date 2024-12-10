import { FaCalendarAlt } from "react-icons/fa";
import { MdDone } from "react-icons/md";
export default function OrderStatusDetails() {
  return (
    <div className="bg-white  p-4">
      <div className="date flex items-center gap-2 mb-3">
        <FaCalendarAlt className="text-red-500 text-xl" />
        <p>16 June, 11:30AM</p>
      </div>
      <hr className="h-0.5 bg-gray-200" />
      <div className="Status my-3">
        <p className="text-xl">Order status</p>
        <p className="text-xs my-2 flex items-center gap-2">
          <MdDone className="text-green-500" />
          Preparing order
        </p>
        <p className="text-xs my-2 flex items-center gap-2">
          <MdDone className="text-green-500" /> Ready to collect
        </p>
        <p className="text-xs my-2 flex items-center gap-2">
          <MdDone className="text-green-500" /> On the way
        </p>
        <p className="text-xs my-2 flex items-center gap-2">
          <MdDone className="text-green-500" /> Delivered Order
        </p>
      </div>
      <hr className="h-0.5 bg-gray-200" />
      <div className="destination my-3">
        <p className="text-xl mb-2">Destination </p>
        <p className="text-xs">554 West 142nd Street, New York, NY 10031</p>
      </div>
      <hr className="h-0.5 bg-gray-200" />
      <div className="my-3 delivery">
        <p className="text-xl">Fast Delivery</p>
        <p className="text-xs mt-2">ChuyenNhanh24h</p>
      </div>
      <hr className="h-0.5 bg-gray-200" />
      <div className="total my-3 flex justify-between">
        <div className="">
          <p className="text-xl">Total cost</p>
          <p className="text-xs">You can check your order detail here,</p>
          <p className="text-xs">Thank you for order.</p>
        </div>
        <div className="money">
          <p className="font-bold text-lg">$8.52</p>
        </div>
      </div>
    </div>
  );
}
