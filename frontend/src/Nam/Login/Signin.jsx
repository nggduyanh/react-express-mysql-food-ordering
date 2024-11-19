import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import Heading from "./Heading";
// import Account from "./Account";
// import CreateAccount from "./CreateAccount";
// import { GetSellerInfo, GetUserInfo } from "../routebackend";
import { FaLongArrowAltLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { GetSellerInfo } from "../../Route";
// import { socket } from "../../Route/socket";
// import { setTime } from "react-datepicker/dist/date_utils";
export default function Signin({ assignAccount }) {
  const [loginForm, setLoginForm] = useState({
    SoDienThoai: "",
    MatKhau: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.post(
          "http://localhost:3030/auth/login",
          loginForm
        );
        const getUserInfoArray = response.data;
        const checkIsSellerResponse = await axios.get(GetSellerInfo, {
          headers: {
            Authorization: "Bearer " + getUserInfoArray.accessToken,
          },
        });
        if (checkIsSellerResponse.status === 403) {
          toast.error("You haven't created seller account, please try again");
        } else {
          const now = new Date();
          const epxireToken = {
            token: getUserInfoArray.accessToken,
            expireDate: now.getTime() + 3600000,
          };
          localStorage.setItem("token", JSON.stringify(epxireToken));
          console.log("checkIsSellerResponse", checkIsSellerResponse);
          // const sellerId = checkIsSellerResponse.data[0].MaNguoiBan;
          // console.log(sellerId);
          // socket.emit("seller_connect", sellerId);
          navigate("/home/seller");
        }
      })(),
      {
        loading: "Check credentials",
        success: "Success login",
        error: "Login failed",
      }
    );
    // try {
    //   const response = await axios.post(
    //     "http://localhost:3030/auth/login",
    //     loginForm
    //   );
    //   const getUserInfoArray = response.data;
    //   const now = new Date();
    //   const epxireToken = {
    //     token: getUserInfoArray.accessToken,
    //     expireDate: now.getTime() + 3600000,
    //   };
    //   localStorage.setItem("token", JSON.stringify(epxireToken));
    //   navigate("/home/seller");
    // } catch (err) {
    //   alert("Something went wrong between sending data");
    //   console.log("err.message", err);
    // }
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      navigate("/home/seller");
    } else {
      console.log("Login again");
    }
  }, [navigate]);
  return (
    <div className="relative h-screen w-screen items-center justify-center bg-gradient-to-b from-customColor1 via-customColor1 to-customColor2 ">
      <div className="absolute w-full top-1/2 transform -translate-y-1/2">
        <img src="./images/bg-cus.png" alt="" className="w-full" />
      </div>
      <div className="absolute right-0">
        <img src="./images/bg-food.png" alt="" className="" />
      </div>
      <div className="absolute flex flex-col h-auto w-[512px] top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <Logo />
        <Heading title="Sign In" />
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="SoDienThoai" className="pb-2 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="SoDienThoai"
              id="phoneNumber"
              className="w-full py-2.5 px-3 rounded p"
              placeholder="Phone Number"
              onChange={handleChange}
              value={loginForm.SoDienThoai}
            />
          </div>
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="MatKhau" className="pb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              name="MatKhau"
              id="password"
              className="w-full py-2.5 px-3 rounded p"
              placeholder="Password"
              onChange={handleChange}
              value={loginForm.MatKhau}
            />
          </div>

          <button className="w-full mt-4 py-3 px-6 bg-[#F58220] rounded font-medium text-white">
            Sign In
          </button>
        </form>
        <Link
          to="/"
          className="mt-4 flex items-center gap-5 text-pink-500 font-bold"
        >
          <FaLongArrowAltLeft />
          <p className="">Back to client page</p>
        </Link>
        {/* <Account /> */}
        {/* <CreateAccount
          text="Don't have an account ?"
          linktext="Register"
          link="/signup"
        /> */}
      </div>
    </div>
  );
}
