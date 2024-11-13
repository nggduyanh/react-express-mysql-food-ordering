import SpecificComment from "./SpecificComment";
import Toggle from "../../Function/Toggle/LayoutToggle";
import { useEffect, useId, useRef, useState } from "react";
import {
  getCommentForSpecificFood,
  localStaticFile,
  refreshPage,
  setCommendForSpecificFood,
  updateCommendForSpecificFood,
} from "../../Route";

import { FaImages } from "react-icons/fa";
import { MdCommentsDisabled } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import { useOutletContext } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
export default function ListComment({ sellerInfor, foodDetails }) {
  const { userData, tokenValue } = useOutletContext();
  const [error, setError] = useState("");
  const [isComment, setIsComment] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [rating, setRating] = useState(0);
  const imgRef = useRef(null);
  const [Comments, setComments] = useState({
    MaNguoiMua: userData.MaNguoiDung,
    MaMonAn: foodDetails.MaMonAn,
    noiDung: "",
    diem: "",
    HienThi: 1,
    AnhDinhKem: [],
    AnhDinhKemTemp: [],
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
        console.log("Comment data[0]", data[0].NhanXet);
        setListComments(data[0].NhanXet);
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
      const dataToSend = {
        ...Comments,
        AnhDinhKemTemp: Comments.AnhDinhKemTemp.map((image) => image.url),
        AnhDinhKem: Comments.AnhDinhKem.map((image) => image.file),
      };
      const formCommentData = new FormData();
      dataToSend.AnhDinhKem.forEach((file) => {
        formCommentData.append(`AnhDinhKem`, file);
      });
      formCommentData.append("MaNguoiMua", userData.MaNguoiDung);
      formCommentData.append("MaMonAn", foodDetails.MaMonAn);
      formCommentData.append("noiDung", dataToSend.noiDung);
      formCommentData.append("HienThi", dataToSend.HienThi);
      formCommentData.append("diem", dataToSend.diem);
      // for (let pair of formCommentData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      const response = await toast.promise(
        axios.post(setCommendForSpecificFood, formCommentData, {
          headers: {
            "Content-Type": "multipart/form-data",
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
    // setRating(filterUserComment?.[0]?.Diem);
    console.log(rating);
    if (Comments.noiDung.trim().length === 0) {
      toast.error("Please fullfile your response and star ");
      return;
    } else {
      toast.promise(
        (async () => {
          // await new Promise((resolve) => setTimeout(resolve, 1000));
          const dataToSend = {
            ...Comments,
            AnhDinhKemTemp: Comments.AnhDinhKemTemp.map((image) => image.url),
            AnhDinhKem: Comments.AnhDinhKem.map((image) => image.file),
          };
          const formCommentData = new FormData();
          dataToSend.AnhDinhKem.forEach((file) => {
            formCommentData.append(`AnhDinhKem`, file);
          });
          formCommentData.append("MaNguoiMua", userData.MaNguoiDung);
          formCommentData.append("MaMonAn", foodDetails.MaMonAn);
          formCommentData.append("noiDung", dataToSend.noiDung);
          formCommentData.append("HienThi", dataToSend.HienThi);
          const response = await axios.patch(
            updateCommendForSpecificFood,
            formCommentData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
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
    }
  };
  useEffect(() => {
    const checkList = listComments?.some((comment) => {
      return comment.MaNguoiMua === userData.MaNguoiDung;
    });
    if (checkList) {
      setIsComment(true);
    } else setIsComment(false);
  }, [listComments]);
  const changeRating = (newRating) => {
    setComments((prevComments) => {
      return {
        ...prevComments,
        diem: newRating,
      };
    });
    setRating(newRating);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const imageId = `${file.name}-${Date.now()}`;
    setComments((prevComments) => {
      return {
        ...prevComments,
        AnhDinhKemTemp: [
          ...prevComments.AnhDinhKemTemp,
          {
            id: imageId,
            url: imageUrl,
          },
        ],
        AnhDinhKem: [
          ...prevComments.AnhDinhKem,
          {
            id: imageId,
            file: file,
          },
        ],
      };
    });
  };
  const handleRemoveImage = (id) => {
    setComments((prevComments) => {
      const updatedImages = prevComments.AnhDinhKemTemp.filter(
        (image) => image.id !== id
      );

      // Tìm và thu hồi URL của ảnh đã xóa
      const removedImage = prevComments.AnhDinhKemTemp.find(
        (image) => image.id === id
      );
      if (removedImage) {
        URL.revokeObjectURL(removedImage.url);
      }

      const updatedAnhDinhKem = prevComments.AnhDinhKem.filter(
        (image) => image.id !== id
      );

      return {
        ...prevComments,
        AnhDinhKemTemp: updatedImages,
        AnhDinhKem: updatedAnhDinhKem,
      };
    });
  };
  return (
    <div>
      <div className="border bg-white border-pink-300 p-3 rounded-lg mt-2">
        <div className="EnterComment  border rounded-xl border-gray-500 mb-4">
          <div className=" flex relative justify-between p-3">
            <div className="avatar">
              {userData.AnhNguoiDung !== null ? (
                <img
                  src={localStaticFile + userData.AnhNguoiDung}
                  alt=""
                  className="w-full h-14"
                />
              ) : (
                <img src="/avatar.png" alt="" className="w-16 h16 " />
              )}
            </div>
            <div className="comment w-11/12 ">
              {Comments.AnhDinhKemTemp.length > 0 && (
                <div className="flex items-center gap-2">
                  {Comments.AnhDinhKemTemp.map((image) => {
                    return (
                      <div key={image.id} className="relative">
                        <img
                          key={image}
                          src={image.url}
                          alt=""
                          className="h-20 w-20 rounded-lg"
                        />
                        <div className="absolute -top-2 right-0">
                          <IoCloseCircleSharp
                            onClick={() => handleRemoveImage(image.id)}
                            className="text-red-500 bg-white rounded-full text-xl cursor-pointer"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
                className=" rounded-lg mt-2 border border-gray-400 w-full resize-none px-2 h-20 block"
              ></textarea>
              <div className="flex items-center gap-3">
                <label htmlFor="star" className="font-bold">
                  Star:{" "}
                </label>
                <StarRatings
                  rating={rating}
                  starRatedColor="gold"
                  starHoverColor="gold"
                  changeRating={
                    isComment || isUpdated || error.status === 403
                      ? null
                      : changeRating
                  }
                  numberOfStars={5}
                  starDimension="20px" // Kích thước sao
                  starSpacing="5px"
                  name="rating"
                />
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    name="AnhNguoiDungShow"
                    id="fileInput"
                    accept="image/*"
                    className="hidden"
                    ref={imgRef}
                    onChange={handleImageChange}
                  />
                  <button
                    className=" text-lg "
                    onClick={() => imgRef.current.click()}
                  >
                    <FaImages />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="commentButton flex items-center justify-end mr-2 mb-3 ">
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
          </div>
        </div>
        <div className="list">
          {listComments.length !== 0 ? (
            <div>
              {listComments
                .map((comment) => {
                  return (
                    <SpecificComment
                      MaMonAn={foodDetails?.MaMonAn}
                      checkUpdate={(boolValue, ratingScore) => {
                        setIsUpdated(!boolValue);
                        setRating(ratingScore);
                      }}
                      seller={sellerInfor}
                      key={comment?.MaNguoiDung}
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
                              MaMonAn={foodDetails?.MaMonAn}
                              checkUpdate={(boolValue) => {
                                setIsComment(boolValue);
                                setIsUpdated(!boolValue);
                              }}
                              key={comment?.MaNguoiDung}
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
