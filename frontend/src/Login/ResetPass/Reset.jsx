import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX =
  /^(0[3|5|7|8|9][0-9]{8}|(01[2|6|8|9]|09[0-9]|[3|5|7|8|9][0-9])[0-9]{8})$/;
export default function Reset() {
  const [resetForm, setResetForm] = useState({
    Email: "",
    SoDienThoai: "",
  });
  const navigate = useNavigate();
  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };
  const handleResetForm = async (event) => {
    event.preventDefault();
    if (resetForm.Email === "" || resetForm.SoDienThoai === "") {
      toast.error("Please fullfill email and password");
    } else {
      if (!EMAIL_REGEX.test(resetForm.Email)) {
        toast.error("Invalid email");
      }
      if (!PHONE_REGEX.test(resetForm.SoDienThoai)) {
        toast.error("Invalid phone number");
      } else {
        toast.promise(
          (async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            const response = await axios.post(
              "http://localhost:3030/auth/recoverpassword/mail",
              resetForm,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            if (response.status === 201) {
              navigate("/forgot-password/confirmCode", {
                state: { resetForm },
                replace: true,
              });
            }
          })(),
          {
            loading: "Waiting to next page...",
            success: "Success",
            error: (err) =>
              (err.status === 404 && "Not found user") ||
              "Something went wrong",
          }
        );
      }
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="border mb-3 border-white p-3 rounded-lg bg-pink-200">
          <MdOutlineMailOutline className="text-4xl text-pink-500" />
        </div>
        <p className="text-4xl font-bold">Reset your password</p>
      </div>
      <form onSubmit={handleResetForm} className="text-center mt-4">
        <p>Forgot your password?, Please enter your email and phone number</p>
        <p className="">And we will send you a 4-digit code</p>
        <input
          name="Email"
          onChange={handleResetChange}
          type="text"
          value={resetForm.Email}
          placeholder="Enter your email"
          className="w-full border border-black mt-3 p-3 rounded-lg"
        />
        <p className="text-xs text-left text-gray-500 my-2">
          <span className="font-bold ">Email:</span> Must be in the format
          example@domain.com.
        </p>
        <input
          name="SoDienThoai"
          onChange={handleResetChange}
          type="text"
          value={resetForm.SoDienThoai}
          placeholder="Enter your phone number"
          className="w-full border border-black mt-3 p-3 rounded-lg"
        />
        <p className="text-xs text-gray-500 my-2">
          <span className="font-bold ">Phone number:</span> Must be a valid
          phone number format, start from 0 to 10 number (e.g., 0912345678).
        </p>
        <button
          to="/"
          className="mt-3 inline-block w-full bg-pink-500 p-3 rounded-lg text-white font-bold hover:bg-pink-700 transition-all duration-200 ease-in"
        >
          Get 6-digit code
        </button>
      </form>
      ;
    </div>
  );
}
