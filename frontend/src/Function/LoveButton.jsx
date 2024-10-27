import { useContext, useEffect, useState } from "react";
import Toggle from "../Function/Toggle/LayoutToggle";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAccount } from "../App";
import axios from "axios";
import { addLoveRestaurant, getLoveRestaurant, refreshPage } from "../Route";
import { toast, ToastContainer } from "react-toastify";
export default function LoveButton({ idSeller }) {
  const { userData } = useContext(UserAccount);
  const [listOfLove, setListOfLove] = useState([]);

  const handleAddLove = async () => {
    try {
      const response = await axios.post(
        addLoveRestaurant,
        JSON.stringify({
          maNguoiMua: userData.MaNguoiDung,
          maNguoiBan: idSeller,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Successfully added, wait to reload page", {
        autoClose: 1000,
        onClose: () => {
          refreshPage();
        },
      });
    } catch (err) {
      alert(err);
    }
  };
  const handleRemoveLove = async () => {
    try {
      console.log("Removing", userData.MaNguoiDung);
      const response = await axios.delete(
        "http://localhost:3030/nguoimua/nguoibanyeuthich/delete",
        {
          data: {
            MaNguoiMua: userData.MaNguoiDung,
            MaNguoiBan: idSeller,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Successfully remove, wait to reload page", {
        autoClose: 1000,
        onClose: () => {
          refreshPage();
        },
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetch(getLoveRestaurant + `${userData.MaNguoiDung}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No list of love restaurant");
        }
        return res.json();
      })
      .then((data) => setListOfLove(data))
      .catch((err) => {
        if (err.message.includes("404")) {
          console.error("Empty list of love restaurant");
        } else {
          console.log(err.message);
        }
      });
  }, []);
  const results = listOfLove.some((items) => {
    return items.MaNguoiBan === idSeller;
  });
  return (
    <Toggle.Button>
      <div className="absolute top-0 right-0 p-2 m-2 text-lg text-pink-500 z-10 cursor-pointer border rounded-full border-white bg-white">
        {results === true ? (
          <div>
            <div onClick={handleRemoveLove}>
              <Toggle.Off>
                <FaHeart className="text-red-500" />
              </Toggle.Off>
            </div>
            <div onClick={handleAddLove}>
              <Toggle.On>
                <FaRegHeart />
              </Toggle.On>
            </div>
            <ToastContainer position="top-center" />
          </div>
        ) : (
          <div>
            <div onClick={handleAddLove}>
              <Toggle.Off>
                <FaRegHeart />
              </Toggle.Off>
            </div>
            <div onClick={handleRemoveLove}>
              <Toggle.On>
                <FaHeart className="text-red-500" />
              </Toggle.On>
            </div>
          </div>
        )}
      </div>
    </Toggle.Button>
  );
}
