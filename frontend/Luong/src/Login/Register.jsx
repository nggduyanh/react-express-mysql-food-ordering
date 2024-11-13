import { useReducer } from "react";
import videoRegister from "../assets/food_register.mp4";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
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
        TenNguoiDung.trim().length === 0 ||
        Email.trim().length === 0 ||
        MatKhau.trim().length === 0 ||
        SoDienThoai.trim().length === 0 ||
        !USER_REGEX.test(TenNguoiDung) ||
        !PHONE_REGEX.test(SoDienThoai) ||
        !EMAIL_REGEX.test(Email)
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
  const [RegisterForm, dispatch] = useReducer(RegisterReducer, RegisterAction);
  const navigate = useNavigate();
  const handleChange = (e) => {
    dispatch({ type: "inputValue", event: e });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newState = RegisterReducer(RegisterForm, { type: "submitValue" });
    const { inputError } = newState;
    if (inputError) {
      toast.error("Please fullfill your registation form");
      return;
    } else {
      toast.promise(
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
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
          <label htmlFor="username" className="text-xs">
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
          <label htmlFor="Email" className="text-xs">
            Email
          </label>
          <br />
          <input
            name="Email"
            className="input_setup"
            type="text"
            placeholder="Enter Email"
            id="Email"
            onChange={handleChange}
            value={RegisterForm.form?.Email}
          />
          <br />
          <label htmlFor="Password" className="text-xs">
            Password
          </label>
          <br />
          <input
            name="MatKhau"
            className="input_setup"
            type="password"
            placeholder="Enter password"
            id="Password"
            onChange={handleChange}
            value={RegisterForm.form?.MatKhau}
          />
          <br />
          <label htmlFor="phoneNumber" className="text-xs">
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
          <br />
          <button
            className={` btnLoginRegister bg-gradient-to-r from-cyan-500 to-blue-400 `}
          >
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already has account? <Link to="/">Sign in</Link>
          </p>
        </div>
        <div className="text-center mt-3">
          <p className="">
            Want to become a merchant?{" "}
            <Link to="/register_restaurant" className="text-pink-500 font-bold">
              Join now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}