import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useFetchData from "../Hook/useFetchData";
import { GetRestaurant } from "../Route";

export default function Search(props) {
  const [Restaurant, setRestaurant] = useFetchData(GetRestaurant);
  const [filter, setFilter] = useState("");
  const handleSearch = (event) => {
    props.searchResult(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        name="search"
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
