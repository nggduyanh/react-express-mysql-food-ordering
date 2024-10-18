import React from "react";

export default function Button(props){
    return (
        <button className="w-full mt-4 py-3 px-6 bg-[#F58220] rounded font-medium text-white">{props.text}</button>
    )
}