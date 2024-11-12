import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SideLink(props) {
  const [isOpen, setIsOpen] = useState(false);
  const list = props.list?.map((prop) => {
    return (
      <Link
        to={prop?.[1]}
        className="py-3 px-2 mt-1 hover:bg-gray-200 hover:rounded-lg flex items-center"
      >
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.1" cy="12.1" r="1"></circle>
        </svg>
        <label htmlFor="">{prop?.[0]}</label>
      </Link>
    );
  });
  return (
    <div>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg "
      >
        <div className="relative flex items-center">
          <label htmlFor="">{props.label}</label>
          {!isOpen ? (
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ms-auto transition-all"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ms-auto transition-all rotate-180"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          )}
        </div>
      </div>
      {isOpen && <ul>{list}</ul>}
    </div>
  );
}
