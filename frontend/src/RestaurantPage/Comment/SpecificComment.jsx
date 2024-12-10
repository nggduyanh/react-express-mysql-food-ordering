import { TiStarFullOutline } from "react-icons/ti";
import avatar from "../../assets/avatar.png";
import {
  customBadWords,
  formatDate,
  getCommentForSpecificFood,
  localStaticFile,
  refreshPage,
} from "../../Route";
import { BsThreeDotsVertical } from "react-icons/bs";
import Toggle from "../../Function/Toggle/LayoutToggle";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useOutletContext, useParams } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Filter } from "bad-words";
import axios from "axios";
export default function SpecificComment({
  seller,
  MaMonAn,
  checkUpdate,
  ...comment
}) {
  const { userData, tokenValue } = useOutletContext();
  const [showFixComment, setshowFixComment] = useState(false);
  const [ReportComment, setReportComment] = useState(false);
  const commentRef = useRef(null);
  const [showImg, setShowImg] = useState(false);
  const filter = new Filter({
    list: customBadWords,
  });
  const cleanedContent = filter.clean(comment.NoiDung);
  const [imgData, setImageData] = useState("");
  const nameRestaurant = useParams();
  const handleSetFixComment = async () => {
    const response = await axios.get(getCommentForSpecificFood + `${MaMonAn}`, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    });
    const data = response.data;
    const filterUserComment = data?.[0]?.NhanXet.filter((user) => {
      return user.MaNguoiMua === userData.MaNguoiDung;
    });
    console.log("filterUserComment", filterUserComment);
    // console.log("data", data?.[0]?.NhanXet?.[0]);
    checkUpdate(false, filterUserComment?.[0]?.Diem);
  };
  const handleShowBtn = (event) => {
    event.stopPropagation();
    const getIdUser = comment.MaNguoiMua;
    if (userData.MaNguoiDung === getIdUser) {
      setshowFixComment((prevShow) => !prevShow);
    } else {
      setReportComment(true);
    }
  };
  const reportComment = (event) => {
    event.stopPropagation();
    const reportPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(reportPromise, {
      loading: "Wait for sent...",
      success: () => {
        setTimeout(() => {
          refreshPage();
        }, 1000);
        return "Your reports has been received";
      },
      error: "An unexpected error occurred",
    });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setshowFixComment(false);
        setReportComment(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [comment.MaNguoiDung]);
  return (
    <div ref={commentRef}>
      <div className="User_Reply flex gap-3 border p-3 rounded-xl border-gray-400 my-3 relative">
        {showImg && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 rounded-lg  bg-black text-white w-1/3 h-1/2">
            <img
              src={localStaticFile + imgData}
              alt=""
              className="w-full h-full  border border-pink-500 object-fill"
            />
            <div className="">
              <IoCloseCircleSharp
                onClick={() => {
                  setImageData("");
                  setShowImg(false);
                }}
                className="fixed top-0 right-0 text-3xl cursor-pointer bg-white rounded-full text-red-500"
              />
            </div>
          </div>
        )}
        {comment.AnhNguoiDung !== null ? (
          <img
            src={localStaticFile + comment.AnhNguoiDung}
            alt=""
            className="h-10 w-10 border border-pink-500 rounded-full "
          />
        ) : (
          <img
            src={avatar}
            alt=""
            className="h-10 w-10 border border-pink-500 rounded-full"
          />
        )}

        <div className="userInfo w-full ">
          {comment.AnhNhanXet.length > 0 && (
            <div className="flex items-center gap-3">
              {comment.AnhNhanXet.map((image, index) => {
                return (
                  <img
                    key={image}
                    src={localStaticFile + image}
                    alt=""
                    onClick={() => {
                      setShowImg(true);
                      setImageData(image);
                    }}
                    className="h-20 w-20 rounded-lg border border-pink-500 cursor-pointer"
                  />
                );
              })}
            </div>
          )}

          <div className="flex w-full justify-between items-center">
            <p>{comment.TenNguoiDung}</p>
            <p className="flex items-center">
              {comment.Diem} <TiStarFullOutline className="text-yellow-500" />
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={handleShowBtn}
              />
            </p>
          </div>
          <i className="text-xs">
            Created: {formatDate(String(comment.ThoiGianTao))}
          </i>
          <p>{cleanedContent}</p>
        </div>
        {showFixComment && (
          <div
            onClick={handleSetFixComment}
            className="absolute right-8 -top-3 bg-white border border-pink-500 p-3 rounded-lg cursor-pointer hover:bg-pink-500 hover:text-white duration-150 ease-in"
          >
            <p>Update comment</p>
          </div>
        )}
        {ReportComment && (
          <div
            onClick={reportComment}
            className="absolute right-8 -top-3 bg-white border border-pink-500 p-3 rounded-lg cursor-pointer hover:bg-pink-500 hover:text-white duration-150 ease-in"
          >
            <p>Report this comment</p>
          </div>
        )}
      </div>
      {comment.TraLoi && comment.TraLoi.length > 0 && (
        <Toggle>
          <Toggle.On>
            <div className="seller_reply ml-10 flex gap-3 border p-3 rounded-xl border-gray-400 mb-4">
              {seller.AnhNguoiBan !== null &&
              seller.AnhNguoiBan !== undefined ? (
                <img
                  src={localStaticFile + seller.AnhNguoiBan}
                  alt=""
                  className="h-10 w-10"
                />
              ) : (
                <img src={avatar} alt="" className="h-10 w-10" />
              )}
              <div className="userInfo w-full">
                <div className="flex w-full justify-between items-center">
                  <p className="text-pink-500 font-bold">
                    {nameRestaurant.resname.slice(1)}
                  </p>
                </div>
                <i className="text-xs">11-12-2002</i>
                <p>{comment.TraLoi}</p>
              </div>
            </div>
          </Toggle.On>
          <Toggle.Button>
            <Toggle.Off>
              <p className="cursor-pointer flex justify-center underline text-pink-500">
                Show reply
              </p>
            </Toggle.Off>
            <Toggle.On>
              <p className="cursor-pointer flex justify-center underline text-pink-500">
                Hide reply
              </p>
            </Toggle.On>
          </Toggle.Button>
        </Toggle>
      )}
    </div>
  );
}
