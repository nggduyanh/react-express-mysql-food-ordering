import { useState } from "react";
import UserData from "../../data/UserData";
import BtnSelection from "../BtnSelection";
export default function ChangeAccount() {
  const [UserInfo, setUserInfo] = useState(UserData);
  const [updateUser, setUpdateUser] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    img: "",
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
  const handleSubmitUpdate = (event) => {
    event.preventDefault();
  };
  console.log(updateUser);
  return (
    <div className="p-5">
      <p className="text-2xl font-bold">My Account</p>
      <div>
        <div className="flex flex-col items-center">
          <img
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            alt=""
            className="w-40 h-40 border rounded-full border-pink-400 mb-2"
          />
          <button className="btnGradientPink">Update avatar</button>
        </div>
        <form action="" onSubmit={handleSubmitUpdate}>
          <label htmlFor="username" className="text-xs">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="input_setup"
            onChange={handleUpdate}
            name="username"
          />
          <label htmlFor="phoneNumber" className="text-xs">
            Phone number
          </label>
          <br />
          <input
            id="phoneNumber"
            type="text"
            placeholder="Phone number"
            className="input_setup"
            onChange={handleUpdate}
            name="phoneNumber"
          />
          <label htmlFor="email" className="text-xs">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="email"
            className="input_setup"
            onChange={handleUpdate}
            name="email"
          />
          <button className="btnGradientPink w-full">Update</button>
        </form>
      </div>
      <BtnSelection className="btnSelections mt-3 p-3">
        Change password
      </BtnSelection>
      <button className="bg-gradient-to-r from-red-400 to-red-600 font-bold text-white p-3 rounded-xl mt-3">
        Delete account
      </button>
    </div>
  );
}
