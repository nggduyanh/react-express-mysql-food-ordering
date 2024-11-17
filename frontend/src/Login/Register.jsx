import { useReducer, useState } from "react";
import videoRegister from "../assets/food_register.mp4";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX =
  /^(0[3|5|7|8|9][0-9]{8}|(01[2|6|8|9]|09[0-9]|[3|5|7|8|9][0-9])[0-9]{8})$/;
const RegisterAction = {
  inputError: true,
  form: {
    TenNguoiDung: "",
    Email: "",
    AnhNguoiDung: null,
    MatKhau: "",
    SoDienThoai: "",
  },
};
const RegisterReducer = (state, action) => {
  switch (action.type) {
    case "inputValue": {
      const { name, value } = action.event.target;
      return {
        inputError: true,
        form: {
          ...state.form,
          [name]: value,
        },
      };
    }
    case "submitValue": {
      const { TenNguoiDung, Email, MatKhau, SoDienThoai } = state.form;
      if (
        // TenNguoiDung.trim().length === 0 ||
        // Email.trim().length === 0 ||
        // MatKhau.trim().length === 0 ||
        // SoDienThoai.trim().length === 0 ||
        !USER_REGEX.test(TenNguoiDung) ||
        !PHONE_REGEX.test(SoDienThoai) ||
        !EMAIL_REGEX.test(Email) ||
        !PWD_REGEX.test(MatKhau)
      ) {
        return {
          ...state,
          inputError: true,
        };
      } else {
        return {
          ...state,
          inputError: false,
        };
      }
    }
    default:
      return state;
  }
};
export default function Register() {
  const [showpass, setShowPass] = useState(false);
  const [RegisterForm, dispatch] = useReducer(RegisterReducer, RegisterAction);
  const navigate = useNavigate();
  const handleChange = (e) => {
    dispatch({ type: "inputValue", event: e });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newState = RegisterReducer(RegisterForm, { type: "submitValue" });
    const { inputError } = newState;
    if (
      RegisterForm.form.TenNguoiDung.trim().length === 0 ||
      RegisterForm.form.Email.trim().length === 0 ||
      RegisterForm.form.MatKhau.trim().length === 0 ||
      RegisterForm.form.SoDienThoai.trim().length === 0
    ) {
      toast.error("Please fullfill your registation form");
    } else if (inputError) {
      if (!USER_REGEX.test(RegisterForm.form.TenNguoiDung)) {
        toast.error(
          "Invalid username format. Must be 4-24 characters starting with a letter."
        );
      }
      if (!PHONE_REGEX.test(RegisterForm.form.SoDienThoai)) {
        toast.error("Invalid phone number.");
      }
      if (!EMAIL_REGEX.test(RegisterForm.form.Email)) {
        toast.error("Invalid email format.");
      }
      if (!PWD_REGEX.test(RegisterForm.form.MatKhau)) {
        toast.error(
          "Invalid password format. Must be 8-24 characters with uppercase, lowercase, number, and special character."
        );
      }
      return;
    } else {
      toast.promise(
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 700));
          const response = await axios.post(
            "http://localhost:3030/auth/signup",
            JSON.stringify(RegisterForm.form),
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          const Token = await response.data;
          const now = new Date();
          const epxireToken = {
            token: Token.accessToken,
            expireDate: now.getTime() + 3600000,
          };
          localStorage.setItem("token", JSON.stringify(epxireToken));
          navigate("/home");
        })(),
        {
          loading: "Check credentials",
          success: "Register successful",
          error: (err) => err.message || "An unexpected error occurred",
        }
      );
    }
  };

  return (
    <div className="flex">
      <video
        loop
        autoPlay
        muted
        id="login_video"
        className="w-1/2 h-screen object-cover"
      >
        <source src={videoRegister} type="video/mp4" />
        Your browser does not support video tag
      </video>

      <div className="w-1/2 flex flex-col justify-center px-24">
        <strong className="text-4xl mb-3 block">Hello there</strong>
        <p className="mb-3">Sign in to continue</p>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="username" className="text-xs text-pink-500 font-bold">
            Username
          </label>
          <br />
          <input
            name="TenNguoiDung"
            className="input_setup"
            type="text"
            placeholder="enter username"
            id="username"
            value={RegisterForm.form?.TenNguoiDung}
            onChange={handleChange}
          />
          <p className="text-xs text-gray-500 mb-2">
            <span className="font-bold ">Username:</span> Must start with a
            letter and be 4-24 characters long
          </p>
          <label htmlFor="Email" className="text-xs text-pink-500 font-bold">
            Email
          </label>
          <input
            name="Email"
            className="input_setup"
            type="text"
            placeholder="Enter Email"
            id="Email"
            onChange={handleChange}
            value={RegisterForm.form?.Email}
          />
          <p className="text-xs text-gray-500 mb-2">
            <span className="font-bold ">Email:</span> Must be in the format
            example@domain.com.
          </p>
          <label htmlFor="Password" className="text-xs text-pink-500 font-bold">
            Password
          </label>
          <br />
          <div className="relative">
            <input
              name="MatKhau"
              className="input_setup border border-black block w-full p-3 rounded-xl"
              type={showpass ? "text" : `password`}
              placeholder="Enter password"
              id="Password"
              onChange={handleChange}
              value={RegisterForm.form?.MatKhau}
            />
            {showpass ? (
              <AiFillEye
                onClick={() => setShowPass(false)}
                className="absolute top-1/4 -translate-y-1/3  right-0 mx-2 cursor-pointer"
              />
            ) : (
              <AiFillEyeInvisible
                onClick={() => setShowPass(true)}
                className="absolute top-1/4 -translate-y-1/3 right-0 mx-2 cursor-pointer"
              />
            )}
            <p className="text-xs text-gray-500 mb-2">
              <span className="font-bold ">Password:</span> Must be 8-24 chars,
              with at least 1 uppercase, 1 lowercase, 1 number, and 1 special.
            </p>
          </div>
          <label
            htmlFor="phoneNumber"
            className="text-xs text-pink-500 font-bold"
          >
            Phone number
          </label>
          <br />
          <input
            name="SoDienThoai"
            className="input_setup"
            type="text"
            placeholder="Enter Phone Number"
            id="phoneNumber"
            onChange={handleChange}
            value={RegisterForm.form?.SoDienThoai}
          />
          <p className="text-xs text-gray-500 mb-2">
            <span className="font-bold ">Phone number:</span> Must be a valid
            phone number format, start from 0 to 10 number (e.g., 0912345678).
          </p>

          <button
            className={` btnLoginRegister bg-gradient-to-r from-cyan-500 to-blue-400 `}
          >
            Register
          </button>
        </form>
        <div className="text-center mt-2">
          <p>
            Already has account?{" "}
            <Link to="/" className="font-bold">
              Sign in
            </Link>
          </p>
        </div>
        <div className="text-center mt-2">
          <p>
            Change to Merchant?{" "}
            <Link className="text-pink-500 font-bold" to="/loginSeller">
              Login Merchant
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
