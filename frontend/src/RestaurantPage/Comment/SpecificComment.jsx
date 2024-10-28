import { TiStarFullOutline } from "react-icons/ti";
import avatar from "../../assets/avatar.png";
import { formatDate, localStaticFile, refreshPage } from "../../Route";
import { BsThreeDotsVertical } from "react-icons/bs";
import Toggle from "../../Function/Toggle/LayoutToggle";
import { useContext, useEffect, useRef, useState } from "react";
import { UserAccount } from "../../App";
import toast from "react-hot-toast";
export default function SpecificComment({ checkUpdate, ...comment }) {
  const { userData } = useContext(UserAccount);
  const [showFixComment, setshowFixComment] = useState(false);
  const [ReportComment, setReportComment] = useState(false);
  const [fixComment, setFixComment] = useState({});
  const commentRef = useRef(null);
  const handleSetFixComment = () => {
    checkUpdate(false);
  };
  console.log("Nhanxet:", comment.NhanXet.ThoiGianTao);
  const handleShowBtn = (event) => {
    event.stopPropagation();
    const getIdUser = comment.NguoiDung.MaNguoiDung;
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
  }, [comment.NguoiDung.MaNguoiDung]);
  return (
    <div ref={commentRef}>
      <div className="User_Reply flex gap-3 border p-3 rounded-xl border-gray-400 mb-5 relative">
        {comment.NguoiDung.AnhNguoiDung !== null ? (
          <img
            src={localStaticFile + comment.NguoiDung.AnhNguoiDung}
            alt=""
            className="h-10 w-10 border border-pink-500 rounded-full"
          />
        ) : (
          <img
            src={avatar}
            alt=""
            className="h-10 w-10 border border-pink-500 rounded-full"
          />
        )}
        <div className="userInfo w-full ">
          <div className="flex w-full justify-between items-center">
            <p>{comment.NguoiDung.TenNguoiDung}</p>
            <p className="flex items-center">
              {comment.NhanXet.Diem}{" "}
              <TiStarFullOutline className="text-yellow-500" />
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={handleShowBtn}
              />
            </p>
          </div>
          <i className="text-xs">
            Created: {formatDate(String(comment.NhanXet.ThoiGianTao))}
          </i>
          <p>{comment.NhanXet.NoiDung}</p>
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
      {comment.NhannXet && comment.NhannXet.TraLoi !== null && (
        <Toggle>
          <Toggle.On>
            <div className="seller_reply ml-10 flex gap-3 border p-3 rounded-xl border-gray-400 mb-4">
              {comment.NguoiDung.AnhNguoiDung !== null ? (
                <img
                  src={localStaticFile + comment.NguoiDung.AnhNguoiDung}
                  alt=""
                  className="h-10 w-10"
                />
              ) : (
                <img src={avatar} alt="" className="h-10 w-10" />
              )}
              <div className="userInfo w-full">
                <div className="flex w-full justify-between items-center">
                  <p>Seller</p>
                </div>
                <i className="text-xs">11-12-2002</i>
                <p>You are Welcome</p>
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
