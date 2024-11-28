import { FaSearch } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../Layout/AdminLayoutContext";
import { GetAllUser, getUserRole } from "../../../../Route";
import { getRoleUserSpecific, GetUserInfo } from "../../../../Route";
export default function UserHome() {
  const { token } = useContext(AdminContext);
  const [listUser, setListUser] = useState([]);
  const [listSeller, setListSeller] = useState([]);
  const [listShipper, setListShipper] = useState([]);
  const [listAdmin, setListAdmin] = useState([]);
  const [admin, setAdmin] = useState({});
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
      const responseAdmin = await axios.get(GetUserInfo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const dataAdmin = responseAdmin.data;
      const checkIsAdminResponse = await axios.get(
        getRoleUserSpecific + `${dataAdmin[0].MaNguoiDung}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const adminAccount = {
        ...dataAdmin[0],
        MaVaiTro: checkIsAdminResponse.data[0].MaVaiTro,
      };
      setAdmin(adminAccount);
      const filterUser = updateData.filter((user) => {
        return user.MaVaiTro === 2;
      });
      const filterSeller = updateData.filter((seller) => {
        return seller.MaVaiTro === 3;
      });
      const filterShipper = updateData.filter((shipper) => {
        return shipper.MaVaiTro === 4;
      });
      const filterAdmin = updateData.filter((admin) => {
        return admin.MaVaiTro === 1;
      });
      setListAdmin(filterAdmin);
      setListUser(filterUser);
      setListSeller(filterSeller);
      setListShipper(filterShipper);
    };
    getListUser();
  }, [token]);
  return (
    <div>
      <p className="text-2xl font-bold ">User list</p>
      <br />
      <div>
        <div className="search w-full flex items-center border relative gap-3 border-gray-400 rounded-2xl p-4 shadow-lg">
          <div className="w-2/3">
            <input
              type="text"
              placeholder="Search user"
              className="border border-gray-500 pl-8 p-4 w-full rounded-2xl "
            />
            <div className="absolute top-1/2 -translate-y-1/2 mx-2">
              <FaSearch className="text-gray-500" />
            </div>
          </div>
          <div className="filter flex items-center gap-3 ">
            <NavLink
              to="."
              end
              className={({ isActive }) =>
                `border border-blue-500 rounded-lg p-3 ${
                  isActive ? "bg-blue-500 text-white font-bold" : ""
                }`
              }
            >
              Customer
            </NavLink>
            <NavLink
              to="seller_manage"
              className={({ isActive }) =>
                `border border-blue-500 rounded-lg p-3 ${
                  isActive ? "bg-blue-500 text-white font-bold" : ""
                }`
              }
            >
              Seller
            </NavLink>
            <NavLink
              to="shipper_manage"
              className={({ isActive }) =>
                `border border-blue-500 rounded-lg p-3 ${
                  isActive ? "bg-blue-500 text-white font-bold" : ""
                }`
              }
            >
              Shipper
            </NavLink>
            {admin.MaNguoiDung === 2 && (
              <NavLink
                to="admin_manage"
                className={({ isActive }) =>
                  `border border-blue-500 rounded-lg p-3 ${
                    isActive ? "bg-blue-500 text-white font-bold" : ""
                  }`
                }
              >
                Admin
              </NavLink>
            )}
          </div>
        </div>
        <br />
        <div className="list_user border border-gray-300 bg-gray-200 w-full rounded-t-2xl p-4 ">
          <div className="grid grid-cols-4 font-bold text-gray-700 gap-4 px-4">
            <p>UserId</p>
            <p>Name</p>
            <p>Email</p>
            <p>Phone Number</p>
          </div>
        </div>
        <div className="rounded-b-2xl border border-gray-300 p-4">
          <Outlet context={{ listUser, listSeller, listShipper, listAdmin }} />
        </div>
      </div>
    </div>
  );
}
