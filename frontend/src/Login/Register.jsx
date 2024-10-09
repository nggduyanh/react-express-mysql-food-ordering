import { useReducer } from "react";
import videoRegister from "../assets/food_register.mp4";
import { Link, Navigate } from "react-router-dom";
import { GetUserInfo } from "../Route";
import api from "../Route/api";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX =
  /^(0[3|5|7|8|9][0-9]{8}|(01[2|6|8|9]|09[0-9]|[3|5|7|8|9][0-9])[0-9]{8})$/;
const RegisterAction = {
  inputError: "",
  form: {
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
  },
};
const RegisterReducer = (state, action) => {
  switch (action.type) {
    case "inputValue": {
      const { name, value } = action.event.target;
      return {
        inputError: "",
        form: {
          ...state.form,
          [name]: value,
        },
      };
    }
    case "submitValue": {
      try {
        let errorNotifcation = "";
        if (!USER_REGEX.test(state.form.username))
          errorNotifcation += " username ";
        if (!PHONE_REGEX.test(state.form.phoneNumber))
          errorNotifcation += " phone number";
        if (!EMAIL_REGEX.test(state.form.email)) errorNotifcation += " email ";
        if (!PWD_REGEX.test(state.form.password))
          errorNotifcation += " password ";
        return {
          inputError: errorNotifcation,
          form: {
            ...state.form,
          },
        };
      } catch (err) {
        console.log(err);
      }
      return state;
    }
    default:
      return state;
  }
};
export default function Register() {
  const [RegisterForm, dispatch] = useReducer(RegisterReducer, RegisterAction);
  const handleChange = (e) => {
    dispatch({ type: "inputValue", event: e });
  };
  console.log(RegisterForm.form);
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "submitValue" });

    if (RegisterForm.inputError.length === 0) {
      await api.post(GetUserInfo, RegisterForm.form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      Navigate("/");
    } else {
      alert("Something went wrong please check: ", RegisterForm.inputError);
    }
  };

  return (
    <div className="flex">
      <video
        loop
        autoPlay
        muted
        id="login_video"
        className="w-1/2 h-screen object-cover"
      >
        <source src={videoRegister} type="video/mp4" />
        Your browser does not support video tag
      </video>

      <div className="w-1/2 flex flex-col justify-center px-24">
        <strong className="text-4xl mb-3 block">Hello there</strong>
        <p className="mb-3">Sign in to continue</p>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="username" className="text-xs">
            Username
          </label>
          <br />
          <input
            className="input_setup"
            type="text"
            placeholder="enter username"
            id="username"
            name="username"
            value={RegisterForm.form.username}
            onChange={handleChange}
          />
          <label htmlFor="phoneNumber" className="text-xs">
            Phone number
          </label>
          <br />
          <input
            className="input_setup"
            type="text"
            placeholder="Enter Phone Number"
            id="phoneNumber"
            onChange={handleChange}
            name="phoneNumber"
            value={RegisterForm.form.phoneNumber}
          />
          <br />
          <label htmlFor="email" className="text-xs">
            Email
          </label>
          <br />
          <input
            className="input_setup"
            type="text"
            placeholder="Enter email"
            id="email"
            onChange={handleChange}
            name="email"
            value={RegisterForm.form.email}
          />
          <br />
          <label htmlFor="password" className="text-xs">
            Password
          </label>
          <br />
          <input
            className="input_setup"
            type="password"
            placeholder="Enter password"
            id="password"
            onChange={handleChange}
            name="password"
            value={RegisterForm.form.password}
          />
          <br />
          <button
            className={` btnLoginRegister bg-gradient-to-r from-cyan-500 to-blue-400 `}
          >
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already has account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
