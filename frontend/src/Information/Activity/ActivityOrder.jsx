import { TiTick } from "react-icons/ti";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import useFetchData from "../../Hook/useFetchData";
import { Order, OrderStatus, refreshPage, updateOrder } from "../../Route";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function OrderHistory() {
  const { userData, tokenValue } = useOutletContext();
  const [Listorder, errorOrder] = useFetchData(Order, tokenValue);
  const [orderStatus, errorStatus] = useFetchData(OrderStatus, tokenValue);
  const order = Listorder?.data?.filter((items) => {
    return items.MaNguoiMua === userData?.MaNguoiDung;
  });
  const [cancel, setCancel] = useState(false);
  const [getInforOrder, setGetInforOrder] = useState({});
  const CancelStatusOrder = async () => {
    console.log(getInforOrder);
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.patch(
          updateOrder,
          {
            MaDonHang: getInforOrder.MaDonHang,
            TrangThai: 5,
          },
          {
            headers: {
              Authorization: "Bearer " + tokenValue,
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          refreshPage();
        }
      })(),
      {
        loading: "Cancel order...",
        success: "Success",
        error: "Cant cancel order",
      }
    );
  };
  const [isClose, setIsClose] = useState(true);
  return (
    <div className="bg_homeScreen">
      <div className="orderHistory marginJustification min-h-screen ">
        <br />
        {!isClose && (
          <div className="fixed left-1/2 bg-white border border-pink-500 rounded-lg w-1/4 h-1/6 top-1/2 -translate-y-1/2 text-center -translate-x-1/2">
            <p className="font-bold mt-3">
              Are you sure you want to cancel the order?
            </p>
            <div className="mt-6 flex items-center gap-5 justify-center">
              <button
                onClick={() => {
                  CancelStatusOrder();
                  setIsClose(true);
                }}
                className="bg-red-500 px-4 py-1 rounded-md font-bold text-white"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setCancel(false);
                  setIsClose(true);
                }}
                className="bg-blue-500 px-4 py-1 rounded-md font-bold text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 gap-2 h-screen">
          <div className="Status col-span-1 border border-gray-300 rounded-md p-2 bg-white h-52">
            <NavLink
              to="."
              end
              className={({ isActive }) =>
                `flex items-center gap-2 cursor-pointer mb-2 ${
                  isActive && "bg-gray-300"
                }`
              }
            >
              <div className="border p-4 border-gray-300 rounded-full">
                <TiTick className={`text-xl text-green-500`} />
              </div>
              <p className="w-full">Completed</p>
            </NavLink>
            <NavLink
              to="ongoing"
              className={({ isActive }) =>
                `flex items-center gap-2 cursor-pointer mb-2 ${
                  isActive && "bg-gray-300"
                }`
              }
            >
              <div className="border p-4 text-xl border-gray-300 rounded-full">
                <MdOutlineAccessTimeFilled className="text-yellow-500" />
              </div>
              <p>On Progress</p>
            </NavLink>
            <NavLink
              to="canceled"
              className={({ isActive }) =>
                `flex items-center gap-2 cursor-pointer mb-2 ${
                  isActive && "bg-gray-300"
                }`
              }
            >
              <div className="border p-4 text-xl border-gray-300 rounded-full">
                <MdCancel className="text-red-500" />
              </div>
              <p>Canceled</p>
            </NavLink>
          </div>
          <div className="Order status rounded-md col-span-2 flex-grow ">
            <Outlet
              context={{
                order,
                orderStatus: orderStatus?.data,
                userData,
                tokenValue,
                setIsCloseFunct: (value, infor) => {
                  setIsClose(value);
                  // console.log("infor", infor);
                  setGetInforOrder(infor);
                },
                isCancel: cancel,
              }}
            />
          </div>
        </div>
        {/* <div className="listOrderHistory">
        {hasOrder ? (
          <div>
            <OrderDetails />
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen text-5xl text-gray-400">
            <p>No History found</p>
          </div>
        )}
      </div> */}
      </div>
    </div>
  );
}
