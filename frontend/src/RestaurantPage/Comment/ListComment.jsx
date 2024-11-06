import SpecificComment from "./SpecificComment";
import Toggle from "../../Function/Toggle/LayoutToggle";
import { useEffect, useState } from "react";
import {
  getCommentForSpecificFood,
  localStaticFile,
  refreshPage,
  setCommendForSpecificFood,
  updateCommendForSpecificFood,
} from "../../Route";
import { MdCommentsDisabled } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";

export default function ListComment({ foodDetails }) {
  const { userData, tokenValue } = useOutletContext();
  const [error, setError] = useState("");
  const [isComment, setIsComment] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [Comments, setComments] = useState({
    MaNguoiMua: userData.MaNguoiDung,
    MaMonAn: foodDetails.MaMonAn,
    noiDung: "",
    diem: "",
    HienThi: 1,
  });
  const [listComments, setListComments] = useState([]);
  useEffect(() => {
    fetch(getCommentForSpecificFood + `${foodDetails.MaMonAn}`, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    })
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
          setError({
            status: 404,
            title: "không tìm thấy bình luận cho món ăn này.",
          });
          setListComments([]);
        } else if (err.message.includes("403")) {
          setError({
            status: 403,
            title: "You are forbidden to see comment on this",
          });
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
    if (
      Comments.noiDung.trim().length === 0 &&
      Comments.diem.trim().length === 0
    ) {
      toast.error("Please fullfile your response and star ");
      return;
    }
    try {
      const response = await toast.promise(
        axios.post(setCommendForSpecificFood, Comments, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
          withCredentials: true,
        }),
        {
          loading: "Create commennt...",
          success: (response) => {
            const success = `Create commemt successfully: ${response.status}`;
            setTimeout(() => {
              refreshPage();
            }, 1000);
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
  const updateComment = async () => {
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.patch(
          updateCommendForSpecificFood,
          Comments,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
            withCredentials: true,
          }
        );
      })(),
      {
        loading: "Updatting...",
        success: () => {
          setTimeout(() => {
            refreshPage();
          }, 1000);
          return "Update comments successful";
        },
        error: (err) => err.message || "An unexpected error occurred",
      }
    );
  };
  useEffect(() => {
    const checkList = listComments?.some((comment) => {
      return comment.NhanXet.MaNguoiMua === userData.MaNguoiDung;
    });
    if (checkList) {
      setIsComment(true);
    } else setIsComment(false);
  }, [listComments]);
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
                  (isComment && !isUpdated) || error.status === 403
                    ? "You arlready comment this or you're banned to comment"
                    : "comment"
                }
                disabled={(isComment && !isUpdated) || error.status === 403}
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
                  disabled={(isComment && !isUpdated) || error.status === 403}
                  className="border border-pink-500 px-2 rounded-md "
                />
              </div>
            </div>
          </div>

          <div className="commentButton flex items-center justify-end mr-2 mb-3">
            {error.status === 403 ? (
              <button
                disabled
                className="bg-gray-300 text-white font-bold p-2 rounded-md cursor-not-allowed"
              >
                You are forbidden to comment
              </button>
            ) : isComment ? (
              isUpdated ? (
                <button
                  onClick={updateComment}
                  className="bg-blue-300 text-white font-bold p-2 rounded-md hover:bg-blue-500 transition-all duration-200 ease-in"
                >
                  Update
                </button>
              ) : (
                <button
                  disabled
                  className="bg-blue-300 text-white font-bold p-2 rounded-md"
                >
                  You cannot comment
                </button>
              )
            ) : (
              <button
                onClick={createComment}
                className="bg-blue-300 text-white font-bold p-2 rounded-md hover:bg-blue-500 transition-all duration-200 ease-in"
              >
                Comment
              </button>
            )}
            {/* {isComment || error.status === 403 ? (
              <button
                disabled={isComment}
                onClick={createComment}
                className={`bg-blue-300 text-white font-bold p-2 rounded-md ${
                  isComment
                    ? "hover:bg-blue-500 transition-all duration-200 ease-in"
                    : ""
                } `}
              >
                You cannot comment
              </button>
            ) : (
              <button
                disabled={isComment}
                onClick={createComment}
                className={`bg-blue-300 text-white font-bold p-2 rounded-md ${
                  !isComment
                    ? "hover:bg-blue-500 transition-all duration-200 ease-in"
                    : ""
                } `}
              >
                comment
              </button>
            )}
            {isUpdated && (
              <button
                onClick={updateComment}
                className={`bg-blue-300 text-white font-bold p-2 rounded-md ${
                  isComment
                    ? "hover:bg-blue-500 transition-all duration-200 ease-in"
                    : ""
                } `}
              >
                Update
              </button>
            )} */}
          </div>
        </div>
        <div className="list">
          {listComments.length !== 0 ? (
            <div>
              {listComments
                .map((comment) => {
                  return (
                    <SpecificComment
                      checkUpdate={(boolValue) => {
                        setIsUpdated(!boolValue);
                      }}
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
                      {listComments
                        .map((comment) => {
                          return (
                            <SpecificComment
                              checkUpdate={(boolValue) => {
                                setIsComment(boolValue);
                                setIsUpdated(!boolValue);
                              }}
                              key={comment.NguoiDung.MaNguoiDung}
                              {...comment}
                            />
                          );
                        })
                        .slice(5)}
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
                {error.title}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
