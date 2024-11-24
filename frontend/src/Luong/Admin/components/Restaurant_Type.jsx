import { FaMinusCircle } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
export default function RestaurantType() {
  return (
    <div>
      <p className="text-2xl font-bold ">List of restaurant types: </p>
      <br />
      <div className="flex items-center gap-4 flex-wrap ">
        <div className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-xl gap-3">
          <GrUpdate className="cursor-pointer" />
          <p className="">Chicken</p>
          <FaMinusCircle className="cursor-pointer" />
        </div>
        <div className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-xl gap-3">
          <GrUpdate className="cursor-pointer" />
          <p className="">Chicken</p>
          <FaMinusCircle className="cursor-pointer" />
        </div>
        <div className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-xl gap-3">
          <GrUpdate className="cursor-pointer" />
          <p className="">Chicken</p>
          <FaMinusCircle className="cursor-pointer" />
        </div>
        <div className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-xl gap-3">
          <GrUpdate className="cursor-pointer" />
          <p className="">Chicken</p>
          <FaMinusCircle className="cursor-pointer" />
        </div>
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Enter your restaurant type"
          className="border border-blue-500 w-full rounded-lg p-3"
        />
        <div className="flex items-center justify-end">
          <button className="bg-blue-500 text-white py-2 rounded-xl mt-4 px-4">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
