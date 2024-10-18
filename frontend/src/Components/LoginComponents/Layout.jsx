import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Heading from "./Heading";
import Form from "./Form";
import Button from "./Button";
import Account from "./Account";
import SocialLogin from "./SocialLogin";
import CreateAccount from "./CreateAccount";
import SigninFormData from "./Reuses/SigninFormData";

export default function Layout(props){
    const signinform = SigninFormData.map(item => {
        return (
            <Form
                key = {item.id}
                {...item}
            />
        )
    })    
    return (
        <div className="relative h-screen w-screen items-center justify-center bg-gradient-to-b from-customColor1 via-customColor1 to-customColor2 ">
            <div className="absolute w-full top-1/2 transform -translate-y-1/2">
                <img src="./images/bg-cus.png" alt="" className="w-full" />
            </div>
            <div className="absolute right-0">
                <img src="./images/bg-food.png" alt="" className="" />
            </div>
            <div className="absolute flex flex-col h-auto w-[512px] top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <Logo />
                <Heading 
                    title = {props.title}
                />
                {signinform}
                <Link className="underline ml-auto">Forgot Password?</Link>
                <Button 
                    text = {props.btntext}
                />
                <Account />
                <SocialLogin />
                <CreateAccount 
                    text = {props.linktext}
                    link = {props.link}
                />

            </div>
            <Link to="/home">Nhap vao day de chuyen sang trang Homepage</Link>
        </div>
        
    )
}