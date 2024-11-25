import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AdminContext } from "../../Layout/AdminLayoutContext";
import axios from "axios";
import {
  GetAllUser,
  getRoleUserSpecific,
  getUserRole,
  refreshPage,
  upgradeAdmin,
} from "../../../../Route";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Security() {
  const [isClose, setIsClose] = useState(true);
  const { token } = useContext(AdminContext);
  const [inforUser, setInforUser] = useState({
    MaNguoiDung: "",
  });
  const navigate = useNavigate();
  const [listUser, setListUser] = useState([]);
  const [filterUser, setFilterUser] = useState({});
  useEffect(() => {
    const getAllUserList = async () => {
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
      const userNotAdmin = updateData.filter((user) => {
        return user.MaVaiTro !== 1;
      });
      setListUser(userNotAdmin);
    };
    getAllUserList();
  }, [token]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInforUser((prevInfor) => {
      return {
        ...prevInfor,
        [name]: value,
      };
    });
  };
  const handleSearch = () => {
    if (inforUser.MaNguoiDung === "") {
      toast.error("Please enter userId to decentralization");
      setFilterUser({});
    } else {
      const filterResult = listUser.filter((user) => {
        return user.MaNguoiDung === parseInt(inforUser.MaNguoiDung);
      });
      if (filterResult.length === 0) {
        toast.error("Not found user");
        setFilterUser({});
      } else {
        setFilterUser(filterResult[0]);
      }
    }
  };
  const handleDecetralization = async () => {
    toast.promise(
      (async () => {
        const response = await axios.post(
          upgradeAdmin,
          {
            MaNguoiDung: filterUser.MaNguoiDung,
          },
          {
            headers: {
              "Content-Type": "Application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response);
        if (response.status === 201) {
          toast.success("Successfully decentralization");
          navigate("/admin_home");
        }
      })(),
      {
        loading: "Waiting for decentralization...",
        success: "Decentralization successfully",
        error: "Something went wrong",
      }
    );
  };
  return (
    <div>
      <p className="text-xl font-bold">Security</p>
      <br />
      <div>
        <div className="flex items-center">
          <input
            type="text"
            name="MaNguoiDung"
            value={inforUser.MaNguoiDung}
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSearch();
            }}
            className="border border-gray-200 w-full rounded-l-xl rounded-bl-none p-4 bg-gray-200"
            placeholder="Enter user id you want to decentralization"
          />
          <div
            onClick={handleSearch}
            className="bg-red-500 cursor-pointer text-white block p-5 border border-red-200 rounded-r-xl rounded-br-none"
          >
            <FaSearch />
          </div>
        </div>
        <div className="results border border-gray-300 mt-1 h-20 rounded-b-2xl">
          {Object.keys(filterUser).length === 0 ? (
            <p className="p-4 text-md text-gray-400">Enter to see results...</p>
          ) : (
            <div className="p-4 ">
              <div className="flex items-center justify-between">
                <p className="w-full text-center text-gray-500">UserId</p>
                <p className="w-full text-center text-gray-500">Name</p>
                <p className="w-full text-center text-gray-500">Phone</p>
                <p className="w-full text-center text-gray-500">Email</p>
              </div>
              <div className=" text-md w-full justify-between text-gray-600 flex items-center">
                <p className="text-center w-full">{filterUser.MaNguoiDung}</p>
                <p className="text-center w-full">{filterUser.TenNguoiDung}</p>
                <p className="text-center w-full">
                  {filterUser.SoDienThoai !== null
                    ? filterUser.SoDienThoai
                    : "null"}
                </p>
                <p className="text-center w-full">
                  {filterUser.Email !== null ? filterUser.Email : "null"}
                </p>
              </div>
            </div>
          )}
        </div>
        <br />
        {!isClose && (
          <div className="fixed top-1/2 -translate-y-1/2 left-1/2 text-center -translate-x-1/2 w-1/4 h-1/6 bg-white rounded-lg border border-blue-500">
            <p className=" text-md p-2">
              Are you sure you want to{" "}
              <span className="text-red-500 font-bold">Decentralization</span>{" "}
              this <span className="text-blue-500 font-bold">user</span>?
            </p>
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={() => {
                  setIsClose(true);
                  handleDecetralization();
                }}
                className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => setIsClose(true)}
                className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center justify-end">
          <button
            disabled={Object.keys(filterUser).length === 0 ? true : false}
            onClick={() => setIsClose(false)}
            className={` p-3 text-white font-bold rounded-xl  transition-all ease-in duration-150 ${
              Object.keys(filterUser).length === 0
                ? "bg-gray-500 hover:bg-gray-700"
                : "bg-red-500 hover:bg-red-700"
            }`}
          >
            Decentralization
          </button>
        </div>
      </div>
    </div>
  );
}
