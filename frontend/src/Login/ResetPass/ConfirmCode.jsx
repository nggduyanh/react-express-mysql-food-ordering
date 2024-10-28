import { CiKeyboard } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function ConfirmCode() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="border mb-3 border-white p-3 rounded-lg bg-pink-200">
          <CiKeyboard className="text-4xl text-pink-500" />
        </div>
        <p className="text-4xl font-bold">Enter confirmation code</p>
      </div>
      <div className="text-center mt-4">
        <p>We sent a code to abc@gmail.com</p>
        <div className="Code  mt-3">
          <input
            type="text"
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            type="text"
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            type="text"
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            type="text"
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
        </div>
        <Link
          to="/"
          className="mt-3 inline-block w-full bg-pink-500 p-3 rounded-lg text-white font-bold hover:bg-pink-700 transition-all duration-200 ease-in"
        >
          Continue
        </Link>
        <div>
          <p>
            Didnt receive the email ?{" "}
            <span className="text-pink-500 font-bold cursor-pointer hover:underline">
              Click to receive
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
