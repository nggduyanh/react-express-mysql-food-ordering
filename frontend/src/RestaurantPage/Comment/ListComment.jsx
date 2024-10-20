import SpecificComment from "./SpecificComment";
import Toggle from "../../Function/Toggle/LayoutToggle";
import { useContext, useState } from "react";
import { UserAccount } from "../../App";
import { localStaticFile } from "../../Route";
export default function ListComment() {
  const { userData } = useContext(
    UserAccount !== undefined ? UserAccount : " "
  );
  const [Comments, setComments] = useState([]);
  return (
    <Toggle>
      <div className="border bg-white border-gray-300 p-3 rounded-lg">
        <div className="EnterComment border rounded-xl border-gray-300 mb-4">
          <div className="placeToComment flex gap-1 justify-between p-3">
            <div className="avatar ">
              {userData.AnhNguoiDung !== null ? (
                <img
                  src={localStaticFile + userData.AnhNguoiDung}
                  alt=""
                  className="w-14 h-full"
                />
              ) : (
                <img src="/avatar.png" alt="" className="w-14 h-full" />
              )}
            </div>
            <div className="comment w-11/12">
              <textarea
                name=""
                id=""
                placeholder="comment"
                className="border border-gray-500 w-full resize-none px-2 h-full"
              ></textarea>
            </div>
          </div>

          <div className="commentButton flex items-center justify-end mr-2 mb-3">
            <button className="bg-blue-300 text-white font-bold p-2 rounded-md hover:bg-blue-500 transition-all duration-200 ease-in">
              Comment
            </button>
          </div>
        </div>
        <div className="list">
          <SpecificComment />
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
      </div>
    </Toggle>
  );
}
