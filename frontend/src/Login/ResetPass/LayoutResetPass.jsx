import { MdDone } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
export default function LayoutResetPass() {
  const [active, setActive] = useState([
    {
      id: "reset-password",
      finishReset: false,
    },
    {
      id: "enter-code",
      finishCode: false,
    },
    {
      id: "create-password",
      finishPass: false,
    },
    {
      id: "password-reset",
      finish: false,
    },
  ]);
  const handleSetFinish = (id, finishBoolean) => {
    setActive((prevActive) => {
      return prevActive.id === id
        ? [
            ...prevActive,
            { id: prevActive.id, finishBoolean: !prevActive.finishBoolean },
          ]
        : [...prevActive];
    });
  };
  console.log(active);
  return (
    <div className="flex h-full">
      <div className="proccess w-3/12 h-screen bg-pink-500 flex flex-col">
        <div className="text-2xl font-bold gap-3 text-white text-center flex items-center justify-center my-20">
          <FaLock />
          <p>Reset Password</p>
        </div>
        <div className="processUI text-white ">
          <div className="flex items-center ml-10 gap-5 my-10">
            <div
              className={`p-2 border border-white rounded-full ${
                active.finishReset ? "bg-white text-pink-500" : " "
              }`}
            >
              <MdDone />
            </div>
            <div>
              <p className="text-xl font-bold">Reset password</p>
              <p className="text-sm">We will send you email to verify</p>
            </div>
          </div>
          <div className="flex items-center ml-10 gap-5 my-10">
            <div
              className={`p-2 border border-white rounded-full ${
                active.finishCode ? "bg-white text-pink-500" : " "
              }`}
            >
              <MdDone />
            </div>
            <div>
              <p className="text-xl font-bold">Enter confirmation code</p>
              <p className="text-sm">We send your code through email</p>
            </div>
          </div>
          <div className="flex items-center ml-10 gap-5 my-10">
            <div
              className={`p-2 border border-white rounded-full ${
                active.finishPass ? "bg-white text-pink-500" : " "
              }`}
            >
              <MdDone />
            </div>
            <div>
              <p className="text-xl font-bold">Create a new password</p>
              <p className="text-sm">Must be at least 8 characters</p>
            </div>
          </div>
          <div className="flex items-center ml-10 gap-5 my-10">
            <div
              className={`p-2 border border-white rounded-full ${
                active.finish ? "bg-white text-pink-500" : " "
              }`}
            >
              <MdDone />
            </div>
            <div>
              <p className="text-xl font-bold">Password reset</p>
              <p className="text-sm">Success. Click to login</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end  h-full ml-10 gap-5 my-10">
          <div className="flex items-center gap-4">
            <FaArrowLeftLong className="text-white font-bold" />
            <Link to="/" className="text-white font-bold">
              Back to login
            </Link>
          </div>
        </div>
      </div>
      <div className="w-9/12 mt-32">
        <Outlet />
      </div>
    </div>
  );
}
