import React from "react";

export default function Heading(props) {
    return (
        <div className="w-full py-10 text-3xl font-semibold">
            <h1>{props.title}</h1>
        </div>
    )
}