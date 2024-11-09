import { useState } from "react";
import { CiKeyboard } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function ConfirmCode() {
  const [confirmCode, setConfirmCode] = useState({
    number1: "",
    number2: "",
    number3: "",
    number4: "",
  });
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setConfirmCode((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };
  const handleNumberForm = (event) => {
    event.preventDefault();
    console.log(confirmCode);
  };
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
        <form onSubmit={handleNumberForm} className="Code  mt-3">
          <input
            name="number1"
            type="text"
            value={confirmCode.number1}
            onChange={handleNumberChange}
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            name="number2"
            type="text"
            value={confirmCode.number2}
            onChange={handleNumberChange}
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            name="number3"
            type="text"
            value={confirmCode.number3}
            onChange={handleNumberChange}
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            name="number4"
            type="text"
            value={confirmCode.number4}
            onChange={handleNumberChange}
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
        </form>
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
