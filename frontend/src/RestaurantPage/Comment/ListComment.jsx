import SpecificComment from "./SpecificComment";
import Toggle from "../../Function/Toggle/LayoutToggle";
import { useContext, useEffect, useState } from "react";
import { UserAccount } from "../../App";
import {
  getCommentForSpecificFood,
  localStaticFile,
  refreshPage,
  setCommendForSpecificFood,
} from "../../Route";
import { MdCommentsDisabled } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ListComment({ foodDetails }) {
  const { userData } = useContext(
    UserAccount !== undefined ? UserAccount : " "
  );
  const [isComment, setIsComment] = useState(true);
  const [Comments, setComments] = useState({
    MaNguoiMua: userData.MaNguoiDung,
    MaMonAn: foodDetails.MaMonAn,
    noiDung: "",
    diem: "",
    HienThi: 1,
  });
  const [listComments, setListComments] = useState([]);
  useEffect(() => {
    fetch(getCommentForSpecificFood + `${foodDetails.MaMonAn}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setListComments(data);
        // const checkListComment = listComments.find((comment) => {
        //   return comment.NhanXet.MaNguoiMua === userData.MaNguoiDung;
        // });
        // console.log("checkListComment", checkListComment);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          console.log(
            "Not Found (404): Đã không tìm thấy bình luận cho món ăn này."
          );
          setListComments([]);
        } else {
          console.log("Another error", err.message);
        }
      });
  }, [foodDetails, userData.MaNguoiDung]);
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
      console.log(`Comment`, Comments);
      const response = await toast.promise(
        axios.post(setCommendForSpecificFood, Comments, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }),
        {
          loading: "Create commennt...",
          success: (response) => {
            const success = `Create commemt successfully: ${response.status}`;
            setTimeout(() => {
              refreshPage();
            }, 2000);
            return success;
          },
          error: (err) => `Error creating commennt: ${err.message}`,
        }
      );
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        toast.error("Bạn đã bình luận cho món ăn này rồi.");
      } else {
        toast.error(`Cannot comment: ${err.message}`);
      }
    }
  };
  const checkList = listComments?.some((comment) => {
    return comment.NhanXet.MaNguoiMua === userData.MaNguoiDung;
  });
  return (
    <div>
      <div className="border bg-white border-pink-300 p-3 rounded-lg mt-2">
        <div className="EnterComment border rounded-xl border-gray-500 mb-4">
          <div className="placeToComment flex justify-between p-3">
            <div className="avatar ">
              {userData.AnhNguoiDung !== null ? (
                <img
                  src={localStaticFile + userData.AnhNguoiDung}
                  alt=""
                  className="w-full h-14"
                />
              ) : (
                <img src="/avatar.png" alt="" className="w-16 h-full" />
              )}
            </div>
            <div className="comment w-11/12 ">
              <textarea
                name="noiDung"
                id="comment"
                onChange={handleComment}
                placeholder={
                  checkList ? "You arlready comment this" : "comment"
                }
                disabled={checkList}
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
                  disabled={checkList}
                  className="border border-pink-500 px-2 rounded-md "
                />
              </div>
            </div>
          </div>

          <div className="commentButton flex items-center justify-end mr-2 mb-3">
            <button
              disabled={checkList}
              onClick={createComment}
              className={`bg-blue-300 text-white font-bold p-2 rounded-md ${
                checkList
                  ? "hover:bg-blue-500 transition-all duration-200 ease-in"
                  : ""
              } `}
            >
              Comment
            </button>
          </div>
        </div>
        <div className="list">
          {listComments.length !== 0 ? (
            <div>
              {listComments
                .map((comment) => {
                  return (
                    <SpecificComment
                      key={comment.NguoiDung.MaNguoiDung}
                      {...comment}
                    />
                  );
                })
                .slice(0, 4)}

              {listComments.length > 4 && (
                <Toggle>
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
                </Toggle>
              )}
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
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              border: "2px solid gray",
              background: "green",
              color: "white",
              fontWeight: "bold",
            },
          },
          error: {
            style: {
              border: "2px solid gray",
              background: "red",
              color: "white",
              fontWeight: "bold",
            },
          },
          loading: {
            style: {
              border: "2px solid gray",
              background: "#D1006B",
              color: "white",
              fontWeight: "bold",
            },
          },
        }}
      />
    </div>
  );
}
