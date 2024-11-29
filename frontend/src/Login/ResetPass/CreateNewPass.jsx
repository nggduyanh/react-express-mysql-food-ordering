import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlinePassword } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateUser } from "../../Route";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export default function CreateNewPass() {
  const [showpass, setShowPass] = useState(false);
  const userData = useLocation();
  const accessToken = userData.state.data.accessToken;
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState({
    setupNewPassword: "",
    confirmNewPassword: "",
  });

  const handleCreateNewPassChange = (e) => {
    const { name, value } = e.target;
    setNewPass((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };
  const handleUpdatePassForm = (event) => {
    event.preventDefault();
    if (newPass.setupNewPassword === "" || newPass.confirmNewPassword === "") {
      toast.error("Please fullfiled the password");
    } else {
      if (newPass.confirmNewPassword !== newPass.setupNewPassword) {
        toast.error("Password is not matched");
      }
      if (!PWD_REGEX.test(newPass.setupNewPassword)) {
        toast.error("Invalid password");
      } else {
        toast.promise(
          (async () => {
            const response = await axios.patch(
              UpdateUser,
              {
                MaNguoiDung: userData.state.data.NguoiDung.MaNguoiDung,
                MatKhau: newPass.setupNewPassword,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + accessToken,
                },
                withCredentials: true,
              }
            );
            if (response.status === 201) {
              navigate("/forgot-password/password-success", {
                replace: true,
              });
            }
          })(),
          {
            loading: "Waiting to update password...",
            success: "Update success",
            error: "Something went wrong, please try again",
          }
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="border mb-3 border-white p-3 rounded-lg bg-pink-200">
          <MdOutlinePassword className="text-4xl text-pink-500" />
        </div>
        <p className="text-4xl font-bold">Create a new password!</p>
      </div>
      <form onSubmit={handleUpdatePassForm} className="text-center mt-4">
        <p>Please choose a password that has not been used before </p>
        <p className="text-pink-500 font-bold mb-3">
          Must be at least 8 characters
        </p>
        <div>
          <div className="relative">
            <input
              type={showpass ? "text" : `password`}
              onChange={handleCreateNewPassChange}
              value={newPass.setupNewPassword}
              name="setupNewPassword"
              placeholder="setup new password"
              className="block border border-gray-400 w-full mb-3 p-3 rounded-lg"
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
          <div className="relative">
            <input
              type={showpass ? "text" : `password`}
              onChange={handleCreateNewPassChange}
              value={newPass.confirmNewPassword}
              name="confirmNewPassword"
              placeholder="confirm new password"
              className="block border border-gray-400 w-full mb-3 p-3 rounded-lg"
            />
            {showpass ? (
              <AiFillEye
                onClick={() => setShowPass(false)}
                className="absolute top-1/3 -translate-y-1/2 right-0 mx-2 cursor-pointer"
              />
            ) : (
              <AiFillEyeInvisible
                onClick={() => setShowPass(true)}
                className="absolute top-1/3 -translate-y-1/2 right-0 mx-2 cursor-pointer"
              />
            )}
            <p className="text-xs text-gray-500 mb-2">
              <span className="font-bold ">Password:</span> Must be 8-24 chars,
              with at least 1 uppercase, 1 lowercase, 1 number, and 1 special.
            </p>
          </div>
        </div>
        <button className="mt-3 inline-block w-full bg-pink-500 p-3 rounded-lg text-white font-bold hover:bg-pink-700 transition-all duration-200 ease-in">
          Reset password
        </button>
      </form>
    </div>
  );
}
