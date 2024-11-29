import { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { AdminContext } from "../Layout/AdminLayoutContext";
import axios from "axios";
import { GetAllUser, GetUserInfo, getUserRole } from "../../../Route";
import TotalInfor from "./TotalInfor";
export default function InforAdminNavigate() {
  const { token } = useContext(AdminContext);
  const [listUser, setListUser] = useState([]);
  const [listSeller, setListSeller] = useState([]);
  const [listShipper, setListShipper] = useState([]);
  const [trueAdmin, setTrueAdmin] = useState({});
  const [listAdmin, setListAdmin] = useState([]);
  useEffect(() => {
    const getListUser = async () => {
      const response = await axios.get(GetAllUser, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      const responseCurrentUser = await axios.get(GetUserInfo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const dataCurrent = responseCurrentUser.data;
      const currentUser = dataCurrent[0];
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
      const filterAdmin = updateData.filter((admin) => {
        return admin.MaVaiTro === 1;
      });
      const filterTrueAdmin = updateData.filter((admin) => {
        return admin.MaVaiTro === 1 && admin.MaNguoiDung === 2;
      });
      if (currentUser?.MaNguoiDung === filterTrueAdmin[0].MaNguoiDung) {
        setTrueAdmin(filterTrueAdmin);
      }
      setListUser(filterUser);
      setListSeller(filterSeller);
      setListShipper(filterShipper);
      setListAdmin(filterAdmin);
    };
    getListUser();
  }, [token]);
  return (
    <div className="flex items-center justify-between">
      <TotalInfor isAdmin={Object.keys(trueAdmin).length > 0 ? true : false}>
        <p className="  text-center font-bold text-gray-500 mb-3">Total User</p>
        <p className="text-center text-3xl  ">{listUser.length}</p>
      </TotalInfor>
      <TotalInfor isAdmin={Object.keys(trueAdmin).length > 0 ? true : false}>
        <p className="  text-center font-bold text-gray-500 mb-3">
          Total Seller
        </p>
        <p className="text-center text-3xl  ">{listSeller.length}</p>
      </TotalInfor>
      <TotalInfor isAdmin={Object.keys(trueAdmin).length > 0 ? true : false}>
        <p className="  text-center font-bold text-gray-500 mb-3">
          Total Shipper
        </p>
        <p className="text-center text-3xl  ">{listShipper.length}</p>
      </TotalInfor>
      <TotalInfor isAdmin={Object.keys(trueAdmin).length > 0 ? true : false}>
        <p className="  text-center font-bold text-gray-500 mb-3">
          Total Profit
        </p>
        <p className="text-center text-3xl  ">200</p>
      </TotalInfor>
      {Object.keys(trueAdmin).length > 0 && (
        <TotalInfor isAdmin={Object.keys(trueAdmin).length > 0 ? true : false}>
          <p className="  text-center font-bold text-gray-500 mb-3">
            Total Admin
          </p>
          <p className="text-center text-3xl  ">{listAdmin.length}</p>
        </TotalInfor>
      )}
    </div>
  );
}
