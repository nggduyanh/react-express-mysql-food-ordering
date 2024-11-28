import { useState } from "react";
export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex flex-col items-center w-[340px] h-340px rounded-lg">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-blue-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
      >
        Dropdown
        {!isOpen ? (
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="css-8mmkcg"
          >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
          </svg>
        ) : (
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="css-8mmkcg"
          >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full">
          {list.map((item, i) => (
            <div
              className="flex w-full justify-between p-4 hover:bg-blue-300 cusor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
              key={i}
            >
              <h3>{item.city}</h3>
              <h3>{item.emoticon}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
