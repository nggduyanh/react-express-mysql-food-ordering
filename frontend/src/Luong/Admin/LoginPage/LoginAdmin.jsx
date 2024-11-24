import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
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
    console.log(adminForm);
  };
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
            placeholder="Enter your username"
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
          <button className="w-full bg-blue-500 text-white font-bold p-4 rounded-xl mt-5">
            Login
          </button>
        </form>
      </div>
      <div className="bg-blue-500 z-0 fixed w-1/3 h-96 top-1/2 left-1/2 -translate-y-[170px] rounded-xl  -translate-x-[235px]"></div>
    </div>
  );
}
