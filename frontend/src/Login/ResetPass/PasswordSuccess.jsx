import { IoIosCloudDone } from "react-icons/io";
import { Link } from "react-router-dom";
export default function PasswordSuccess() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="border mb-3 border-white p-3 rounded-lg bg-pink-200">
          <IoIosCloudDone className="text-4xl text-pink-500" />
        </div>
        <p className="text-4xl font-bold">Password reset!</p>
      </div>
      <div className="text-center mt-4">
        <p>Your password has been successfully reset, </p>
        <p className="mt-3">Click below to log in magically</p>
        <Link
          to="/"
          className="mt-3 inline-block w-full bg-pink-500 p-3 rounded-lg text-white font-bold hover:bg-pink-700 transition-all duration-200 ease-in"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
