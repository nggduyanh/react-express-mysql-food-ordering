
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ assignAccount }) {

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
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.post(
          "http://localhost:3030/auth/login",
          loginForm,
          {
            headers: {
              secretTokenKey:
                "PX1fGoibstQNJnr9LGvuEoMxh4U8b2ugCfNiAvT2qiPol9Pk5Mh/NbvCS3Nv7poV/kDD7skuT13aD0unwL2ZoJWQ6eK6biY7s2fe7svzjkzrdF7wfXSmlEqQ17aYyy4IljtOmaYymaDNv+/QNbCjzzF7sOaWmIxBn0Ej1b/dzLAdu2H/DJuataMoOL4AhlkNrQR08/cDnnr3Kw2DDGZlDUl++K75O5+ejO1pCbhnar7zpD2zghMVxxxrQw5GAulL3pVJ2EfnXtxC4mdLKLHlpuzliAfJrof8FxQHfPyuaBMfECNIRe5bBC7v3/K6nSGYUjr3OdWRiNy45kqajqGedw==",
            },
          }
        );

      }));
      if (filterResult === false) {
        alert("User not found");
      } else {
        const userResult = getUserInfoArray.find((user) => {
          return (
            user.SoDienThoai === loginForm.SoDienThoai &&
            user.MatKhau === loginForm.MatKhau
          );
        });
        const responseRole = await axios.get(
          `http://localhost:3030/vaitro/nguoidung/${userResult.MaNguoiDung}`
        );
        const getRole = responseRole.data[0].TenVaiTro;
        userResult.TenVaiTro = responseRole.data[0].TenVaiTro;
        if (getRole === "Buyer") {
          // assignAccount(userResult);
          navigate("/home", { state: userResult });
        } else {
          alert("User not found");
        }

      }
    ;
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      navigate("/home");
    } else {
      console.log("Login again");
    }
  }, []);
  return (
    <div className="flex">
      <video
        loop
        autoPlay
        muted
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
          <input
            className="input_setup"
            type="password"
            placeholder="Enter password"
            id="password"
            onChange={handleChange}
            name="MatKhau"
            value={loginForm.MatKhau}
          />
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
