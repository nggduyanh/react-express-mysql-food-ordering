import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiKeyboard } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { recoverpassword, verifyOTP } from "../../Route";

export default function ConfirmCode() {
  const data = useLocation();
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();
  const [confirmCode, setConfirmCode] = useState({
    number1: "",
    number2: "",
    number3: "",
    number4: "",
    number5: "",
    number6: "",
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
  const handleNumberForm = async (event) => {
    event.preventDefault();
    console.log(confirmCode);
    if (
      confirmCode.number1 === "" ||
      confirmCode.number2 === "" ||
      confirmCode.number3 === "" ||
      confirmCode.number4 === "" ||
      confirmCode.number5 === "" ||
      confirmCode.number6 === ""
    ) {
      toast.error("Please fullfill the number");
    } else {
      const number6digit = Number.parseInt(
        confirmCode.number1 +
          confirmCode.number2 +
          confirmCode.number3 +
          confirmCode.number4 +
          confirmCode.number5 +
          confirmCode.number6
      );
      toast.promise(
        (async () => {
          const response = await axios.post(verifyOTP, {
            SoDienThoai: data.state.resetForm.SoDienThoai,
            OTP: number6digit,
          });
          if (response.status === 200) {
            const data = response.data;
            navigate("/forgot-password/create-new", {
              state: { data },
              replace: true,
            });
          }
        })(),
        {
          loading: "Waiting to find your account....",
          success: "Success",
          error:
            "Your code is expired or something went wrong, please try again or get a new code",
        }
      );
    }
  };
  useEffect(() => {
    if (timeLeft === 0) {
      toast.error(
        "Your code is expired or something went wrong, please try again or get a new code"
      );
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  const receiveAgain = () => {
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.post(
          recoverpassword,
          data.state.resetForm,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 201) {
          const data = response.data;
          setTimeLeft(30);
          setConfirmCode((prevForm) => {
            return {
              number1: "",
              number2: "",
              number3: "",
              number4: "",
              number5: "",
              number6: "",
            };
          });
        } else {
          console.log("Something went wrong");
        }
      })(),
      {
        loading: "Waiting for your new code...",
        success: "Success",
        error: "Something went wrong",
      }
    );
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="border mb-3 border-white p-3 rounded-lg bg-pink-200">
          <CiKeyboard className="text-4xl text-pink-500" />
        </div>
        <p className="text-4xl font-bold">Enter confirmation code</p>
      </div>
      <form onSubmit={handleNumberForm} className="text-center mt-4">
        <p>We sent a code to abc@gmail.com</p>
        <div className="Code  mt-3">
          <input
            name="number1"
            type="number"
            value={confirmCode.number1}
            max="9"
            onChange={handleNumberChange}
            style={{
              appearance: "textfield",
              MozAppearance: "textfield",
              WebkitAppearance: "none",
            }}
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            name="number2"
            type="number"
            value={confirmCode.number2}
            max="9"
            onChange={handleNumberChange}
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            name="number3"
            type="number"
            value={confirmCode.number3}
            max="9"
            onChange={handleNumberChange}
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            name="number4"
            type="number"
            value={confirmCode.number4}
            max="9"
            onChange={handleNumberChange}
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            name="number5"
            type="number"
            value={confirmCode.number5}
            max="9"
            onChange={handleNumberChange}
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
          <input
            name="number6"
            type="number"
            value={confirmCode.number6}
            max="9"
            onChange={handleNumberChange}
            className="border border-black w-20 h-20 mx-2 rounded-lg text-5xl text-center"
          />
        </div>
        <button className="mt-3 inline-block w-full bg-pink-500 p-3 rounded-lg text-white font-bold hover:bg-pink-700 transition-all duration-200 ease-in">
          Continue
        </button>
        <div>
          <p className="text-red-500 font-bold py-2 text-xl">
            Countdown: {timeLeft} seconds
          </p>
        </div>
        <div>
          <p>
            Didnt receive the email or the code is expired ?{" "}
            <span
              onClick={receiveAgain}
              className="text-pink-500 font-bold cursor-pointer hover:underline"
            >
              Click to receive
            </span>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
