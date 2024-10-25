import SpecificComment from "./SpecificComment";
import Toggle from "../../Function/Toggle/LayoutToggle";
import { useContext, useEffect, useState } from "react";
import { UserAccount } from "../../App";
import {
  getCommentForSpecificFood,
  localStaticFile,
  setCommendForSpecificFood,
} from "../../Route";
import { MdCommentsDisabled } from "react-icons/md";
import axios from "axios";
export default function ListComment({ foodDetails }) {
  const { userData } = useContext(
    UserAccount !== undefined ? UserAccount : " "
  );
  const [Comments, setComments] = useState({
    MaNguoiMua: userData.MaNguoiDung,
    MaMonAn: foodDetails.MaMonAn,
    noiDung: "",
    diem: "",
  });
  console.log(foodDetails.MaMonAn);
  const [listComments, setListComments] = useState([]);
  useEffect(() => {
    fetch(getCommentForSpecificFood + `${foodDetails.MaMonAn}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setListComments(data))
      .catch((err) => {
        if (err.message.includes("404")) {
          console.log(
            "Not Found (404): Đã không tìm thấy bình luận cho món ăn này."
          );
        } else {
          console.log("Another error", err.message);
        }
      });
  }, [foodDetails]);
  const handleComment = (event) => {
    const { name, value } = event.target;
    setComments((prevComments) => {
      return {
        ...prevComments,
        [name]: name === "diem" ? Number.parseFloat(value) : value,
      };
    });
  };
  const createComment = async () => {
    try {
      const response = await axios.post(
        setCommendForSpecificFood,
        JSON.stringify(Comments),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      alert("create message successfull");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Toggle>
      <div className="border bg-white border-pink-300 p-3 rounded-lg mt-2">
        <div className="EnterComment border rounded-xl border-gray-500 mb-4">
          <div className="placeToComment flex gap-1 justify-between p-3">
            <div className="avatar ">
              {userData.AnhNguoiDung !== null ? (
                <img
                  src={localStaticFile + userData.AnhNguoiDung}
                  alt=""
                  className="h-full"
                />
              ) : (
                <img src="/avatar.png" alt="" className="w-16 h-full" />
              )}
            </div>
            <div className="comment w-11/12">
              <textarea
                name="noiDung"
                id="comment"
                onChange={handleComment}
                placeholder="comment"
                className="border border-gray-500 w-full resize-none px-2 h-full"
              ></textarea>

              <div className="flex items-center gap-3">
                <label htmlFor="star" className="font-bold">
                  Star:{" "}
                </label>
                <input
                  type="text"
                  onChange={handleComment}
                  placeholder="from 1 to 5 "
                  name="diem"
                  id="star"
                  className="border border-pink-500 px-2 rounded-md "
                />
              </div>
            </div>
          </div>

          <div className="commentButton flex items-center justify-end mr-2 mb-3">
            <button
              onClick={createComment}
              className="bg-blue-300 text-white font-bold p-2 rounded-md hover:bg-blue-500 transition-all duration-200 ease-in"
            >
              Comment
            </button>
          </div>
        </div>
        <div className="list">
          {listComments.length !== 0 ? (
            <div>
              <SpecificComment />
              <Toggle.On>
                <div>
                  <SpecificComment />
                  <SpecificComment />
                  <SpecificComment />
                </div>
              </Toggle.On>
              <Toggle.Button className="w-full text-center cursor-pointer text-red-400">
                <Toggle.Off>Show reviews</Toggle.Off>
                <Toggle.On>Hide Reviews</Toggle.On>
              </Toggle.Button>
            </div>
          ) : (
            <div className="h-40 border border-gray-400 rounded-md ">
              <div className="flex justify-center items-center translate-y-3/4">
                <MdCommentsDisabled className="text-5xl text-gray-500" />
              </div>
              <p className="flex items-center justify-center translate-y-full mt-4 text-gray-500">
                No comment
              </p>
            </div>
          )}
        </div>
      </div>
    </Toggle>
  );
}
