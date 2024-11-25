import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { getRoleUserSpecific } from "../../../Route/index.js";
export default function LoginAdmin() {
  const [showpass, setShowPass] = useState(false);
  const [adminForm, setadminForm] = useState({
    SoDienThoai: "",
    MatKhau: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setadminForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (adminForm.SoDienThoai === "" || adminForm.MatKhau === "") {
      toast.error("Please fullfilled your information");
    } else {
      toast.promise(
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const response = await axios.post(
            "http://localhost:3030/auth/login",
            adminForm,
            {
              headers: {
                secretTokenKey:
                  "PX1fGoibstQNJnr9LGvuEoMxh4U8b2ugCfNiAvT2qiPol9Pk5Mh/NbvCS3Nv7poV/kDD7skuT13aD0unwL2ZoJWQ6eK6biY7s2fe7svzjkzrdF7wfXSmlEqQ17aYyy4IljtOmaYymaDNv+/QNbCjzzF7sOaWmIxBn0Ej1b/dzLAdu2H/DJuataMoOL4AhlkNrQR08/cDnnr3Kw2DDGZlDUl++K75O5+ejO1pCbhnar7zpD2zghMVxxxrQw5GAulL3pVJ2EfnXtxC4mdLKLHlpuzliAfJrof8FxQHfPyuaBMfECNIRe5bBC7v3/K6nSGYUjr3OdWRiNy45kqajqGedw==",
              },
            }
          );
          const data = response.data;
          console.log(data);
          const checkIsAdminResponse = await axios.get(
            getRoleUserSpecific + `${data.NguoiDung.MaNguoiDung}`,
            {
              headers: {
                Authorization: "Bearer " + data.accessToken,
              },
            }
          );
          if (checkIsAdminResponse.status === 200) {
            if (checkIsAdminResponse.data[0].MaVaiTro !== 1) {
              toast.error("You are not admin, please try again");
            } else {
              const now = new Date();
              const epxireToken = {
                token: data.accessToken,
                expireDate: now.getTime() + 3600000,
              };
              localStorage.setItem("token-admin", JSON.stringify(epxireToken));
              toast.success("Welcome admin!");
              navigate("/admin_home");
            }
          }
        })(),
        {
          loading: "Checking credentials...",
          success: "Account found",
          error: (err) => {
            if (err.status === 404) {
              return "User not found";
            }
            return `Something went wrong: ${err.message}`;
          },
        }
      );
    }
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token-admin"));
    if (token) {
      navigate("/admin_home");
    } else {
      console.log("Login again");
    }
  }, [navigate]);
  return (
    <div>
      <div className="border z-50 bg-white  border-x-4 border-y-4 border-blue-500 rounded-xl w-1/3 fixed h-96 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-5 ">
        <div className="text-center mt-10">
          <p className="text-blue-500 font-bold text-2xl">Admin Login</p>
        </div>
        <br />
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="SoDienThoai"
            placeholder="Enter your phone number"
            onChange={handleChange}
            value={adminForm.SoDienThoai}
            className="border border-blue-500 w-full rounded-xl my-2 p-4"
          />

          <div className="relative">
            <input
              placeholder="Enter your password"
              onChange={handleChange}
              name="MatKhau"
              value={adminForm.MatKhau}
              type={showpass ? "text" : `password`}
              className="border border-blue-500 w-full rounded-xl my-2 p-4"
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
          <button className="w-full hover:bg-blue-700 transition-all ease-in duration-150 bg-blue-500 text-white font-bold p-4 rounded-xl mt-5">
            Login
          </button>
        </form>
      </div>
      <div className="bg-blue-500 z-0 fixed w-1/3 h-96 top-1/2 left-1/2 -translate-y-[170px] rounded-xl  -translate-x-[235px]"></div>
    </div>
  );
}
