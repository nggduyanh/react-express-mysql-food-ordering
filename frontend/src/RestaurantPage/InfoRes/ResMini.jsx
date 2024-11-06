import { Link, useOutletContext } from "react-router-dom";
import { getLoveRestaurant, localStaticFile, refreshPage } from "../../Route";
import axios from "axios";
import { useContext } from "react";
import { UserAccount } from "../../App";
import toast, { Toaster } from "react-hot-toast";
export default function ResMini(props) {
  const { userData, tokenValue } = useOutletContext();
  const handleRemoveLove = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3030/nguoimua/nguoibanyeuthich/delete",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenValue,
          },
          withCredentials: true,
          data: {
            MaNguoiMua: userData.MaNguoiDung,
            MaNguoiBan: props.MaNguoiBan,
          },
        }
      );
      toast.success("Removed favourite successfully, wait to refresh!!", {
        style: {
          backgroundColor: "green",
          fontWeight: "bold",
          color: "white",
        },
      });
      setTimeout(() => {
        refreshPage();
      }, 500);
    } catch (err) {
      toast.error(`Something went wrong: ${err.message}`);
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
          onClick={() => handleRemoveLove(props.MaNguoiBan)}
          className="bg-red-500 text-white font-bold uppercase hover:bg-red-700 p-2 rounded-lg transition-all ease-in duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
