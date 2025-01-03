import { GrUserAdmin } from "react-icons/gr";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AdminLayoutContext from "./AdminLayoutContext";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { getRoleUserSpecific, GetUserInfo } from "../../../Route";
export default function SideNav() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token-admin");
    navigate("/admin_login");
    toast.success("Logged out");
  };
  const [admin, setAdmin] = useState({});
  const token = JSON.parse(localStorage.getItem("token-admin"));
  const tokenAdmin = token.token;
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(GetUserInfo, {
        headers: {
          Authorization: "Bearer " + tokenAdmin,
        },
      });
      const data = response.data;
      const checkIsAdminResponse = await axios.get(
        getRoleUserSpecific + `${data[0].MaNguoiDung}`,
        {
          headers: {
            Authorization: "Bearer " + tokenAdmin,
          },
        }
      );
      const adminAccount = {
        ...data[0],
        MaVaiTro: checkIsAdminResponse.data[0].MaVaiTro,
      };

      setAdmin(adminAccount);
    };
    getUser();
  }, [tokenAdmin]);
  return (
    <AdminLayoutContext>
      <div className="flex items-center">
        <div className="mr-64">
          <div className="fixed top-0 left-0 bg-gray-700 w-60 h-full text-white flex flex-col p-3">
            <div className="flex items-center justify-center my-2 text-3xl font-bold gap-2">
              <GrUserAdmin />
              <p>Admin</p>
            </div>
            <div className="flex flex-col items-center flex-grow mt-16">
              <div className="flex flex-col items-center gap-10 text-md text-center font-bold">
                <NavLink
                  className={({ isActive }) =>
                    `px-4 py-2 font-bold rounded-xl ${
                      isActive ? "bg-white w-full text-black" : ""
                    }`
                  }
                  to="/admin_home"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `px-4 py-2 font-bold rounded-xl ${
                      isActive ? "bg-white w-full text-black" : ""
                    }`
                  }
                  to="/restaurant_type"
                >
                  Restaurant Type
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `px-4 py-2 font-bold rounded-xl ${
                      isActive ? "bg-white w-full text-black" : ""
                    }`
                  }
                  to="/user_manage"
                >
                  User Management
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `px-4 py-2 font-bold rounded-xl ${
                      isActive ? "bg-white w-full text-black" : ""
                    }`
                  }
                  to="/admin_content"
                >
                  Content and feedback
                </NavLink>
                {admin?.MaNguoiDung === 2 && (
                  <NavLink
                    className={({ isActive }) =>
                      `px-4 py-2 font-bold rounded-xl ${
                        isActive ? "bg-white w-full text-black" : ""
                      }`
                    }
                    to="/security"
                  >
                    System and Security Management
                  </NavLink>
                )}
              </div>
            </div>
            <div className="mt-auto mb-4 text-center">
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-blue-500 w-full  hover:bg-blue-700 transition-all duration-200 ease-in rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </AdminLayoutContext>
  );
}
