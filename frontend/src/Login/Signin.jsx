import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import Heading from "./Heading";
import Account from "./Account";
import CreateAccount from "./CreateAccount";
import { GetSellerInfo, GetUserInfo } from "../routebackend";

export default function Signin({ assignAccount }) {
  const [loginForm, setLoginForm] = useState({
    TenNguoiDung: "",
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
    try {
      const response = await axios.post(
        "http://localhost:3030/auth/login",
        loginForm,
        {
          headers: {
            secretTokenKey:
              "QItRBJaulyIp75/23ZVeqNh5JPgnP4uTF2Cem88Qjwk33zdOXyq8oC352DQKEPXxyE3+fnXQAq7zTxFcu2Vbfv48ncysKJGrcVRCBEFnIKQQ9O/4DPX0hrsY5j2WQPwP6uILHhyWHFENHQORlXvtIAThOORNNyjLo8RfyA4+cJwjQ5iKFLVaKpKjkEdLijAH/+y65Vy2xge4mAL62ZnsTKyLqJU4jSrZMJ5pBAfF12u2IDO7fZxEASEf2WsLfBYesSoqQwBeXnSc6kF6yCfHJlOBzv8C24XoEVyY9GW8uEVAFU4lzeVdNIXIKlUZtMqMDHeejVC0ieBkuJ627TpDig==",
          },
        }
      );

      const getUserInfoArray = response.data;
      const now = new Date();
      const epxireToken = {
        token: getUserInfoArray.accessToken,
        expireDate: now.getTime() + 3600000,
      };
      localStorage.setItem("token", JSON.stringify(epxireToken));
      console.log( getUserInfoArray)
      navigate("/home",{state: localStorage.getItem("token")})
    } catch (err) {
      alert("Something went wrong between sending data");
      console.log(err.message);
    }
  };

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
              name="TenNguoiDung"
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
          <Link className="underline ml-auto">Forgot Password?</Link>
          <button className="w-full mt-4 py-3 px-6 bg-[#F58220] rounded font-medium text-white">
            Sign In
          </button>
        </form>
        {/* <Account /> */}
        <CreateAccount
          text="Don't have an account ?"
          linktext="Register"
          link="/signup"
        />
      </div>
    </div>
  );
}
