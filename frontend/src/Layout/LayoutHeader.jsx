import { Link, Outlet, useNavigate } from "react-router-dom";
import imageFood from "../assets/orderfood1.png";
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { createContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GetRestaurant, localStaticFile } from "../Route/index.js";
import toast from "react-hot-toast";
import useFetchData from "../Hook/useFetchData.jsx";
import { GetUserInfo } from "../Route/index.js";
import LayoutFooter from "./LayoutFooter.jsx";
import { MdOutlineFoodBank } from "react-icons/md";
import axios from "axios";
import useSocket from "../Hook/useSocket.jsx";
const UserContext = createContext();
export default function LayoutHeader() {
  const socket = useSocket("http://localhost:3030"); // URL máy chủ Socket.IO

  useEffect(() => {
    if (!socket) return;
    // Lắng nghe sự kiện từ server
    socket.on("connect", () => {
      console.log("Connected to WebSocket server:", socket.id);
    });
    return () => {
      socket.off("message"); // Dọn sạch listener khi unmount
    };
  }, [socket]);
  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [Restaurants, errorRestaurant] = useFetchData(
    GetRestaurant,
    tokenValue
  );
  let userResponse = useFetchData(GetUserInfo, tokenValue);
  let userData = userResponse[0]?.data?.[0];
  const [place, setPlaces] = useState("");
  const getPlaceRestaurant = Restaurants?.data?.reduce(
    (accumulate, currentVal) => {
      if (!accumulate.includes(currentVal.ThanhPho)) {
        accumulate.push(currentVal.ThanhPho);
      }
      return accumulate;
    },
    []
  );
  useEffect(() => {
    const getSellerInfor = async () => {
      const resposne = await axios.get(
        "http://localhost:3030/nguoiban/current",
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      console.log(resposne);
      if (resposne.status === 403) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    };
    getSellerInfor();
  }, [tokenValue]);
  useEffect(() => {
    setPlaces(getPlaceRestaurant?.[0]);
  }, [Restaurants, tokenValue]);
  const handleChangePlaces = (event) => {
    setPlaces(event.target.value);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out!");
  };
  return (
    <UserContext.Provider value={{ userData, place, tokenValue }}>
      <div className="bg-white shadow-lg">
        <header className="flex justify-between py-3 items-center marginJustification">
          <div className="logo flex items-center">
            <div className="">
              <Link to=".">
                <img
                  src={imageFood}
                  alt="Designed by Starline / Freepik"
                  className="w-20 h-w-20 mr-5"
                />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <IoLocationOutline className="text-2xl" />
              <div>
                <label htmlFor="location" className="text-gray-500 text-xs">
                  Select location
                </label>
                <br />
                <select
                  name="place"
                  id="location"
                  onChange={handleChangePlaces}
                  className="text-xs place border border-pink-500 py-1 bg-pink-500 text-white font-bold px-4 rounded-md "
                >
                  {getPlaceRestaurant?.map((place) => {
                    return (
                      <option
                        className="bg-white text-black"
                        key={place}
                        value={place}
                      >
                        {place}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="infor flex items-center gap-3 ">
            {!isActive && (
              <div className="merchant">
                <Link
                  to="/register_restaurant/create_restaurant"
                  className="flex items-center gap-2 text-white font-bold p-2 border bg-pink-500 rounded-md hover:bg-white hover:text-black hover:border-pink-500 transition-all ease-in duration-300"
                >
                  <MdOutlineFoodBank className="text-xl font-bold" /> Want to
                  become merchant ?
                </Link>
              </div>
            )}
            <Link
              to="all"
              className="flex items-center gap-2 border border-gray-300 p-2 rounded-md transition-all ease-in duration-300 text-white font-bold bg-pink-500 hover:bg-white hover:text-black hover:border-pink-500"
            >
              <FaSearch />
              <p className="">Search</p>
            </Link>

            <div className="user flex items-center gap-5">
              <div className="avatar">
                <Link to="information" className="flex items-center">
                  <img
                    src={
                      userData?.AnhNguoiDung !== null
                        ? localStaticFile + userData?.AnhNguoiDung
                        : "/avatar.png"
                    }
                    alt=""
                    className="w-8 h-8 mx-2"
                  />
                  <p className="text-gray-500 text-xs">
                    {" "}
                    {userData?.TenNguoiDung}
                  </p>
                </Link>
              </div>

              <div className="activity">
                <Link
                  to="activity"
                  className="flex items-center text-md text-gray-400 gap-2"
                >
                  <MdAccessTimeFilled className="text-green-500" />
                  <p className="text-green-500">Activity</p>
                </Link>
              </div>
              <div className="logout">
                <button
                  onClick={handleLogOut}
                  className=" text-red-500 font-bold p-2 rounded-md uppercase"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
      <Outlet context={{ tokenValue, userData }} />
      <LayoutFooter />
    </UserContext.Provider>
  );
}
export { UserContext };
