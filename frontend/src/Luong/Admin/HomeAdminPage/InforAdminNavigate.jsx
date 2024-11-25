import { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { AdminContext } from "../Layout/AdminLayoutContext";
import axios from "axios";
import { GetAllUser, getUserRole } from "../../../Route";
export default function InforAdminNavigate() {
  const { token } = useContext(AdminContext);
  const [listUser, setListUser] = useState([]);
  const [listSeller, setListSeller] = useState([]);
  const [listShipper, setListShipper] = useState([]);
  useEffect(() => {
    const getListUser = async () => {
      const response = await axios.get(GetAllUser, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      const updateData = await Promise.all(
        data.map(async (user) => {
          const roleResponse = await axios.get(
            getUserRole + `${user.MaNguoiDung}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          return {
            ...user,
            MaVaiTro: roleResponse.data[0].MaVaiTro,
          };
        })
      );
      const filterUser = updateData.filter((user) => {
        return user.MaVaiTro === 2;
      });
      const filterSeller = updateData.filter((seller) => {
        return seller.MaVaiTro === 3;
      });
      const filterShipper = updateData.filter((shipper) => {
        return shipper.MaVaiTro === 4;
      });
      setListUser(filterUser);
      setListSeller(filterSeller);
      setListShipper(filterShipper);
    };
    getListUser();
  }, [token]);
  return (
    <div className="flex items-center justify-between">
      <div className="p-4 border border-blue-500 w-72 h-44 rounded-xl flex flex-col justify-between">
        <div className="amount_user flex justify-between items-center   ">
          <div>
            <p className="  text-center font-bold text-gray-500 mb-3">
              Total User
            </p>
            <p className="text-center text-3xl  ">{listUser.length}</p>
          </div>
          <div className="border border-blue-500 text-white font-bold bg-blue-500 p-3 rounded-full">
            <FaUserAlt className="text-3xl " />
          </div>
        </div>
        <div className="flex items-center">
          <FaArrowUp className="text-green-500" />
          <p className="">
            {" "}
            <span className="text-green-500 font-bold">12%</span> since last
            month
          </p>
        </div>
      </div>
      <div className="p-4 border border-blue-500 w-72 h-44 rounded-xl flex flex-col justify-between">
        <div className="amount_user flex justify-between items-center   ">
          <div>
            <p className="  text-center font-bold text-gray-500 mb-3">
              Total Seller
            </p>
            <p className="text-center text-3xl  ">{listSeller.length}</p>
          </div>
          <div className="border border-blue-500 text-white font-bold bg-blue-500 p-3 rounded-full">
            <FaUserTie className="text-3xl " />
          </div>
        </div>
        <div className="flex items-center">
          <FaArrowDown className="text-red-500" />
          <p className="">
            {" "}
            <span className="text-red-500 font-bold">12%</span> since last month
          </p>
        </div>
      </div>
      <div className="p-4 border border-blue-500 w-72 h-44 rounded-xl flex flex-col justify-between">
        <div className="amount_user flex justify-between items-center   ">
          <div>
            <p className="  text-center font-bold text-gray-500 mb-3">
              Total shipper
            </p>
            <p className="text-center text-3xl  ">{listShipper.length}</p>
          </div>
          <div className="border border-blue-500 text-white font-bold bg-blue-500 p-3 rounded-full">
            <FaUsers className="text-3xl " />
          </div>
        </div>
        <p className="">
          {" "}
          <span className="text-green-500 font-bold">12%</span> since last month
        </p>
      </div>
      <div className="p-4 border border-blue-500 w-72 h-44 rounded-xl flex flex-col justify-between">
        <div className="amount_user flex justify-between items-center   ">
          <div>
            <p className="  text-center font-bold text-gray-500 mb-3">
              Total Profit
            </p>
            <p className="text-center text-3xl  ">200</p>
          </div>
          <div className="border border-blue-500 text-white font-bold bg-blue-500 p-3 rounded-full">
            <FaUserAlt className="text-3xl " />
          </div>
        </div>
        <p className="">
          {" "}
          <span className="text-green-500 font-bold">12%</span> since last month
        </p>
      </div>
    </div>
  );
}
