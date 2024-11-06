import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Reset() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="border mb-3 border-white p-3 rounded-lg bg-pink-200">
          <MdOutlineMailOutline className="text-4xl text-pink-500" />
        </div>
        <p className="text-4xl font-bold">Reset your password</p>
      </div>
      <div className="text-center mt-4">
        <p>Forgot your password?, Please enter your email</p>
        <p className="">And we will send you a 4-digit code</p>
        <input
          type="text"
          placeholder="Enter your email"
          className="w-full border border-black mt-3 p-3 rounded-lg"
        />
        <button
          to="/"
          className="mt-3 inline-block w-full bg-pink-500 p-3 rounded-lg text-white font-bold hover:bg-pink-700 transition-all duration-200 ease-in"
        >
          Get 4-digit code
        </button>
      </div>
      ;
    </div>
  );
}
