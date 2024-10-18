import React from "react";

export default function Form(props) {
    return (
        <div className="flex flex-col w-full mb-4">
            <label htmlFor={props.name} className="pb-2 font-medium">{props.label}</label>
            <input type={props.type} name={props.name} id={props.id} className="w-full py-2.5 px-3 rounded p" placeholder={props.label} />
        </div>
    )
}