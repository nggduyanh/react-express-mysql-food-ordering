import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [filter, setFilter] = useState({
    search: "",
  });
  const handleSearch = () => {
    console.log("Hello");
  };
  return (
    <div className="flex items-center">
      <input
        type="text"
        name="search"
        value={filter.search}
        onChange={handleSearch}
        placeholder="Search"
        className="w-full border border-gray-500 p-3 rounded-l-lg"
      />
      <div className="bg-red-500 p-4 text-white text-lg rounded-r-lg cursor-pointer">
        <FaSearch className="" />
      </div>
    </div>
  );
}
