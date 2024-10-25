import { Link } from "react-router-dom";
import { getLoveRestaurant, localStaticFile } from "../../Route";
import axios from "axios";
import { useContext } from "react";
import { UserAccount } from "../../App";

export default function ResMini(props) {
  const { userData } = useContext(UserAccount);
  const handleRemoveLove = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3030/nguoimua/nguoibanyeuthich/delete".JSON.stringyfy(
          {
            maNguoiMua: userData.maNguoiMua,
            maNguoiBan: props.maNguoiBan,
          }
        ),
        { header: "Content-Type: application/json", withCredentials: true }
      );
    } catch (err) {
      alert("Cannot delete love restaurants");
    }
  };
  return (
    <div className="">
      <div className="mb-3 flex items-center border border-gray-500 p-2 rounded-lg gap-4 justify-between  hover:border-pink-500 transition-all ease-in duration-300 ">
        <Link
          to={`/home/restaurant/:${props.TenNguoiBan}`}
          state={props}
          className="flex items-center gap-4"
        >
          {props.AnhNguoiBan !== null ? (
            <img
              src={localStaticFile + props.AnhNguoiBan}
              alt=""
              className="h-20 w-20"
            />
          ) : (
            <img src="/resDefault.jpg" alt="" className="h-20 w-20" />
          )}
          <div className="w-full">
            <p className="my-2 text-2xl font-bold">{props.TenNguoiBan}</p>
            <p className="my-2 text-gray-500 text-xs">
              {props.ThoiGianMoCua} - {props.ThoiGianDongCua}
            </p>
            <p>
              {" "}
              {props.DiaChi} - {props.ThanhPho}
            </p>
          </div>
        </Link>
        <button
          onClick={handleRemoveLove}
          className="bg-red-500 text-white font-bold uppercase hover:bg-red-700 p-2 rounded-lg transition-all ease-in duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
