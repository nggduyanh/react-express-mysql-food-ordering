import toast from "react-hot-toast";
import { UserContext } from "../Layout/LayoutHeader";
import { useContext, useReducer, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { refreshPage, UpdateUser } from "../Route";
const showPassAction = {
  showOld: false,
  showNew: false,
  showRepeat: false,
};
const ShowPassReducer = (state, action) => {
  switch (action.type) {
    case "OLD_PASS": {
      return {
        ...state,
        showOld: !state.showOld,
      };
    }
    case "NEW_PASS":
      return {
        ...state,
        showNew: !state.showNew,
      };
    case "REPEAT_PASS":
      return {
        ...state,
        showRepeat: !state.showRepeat,
      };
    default: {
      return state;
    }
  }
};
export default function ChangePassword() {
  const { userData, tokenValue } = useContext(UserContext);
  const [showPass, dispatch] = useReducer(ShowPassReducer, showPassAction);
  const [updatePass, setUpdatePass] = useState({
    oldPass: "",
    newPass: "",
    repeatPass: "",
  });
  const navigate = useNavigate();
  const handleChangePass = (event) => {
    const { name, value } = event.target;
    setUpdatePass((prevPass) => {
      return {
        ...prevPass,
        [name]: value,
      };
    });
  };
  console.log(userData.MaNguoiDung);
  const handleUpdatePass = (event) => {
    event.preventDefault();
    if (updatePass.oldPass !== userData.MatKhau) {
      toast.error("Old password is incorrect");
      return;
    } else {
      if (
        updatePass.newPass.trim().length === 0 &&
        updatePass.repeatPass.trim().length === 0
      ) {
        toast.error("Missing new password and repeat password field");
        return;
      }
      if (updatePass.newPass !== updatePass.repeatPass) {
        toast.error("New pass and repeat pass are incorrect");
        return;
      } else {
        toast.promise(
          (async () => {
            const response = await axios.patch(
              UpdateUser,
              {
                MaNguoiDung: userData?.MaNguoiDung,
                MatKhau: updatePass.newPass.trim(),
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + tokenValue,
                },
                withCredentials: true,
              }
            );
            return response;
          })(),
          {
            loading: "Changing password...",
            success: (response) => {
              const successMessage = `Change password successfully: ${response.status}`; // Lưu thông báo thành công
              setTimeout(() => {
                navigate("/");
              }, 1000);
              return successMessage;
            },
            error: (err) => `Error change password: ${err.message}`,
          }
        );
      }
    }
  };

  return (
    <div className="p-5">
      <p className="text-2xl font-bold mb-2">Change Password</p>
      <hr />
      <form
        onSubmit={handleUpdatePass}
        className="overflow-auto max-h-[650px] mt-5"
      >
        <label htmlFor="oldPassword" className="text-md font-bold mb-2 block">
          Old password
        </label>
        <div className="relative mb-10 w-1/2">
          <input
            id="oldPassword"
            onChange={handleChangePass}
            name="oldPass"
            type={showPass.showOld ? "text" : "password"}
            placeholder="Retype your old password"
            className="border border-black block w-full p-3 rounded-xl"
          />
          <div
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0 p-2"
            onClick={() => dispatch({ type: "OLD_PASS" })}
          >
            {showPass.showOld ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>
        <label htmlFor="newPassword" className="text-md font-bold mb-2 block">
          New password
        </label>
        <div className="relative mb-10 w-1/2">
          <input
            placeholder="Enter your new password"
            onChange={handleChangePass}
            name="newPass"
            id="newPassword"
            type={showPass.showNew ? "text" : "password"}
            className="border border-black block w-full p-3 mb-10 rounded-xl"
          />
          <div
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0 p-2"
            onClick={() => dispatch({ type: "NEW_PASS" })}
          >
            {showPass.showNew ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>
        <label
          htmlFor="confirmPassword"
          className="text-md font-bold mb-2 block"
        >
          confirm password
        </label>
        <div className="relative mb-10 w-1/2">
          <input
            onChange={handleChangePass}
            name="repeatPass"
            placeholder="Rewrite your new password"
            id="confirmPassword"
            type={showPass.showRepeat ? "text" : "password"}
            className="border border-black block w-full p-3 mb-10 rounded-xl"
          />
          <div
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-0 p-2"
            onClick={() => dispatch({ type: "REPEAT_PASS" })}
          >
            {showPass.showRepeat ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>
        <button className="bg-pink-500 text-white font-bold p-3 w-1/2 rounded-2xl shadow-lg hover:bg-pink-700 transition-all duration-150 ease-in">
          Change password
        </button>
      </form>
    </div>
  );
}
