import { FaUsers } from "react-icons/fa";

export default function TotalInfor({ children, isAdmin }) {
  return (
    <div
      className={`p-4 border border-blue-500 ${
        isAdmin ? "w-60" : "w-72"
      } h-44 rounded-xl flex flex-col justify-between`}
    >
      <div className="amount_user flex justify-between items-center   ">
        <div>{children}</div>
        <div className="border border-blue-500 text-white font-bold bg-blue-500 p-3 rounded-full">
          <FaUsers className="text-3xl " />
        </div>
      </div>
      <p className="">
        {" "}
        <span className="text-green-500 font-bold">12%</span> since last month
      </p>
    </div>
  );
}
