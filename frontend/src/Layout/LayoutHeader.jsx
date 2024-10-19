import { Link, Outlet } from "react-router-dom";
import imageFood from "../assets/orderfood1.png";
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { createContext, useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GetRestaurant, localStaticFile } from "../Route";
import { UserAccount } from "../App";
import useFetchData from "../Hook/useFetchData";
const UserContext = createContext();
export default function LayoutHeader() {
  const { userData } = useContext(UserAccount);
  const [place, setPlaces] = useState("");
  const [Restaurants, setRestaurant] = useFetchData(GetRestaurant);
  const getPlaceRestaurant = Restaurants.reduce((accumulate, currentVal) => {
    if (!accumulate.includes(currentVal.ThanhPho)) {
      accumulate.push(currentVal.ThanhPho);
    }
    return accumulate;
  }, []);
  useEffect(() => {
    setPlaces(getPlaceRestaurant[0]);
  }, [Restaurants]);
  const handleChangePlaces = (event) => {
    setPlaces(event.target.value);
  };
  return (
    <UserContext.Provider value={{ userData, place }}>
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
                  className="text-xs  border border-gray-400 py-0.5 rounded-md "
                >
                  {getPlaceRestaurant.map((place) => {
                    return <option value={place}>{place}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="infor flex items-center gap-3 ">
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
                <Link className=" text-red-500 font-bold p-2 rounded-md uppercase">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
      <Outlet />
      <div className="bg-black text-white">
        <footer className="marginJustification  py-24">Hello Footer</footer>
      </div>
    </UserContext.Provider>
  );
}
export { UserContext };
