import { Link, Outlet } from "react-router-dom";
import imageFood from "../assets/orderfood1.png";
import avatar from "../assets/avatar.png";
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
export default function LayoutHeader() {
  const userActive = true;
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

          <div className="infor flex items-center">
            <input
              type="text"
              placeholder="Search"
              className=" mx-5 border border-gray-300 rounded-xl p-2 min-w-72 transition-all hover:border-black hover:duration-200 ease-in"
            />
            {userActive === false ? (
              <div>
                <Link
                  to="register"
                  className=" btnInputReLog bg-gradient-to-r from-cyan-500 to-blue-400 mx-1"
                >
                  Register
                </Link>
                <Link
                  to="login"
                  className=" btnInputReLog bg-gradient-to-r from-pink-500 to-pink-600  "
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="user flex items-center gap-5">
                <div className="avatar">
                  <Link to="information" className="flex items-center">
                    <img src={avatar} alt="" className="w-8 h-8 mx-2" />
                    <p className="text-gray-500 text-xs"> Nguyen Van A</p>
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
            )}
          </div>
        </header>
      </div>
      <Outlet />
      <div className="bg-black text-white">
        <footer className="marginJustification  py-24">Hello Footer</footer>
      </div>
    </>
  );
}
