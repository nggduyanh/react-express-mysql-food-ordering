import { FaSearch } from "react-icons/fa";
export default function Security() {
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
          <div className="bg-red-500 text-white block p-5 border border-red-200 rounded-r-xl rounded-br-none">
            <FaSearch />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
