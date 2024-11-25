import { useState } from "react";
import { FaSearch } from "react-icons/fa";
export default function Security() {
  const [isClose, setIsClose] = useState(true);
  const handleDecetralization = () => {};
  return (
    <div>
      <p className="text-xl font-bold">Security</p>
      <br />
      <div>
        <div className="flex items-center">
          <input
            type="text"
            className="border border-gray-200 w-full rounded-l-xl rounded-bl-none p-4 bg-gray-200"
            placeholder="Enter user id you want to decentralization"
          />
          <div className="bg-red-500 cursor-pointer text-white block p-5 border border-red-200 rounded-r-xl rounded-br-none">
            <FaSearch />
          </div>
        </div>
        <div className="results border border-gray-300 mt-1 h-20 rounded-b-2xl">
          <p className="p-4 text-md text-gray-400">Enter to see results...</p>
        </div>
        <br />
        {!isClose && (
          <div className="fixed top-1/2 -translate-y-1/2 left-1/2 text-center -translate-x-1/2 w-1/4 h-1/6 bg-white rounded-lg border border-blue-500">
            <p className=" text-md p-2">
              Are you sure you want to{" "}
              <span className="text-red-500 font-bold">Decentralization</span>{" "}
              this <span className="text-blue-500 font-bold">user</span>?
            </p>
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={handleDecetralization}
                className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => setIsClose(true)}
                className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setIsClose(false)}
            className="bg-red-500 p-3 text-white font-bold rounded-xl hover:bg-red-700 transition-all ease-in duration-150"
          >
            Decentralization
          </button>
        </div>
      </div>
    </div>
  );
}
