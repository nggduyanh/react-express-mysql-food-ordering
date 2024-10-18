import React from "react";
import { Link } from "react-router-dom";

import Layout from "../Components/LoginComponents/Layout";

export default function Signin() {
    return (
        <Layout
            title = "Sign In"
            btntext = "Sign In"
            linktext = "Don't have an account?"
            link = "Sign Up"
        />
    )
}