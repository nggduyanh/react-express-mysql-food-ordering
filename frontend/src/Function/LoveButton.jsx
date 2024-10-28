import { useContext, useEffect, useState } from "react";
import Toggle from "../Function/Toggle/LayoutToggle";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAccount } from "../App";
import axios from "axios";
import { addLoveRestaurant, getLoveRestaurant, refreshPage } from "../Route";
import toast, { Toaster } from "react-hot-toast";
export default function LoveButton({ idSeller }) {
  const { userData } = useContext(UserAccount);
  const [listOfLove, setListOfLove] = useState([]);

  const handleAddLove = async () => {
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
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
        return response;
      })(),
      {
        loading: "Adding favourite...",
        success: (response) => {
          setTimeout(() => {
            refreshPage();
          }, 500);
          return `Success favourite add: ${response.status}`;
        },
        error: (err) => `Error occured ${err.message}`,
      }
    );
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
      toast.success("Removed favourite successfully, wait to refresh!!", {
        style: {
          backgroundColor: "green",
          fontWeight: "bold",
          color: "white",
        },
      });
      setTimeout(() => {
        refreshPage();
      }, 2000);
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
    <Toggle>
      <div className="absolute top-0 right-0 p-2 m-2 text-lg text-pink-500 z-10 cursor-pointer border rounded-full border-white bg-white">
        {results === true ? (
          <Toggle.Button>
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
          </Toggle.Button>
        ) : (
          <Toggle.Button>
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
          </Toggle.Button>
        )}
      </div>
    </Toggle>
  );
}
