import { useState } from "react";
import videoLogin from "../assets/food_login.mp4";
import { Link, Navigate } from "react-router-dom";
export default function Login() {
    const [loginForm, setLoginForm] = useState({
        phoneNumber: "",
        password: "",
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginForm(prevForm => {
            return {
                ...prevForm,
                [name]: value,
            }
        })
    }
    console.log(loginForm);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("hello");
        <Navigate state={true} to="..
        \" />
        // if(loginForm.phoneNumber !== undefined && loginForm.password !== undefined){
        //     alert("Please enter full field")
        // }
        // else {
        //     alert(loginForm);
        // }
    }

    return (
        <div className="flex">
            <video loop autoPlay muted id="login_video" className="w-1/2 h-screen object-cover">
                <source src={videoLogin} type="video/mp4" />
                Your browser does not support video tag
            </video>

            <div className="w-1/2 flex flex-col justify-center px-24">
                <strong className="text-4xl mb-3 block">Welcome back</strong>
                <p className="mb-3">Sign in to continue</p>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="phoneNumber" className="text-xs">Phone number</label><br />
                    <input className="input_setup" type="text" placeholder="Enter Phone Number" id="phoneNumber" onChange={handleChange} name="phoneNumber" value={loginForm.phoneNumber} /><br />
                    <label htmlFor="password" className="text-xs">Password</label><br />
                    <input className="input_setup" type="password" placeholder="Enter password" id="password" onChange={handleChange} name="password" value={loginForm.password} /><br />
                    <button className={` btnLoginRegister bg-gradient-to-r from-pink-500 to-pink-600 `}>Sign in</button>
                </form>
                <div className="text-center mt-3">
                    <button className="mb-5">Forgot your password?</button>
                    <p>You do not have an account? <Link to="/register">Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}