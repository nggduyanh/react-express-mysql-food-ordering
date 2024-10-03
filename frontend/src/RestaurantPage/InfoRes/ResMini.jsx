import { Link } from "react-router-dom";

export default function ResMini() {
  return (
    <div className="mb-3 ">
      <Link
        to=""
        className="flex items-center border border-gray-500 p-2 rounded-lg gap-4 justify-between  hover:border-pink-500 transition-all ease-in duration-300"
      >
        <img src="/public/Food/foodImage.jpg" alt="" className="h-20 w-20" />
        <div className="w-full">
          <p className="my-2 text-2xl font-bold">3 sheeps restaurants</p>
          <p className="my-2 text-gray-500 text-xs">7:00 am - 19:00 pm</p>
          <p>4 Star</p>
        </div>
        <button className="bg-red-500 text-white font-bold uppercase hover:bg-red-700 p-2 rounded-lg transition-all ease-in duration-200">
          Delete
        </button>
      </Link>
    </div>
  );
}
