import { TiTick } from "react-icons/ti";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import useFetchData from "../../Hook/useFetchData";
import { Order, OrderStatus } from "../../Route";
export default function OrderHistory() {
  const { userData, tokenValue } = useOutletContext();
  const [Listorder, errorOrder] = useFetchData(Order, tokenValue);
  const [orderStatus, errorStatus] = useFetchData(OrderStatus, tokenValue);
  const order = Listorder?.data?.filter((items) => {
    return items.MaNguoiMua === userData?.MaNguoiDung;
  });
  console.log("order status: ", order);
  return (
    <div className="bg_homeScreen">
      <div className="orderHistory marginJustification min-h-screen ">
        <br />
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
