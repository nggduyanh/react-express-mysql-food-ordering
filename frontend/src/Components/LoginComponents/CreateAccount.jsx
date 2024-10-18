import React from "react";
import { Link } from "react-router-dom";

export default function CreateAccount(props) {
    return (
        <div className="mt-16 text-lg mx-auto">
            <p> {props.text}
                <Link  className="ml-1 text-[#F58220]">{props.link}</Link>
            </p>
        </div>
    )
}