import { useEffect, useRef, useState } from "react";
import BtnSelection from "../BtnSelection";
import axios from "axios";
import { deleteUserRoute, localStaticFile, UpdateUser } from "../../Route";
import { UserContext } from "../../Layout/LayoutHeader";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function ChangeAccount() {
  const { userData, tokenValue } = useContext(UserContext);
  const [isShow, setIsShow] = useState(false);
  const imgRef = useRef(null);
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState({
    MaNguoiDung: userData?.MaNguoiDung,
    TenNguoiDung: "",
    Email: "",
    AnhNguoiDung: null,
    AnhNguoiDungShow: null,
    SoDienThoai: "",
  });
  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setUpdateUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    const formUserData = new FormData();
    formUserData.append("AnhNguoiDung", updateUser.AnhNguoiDung);
    formUserData.append("MaNguoiDung", updateUser.MaNguoiDung);
    formUserData.append("TenNguoiDung", updateUser.TenNguoiDung);
    formUserData.append("SoDienThoai", updateUser.SoDienThoai);
    formUserData.append("Email", updateUser.Email);
    // for (let pair of formUserData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = axios.patch(UpdateUser, formUserData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + tokenValue,
          },
          withCredentials: true,
        });
        return response;
      })(),
      {
        loading: "Update information...",
        success: (response) => {
          const successMessage = `Updated successfully: ${response.status}`; // Lưu thông báo thành công
          // Hiển thị thông báo
          setTimeout(() => {
            navigate("/");
          }, 1000);
          return successMessage;
        },
        error: (err) => `Error uploading data: ${err.message}`,
      }
    );
    // try {
    //   const response = await axios.patch(UpdateUser, formUserData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //     withCredentials: true,
    //   });
    //   alert("Uploaded successfully: ", response.data);
    // } catch (err) {
    //   console.error("Error uploading data: ", err);
    // }
  };
  useEffect(() => {
    setUpdateUser((prevUser) => {
      return {
        ...prevUser,
        AnhNguoiDungShow: localStaticFile + userData?.AnhNguoiDung,
      };
    });
  }, [userData]);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUpdateUser((prevUser) => {
        return {
          ...prevUser,
          AnhNguoiDung: file,
          AnhNguoiDungShow: imageUrl,
        };
      });
    }
  };

  const handleDeleteAccount = async () => {
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập độ trễ
        const response = await axios.delete(deleteUserRoute, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenValue,
          },
          withCredentials: true,
          data: {
            MaNguoiDung: userData?.MaNguoiDung,
          },
        });
        localStorage.removeItem("token");
        return response;
      })(),
      {
        loading: "Deleting your account...",
        success: (response) => {
          const successMessage = `Deleted successfully: ${response.status}`; // Thông báo thành công
          setTimeout(() => {
            navigate("/");
          }, 1000);
          return successMessage;
        },
        error: (err) => `Error deleting data: ${err.message}`,
      }
    );
  };

  const imgResults = updateUser?.AnhNguoiDungShow?.slice(
    updateUser.AnhNguoiDungShow.lastIndexOf("/") + 1
  );
  console.log("imgResults", imgResults);
  // console.log("AnhNguoiDung", updateUser.AnhNguoiDung);
  return (
    <div className="p-5 relative">
      <p className="text-2xl font-bold">My Account</p>
      <div>
        <div className="flex flex-col items-center">
          {imgResults !== null &&
          imgResults !== "null" &&
          imgResults !== "undefined" ? (
            <img
              src={updateUser?.AnhNguoiDungShow}
              alt=""
              className="w-40 h-40 border rounded-full border-pink-400 mb-2"
            />
          ) : (
            <img
              src="/avatar.png"
              className="w-40 h-40 border rounded-full border-pink-400 mb-2"
            />
          )}
          <input
            type="file"
            name="AnhNguoiDungShow"
            id="fileInput"
            accept="image/*"
            className="hidden"
            ref={imgRef}
            onChange={handleImageChange}
          />
          <button
            className="btnGradientPink"
            onClick={() => imgRef.current.click()}
          >
            Update avatar
          </button>
        </div>
        <form onSubmit={handleSubmitUpdate}>
          <label htmlFor="username" className="text-xs">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder={`Username: ${userData?.TenNguoiDung}`}
            className="input_setup"
            onChange={handleUpdate}
            name="TenNguoiDung"
          />
          <label htmlFor="phoneNumber" className="text-xs">
            Phone number
          </label>
          <br />
          <input
            id="phoneNumber"
            type="text"
            placeholder={`SoDienThoai: ${userData?.SoDienThoai}`}
            className="input_setup"
            onChange={handleUpdate}
            name="SoDienThoai"
          />
          <label htmlFor="email" className="text-xs">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder={`Email: ${userData?.Email}`}
            className="input_setup"
            onChange={handleUpdate}
            name="Email"
          />
          <button type="submit" className="btnGradientPink w-full">
            Update
          </button>
        </form>
      </div>
      <BtnSelection des="change-password" className="btnSelections mt-3 p-3">
        Change password
      </BtnSelection>
      {isShow && (
        <div className="fixed w-1/3 text-black rounded-2xl bg-white border border-pink-500 h-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div>
            <p className="text-red-500 font-bold flex items-center justify-center mt-10">
              Are you sure want to delete your Account ?
            </p>
          </div>
          <div className="flex items-center justify-center mt-10 gap-2">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white font-bold p-2 min-w-20 hover:bg-red-700 transition-all duration-200 ease-in rounded-xl"
            >
              Yes
            </button>
            <button
              onClick={() => setIsShow(false)}
              className="bg-blue-500 text-white font-bold p-2 min-w-20 hover:bg-blue-700 transition-all duration-200 ease-in rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsShow((prevShown) => !prevShown)}
        className="bg-gradient-to-r from-red-400 to-red-600 font-bold text-white p-3 rounded-xl mt-3"
      >
        Delete account
      </button>
    </div>
  );
}
