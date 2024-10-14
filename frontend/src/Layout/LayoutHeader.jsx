import { Link, Outlet, useLocation } from "react-router-dom";
import imageFood from "../assets/orderfood1.png";
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
export default function LayoutHeader() {
  const OneDaysMilliseconds = 86400000;
  const [userData, setUserData] = useState([]);
  const UserGetlocation = useLocation();
  const getUserInfo = UserGetlocation.state;
  useEffect(() => {
    const setSessionsStorageExpires = async (key, timeExpire) => {
      const now = new Date();
      const expireDate = {
        value: getUserInfo,
        expire: now.setMilliseconds(now.getMilliseconds() + timeExpire),
      };
      sessionStorage.setItem(key, JSON.stringify(expireDate));
    };
    const checkSessionStorage = async (key, timeExpire) => {
      setSessionsStorageExpires(key, timeExpire);
      const getJsonData = sessionStorage.getItem(key);
      const data = JSON.parse(getJsonData);
      const now = new Date();
      if (now.getMilliseconds() > data.expire) {
        sessionStorage.removeItem(key);
        return null;
      }
      setUserData(data.value);
    };
    checkSessionStorage("user", OneDaysMilliseconds);
  }, []);
  return (
    <>
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
                  name=""
                  id="location"
                  className="text-xs px-6 border border-gray-400"
                >
                  <option className="text-xs" value="">
                    Ha Noi
                  </option>
                  <option className="text-xs" value="">
                    TPHCM
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="infor flex items-center gap-3">
            <Link
              to="all"
              className="flex items-center gap-2 border border-gray-300 p-2 rounded-md hover:border-pink-400 transition-all ease-in duration-300"
            >
              <FaSearch />
              <p>Search</p>
            </Link>

            <div className="user flex items-center gap-5">
              <div className="avatar">
                <Link
                  to="information"
                  className="flex items-center"
                  state={userData}
                >
                  <img
                    src={
                      userData?.AnhNguoiDung !== null
                        ? userData?.AnhNguoiDung
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
            </div>
          </div>
        </header>
      </div>
      <Outlet context={userData} />
      <div className="bg-black text-white">
        <footer className="marginJustification  py-24">Hello Footer</footer>
      </div>
    </>
  );
}
