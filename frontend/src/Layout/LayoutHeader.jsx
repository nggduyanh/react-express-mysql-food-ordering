import { Link, Outlet } from "react-router-dom";
import imageFood from "../assets/orderfood1.png";
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { createContext, useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GetRestaurant, localStaticFile } from "../Route";
import { UserAccount } from "../App";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
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
                    return (
                      <option key={place} value={place}>
                        {place}
                      </option>
                    );
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
        <footer className="marginJustification py-24">
          <div className="flex justify-between items-center  ">
            <div className="flex items-center w-2/5">
              <img src={imageFood} alt="" className="w-20 h-w-20" />
              <div>
                <p className=" text-sm font-bold">About us</p>
                <div className="">
                  <p className="text-md">
                    Some short text about company like You might remember the
                    Dell computer commercials in which a youth reports.
                  </p>
                  <br />
                  <div className="flex items-center gap-4">
                    <FaFacebook />
                    <FaInstagram />
                    <FaTwitter />
                    <FaYoutube />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold ">Error Page</p>
              <p>Not found</p>
              <p>Maintence</p>
              <p>Coming Soon</p>
            </div>
            <div>
              <p className="text-sm font-bold ">Service</p>
              <p>Delivery Support</p>
              <p>Contact Us</p>
              <p>Terms of use</p>
              <p>Privacy policy</p>
            </div>
            <div>
              <p className="text-sm font-bold ">For Users</p>
              <p>User Login</p>
              <p>User register</p>
              <p>Forgot Password</p>
              <p>Account Setting</p>
            </div>
            <div>
              <p className="text-sm font-bold ">More pages</p>
              <p>Trending</p>
              <p>Most popular</p>
              <p>Restaurant Details</p>
              <p>Favorites</p>
            </div>
          </div>
          <br />
          <div className="mx-6">
            <p className="text-2xl mb-4">Countries</p>
            <div className="grid grid-cols-6 gap-3">
              <div className="text-gray-400 ">
                <p>India</p>
                <p>Indonesia</p>
                <p>Ireland</p>
                <p>Italy</p>
                <p>Lebnanon</p>
              </div>
              <div className="text-gray-400 ">
                <p>Malaysia</p>
                <p>New Zealand</p>
                <p>Philippines</p>
                <p>Poland</p>
                <p>Portugal</p>
              </div>
              <div className="text-gray-400 ">
                <p>Australia</p>
                <p>Brasil</p>
                <p>Canada</p>
                <p>Chile</p>
                <p>Czech Republic</p>
              </div>
              <div className="text-gray-400 ">
                <p>Turkey</p>
                <p>UAE</p>
                <p>United Kingdom</p>
                <p>United States</p>
                <p>Sri Lanka</p>
              </div>
              <div className="text-gray-400 ">
                <p>Qatar</p>
                <p>Singapore</p>
                <p>Slovakia</p>
                <p>South Africa</p>
                <p>Green Land</p>
              </div>
              <div className="text-gray-400 ">
                <p>Pakistan</p>
                <p>Bangladesh</p>
                <p>Bhutaan</p>
                <p>Nepal</p>
                <p>VietNam</p>
              </div>
            </div>
            <br />
            <div className="download flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src="/appstore.png" alt="" className="w-28 h-w-28" />
                <img src="/playmarket.png" alt="" className="w-28 h-w-28" />
              </div>
              <div className="copyright">
                <p className="text-gray-500">© Project created by Group6</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </UserContext.Provider>
  );
}
export { UserContext };
