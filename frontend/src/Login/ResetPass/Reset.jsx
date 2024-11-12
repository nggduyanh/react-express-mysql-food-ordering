import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
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
        error: "Something went wrong",
      }
    );
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
        <input
          name="SoDienThoai"
          onChange={handleResetChange}
          type="text"
          value={resetForm.SoDienThoai}
          placeholder="Enter your phone number"
          className="w-full border border-black mt-3 p-3 rounded-lg"
        />
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
