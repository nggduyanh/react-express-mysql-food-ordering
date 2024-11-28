import { useEffect, useState } from "react";
import videoLogin from "../assets/food_login.mp4";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { loginAuth } from "../Route";
export default function Login() {
  const [showpass, setShowPass] = useState(false);
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.post(loginAuth, loginForm, {
          headers: {
            secretTokenKey:
              "PX1fGoibstQNJnr9LGvuEoMxh4U8b2ugCfNiAvT2qiPol9Pk5Mh/NbvCS3Nv7poV/kDD7skuT13aD0unwL2ZoJWQ6eK6biY7s2fe7svzjkzrdF7wfXSmlEqQ17aYyy4IljtOmaYymaDNv+/QNbCjzzF7sOaWmIxBn0Ej1b/dzLAdu2H/DJuataMoOL4AhlkNrQR08/cDnnr3Kw2DDGZlDUl++K75O5+ejO1pCbhnar7zpD2zghMVxxxrQw5GAulL3pVJ2EfnXtxC4mdLKLHlpuzliAfJrof8FxQHfPyuaBMfECNIRe5bBC7v3/K6nSGYUjr3OdWRiNy45kqajqGedw==",
          },
        });

        const getUserInfo = response.data;
        const now = new Date();
        const epxireToken = {
          token: getUserInfo.accessToken,
          expireDate: now.getTime() + 3600000,
        };
        localStorage.setItem("token", JSON.stringify(epxireToken));
        navigate("/home");
      })(),
      {
        loading: "Check credentials",
        success: "Login successful",
        error: (err) => {
          if (err.response) {
            if (err.response.status === 400) {
              return "Please enter your credentials";
            } else if (err.response.status === 404) {
              return "User not found";
            } else {
              return "An error occurred: " + err.response.data.message;
            }
          } else if (err.request) {
            return "No response from server";
          } else {
            return "Error: " + err.message;
          }
        },
      }
    );
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      navigate("/home");
    } else {
      console.log("Login again");
    }
  }, [navigate]);
  return (
    <div className="flex">
      <video
        loop
        autoPlay
        muted
        preload="auto"
        id="login_video"
        className="w-1/2 h-screen object-cover"
      >
        <source src={videoLogin} type="video/mp4" />
        Your browser does not support video tag
      </video>

      <div className="w-1/2 flex flex-col justify-center px-24">
        <strong className="text-4xl mb-3 block">Welcome back</strong>
        <p className="mb-3">Sign in to continue</p>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="SoDienThoai" className="text-xs">
            Phone number
          </label>
          <br />
          <input
            className="input_setup"
            type="text"
            placeholder="Enter Phone Number"
            id="SoDienThoai"
            onChange={handleChange}
            name="SoDienThoai"
            value={loginForm.SoDienThoai}
          />
          <br />
          <label htmlFor="MatKhau" className="text-xs">
            Password
          </label>
          <br />
          <div className="relative">
            <input
              className="input_setup border border-black block w-full p-3 rounded-xl"
              type={showpass ? "text" : `password`}
              placeholder="Enter password"
              id="password"
              onChange={handleChange}
              name="MatKhau"
              value={loginForm.MatKhau}
            />
            {showpass ? (
              <AiFillEye
                onClick={() => setShowPass(false)}
                className="absolute top-1/2 -translate-y-1/2 right-0 mx-2 cursor-pointer"
              />
            ) : (
              <AiFillEyeInvisible
                onClick={() => setShowPass(true)}
                className="absolute top-1/2 -translate-y-1/2 right-0 mx-2 cursor-pointer"
              />
            )}
          </div>
          <br />
          <button
            className={` btnLoginRegister bg-gradient-to-r from-pink-500 to-pink-600 `}
          >
            Sign in
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="forgot-password" className="mb-5">
            Forgot your password?
          </Link>
          <p>
            You do not have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
