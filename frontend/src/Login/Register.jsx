import { useState } from "react";
import videoRegister from "../assets/food_register.mp4";
import { Link } from "react-router-dom";
export default function Register() {
    const [RegisterForm, setRegisterForm] = useState({
        phoneNumber: "",
        email: "",
        password: "",
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterForm(prevForm => {
            return {
                ...prevForm,
                [name]: value,
            }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
       console.log(RegisterForm);
    }

    return (
        <div className="flex">
            <video loop autoPlay muted id="login_video" className="w-1/2 h-screen object-cover">
                <source src={videoRegister} type="video/mp4" />
                Your browser does not support video tag
            </video>

            <div className="w-1/2 flex flex-col justify-center px-24">
                <strong className="text-4xl mb-3 block">Hello there</strong>
                <p className="mb-3">Sign in to continue</p>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="phoneNumber" className="text-xs">Phone number</label><br />
                    <input className="input_setup" type="text" placeholder="Enter Phone Number" id="phoneNumber" onChange={handleChange} name="phoneNumber" value={RegisterForm.phoneNumber} /><br />
                    <label htmlFor="email" className="text-xs">Email</label><br />
                    <input className="input_setup" type="text" placeholder="Enter email" id="phoneNumber" onChange={handleChange} name="email" value={RegisterForm.email} /><br />
                    <label htmlFor="password" className="text-xs">Password</label><br />
                    <input className="input_setup" type="password" placeholder="Enter password" id="password" onChange={handleChange} name="password" value={RegisterForm.password} /><br />
                    <button className={` btnLoginRegister bg-gradient-to-r from-cyan-500 to-blue-400 `}>Register</button>
                </form>
                <div className="text-center mt-3">
                    <p>Already has account? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        </div>
    )
}