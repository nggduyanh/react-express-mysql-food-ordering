import { TiStarFullOutline } from "react-icons/ti";
import avatar from "../../assets/avatar.png";
import { useEffect, useState } from "react";
import { GetUserInfo, localStaticFile } from "../../Route";
import Toggle from "../../Function/Toggle/LayoutToggle";
export default function SpecificComment(props) {
  return (
    <div>
      <div className="User_Reply flex gap-3 border p-3 rounded-xl border-gray-400 mb-2">
        {props.NguoiDung.AnhNguoiDung !== null ? (
          <img
            src={localStaticFile + props.NguoiDung.AnhNguoiDung}
            alt=""
            className="h-10 w-10"
          />
        ) : (
          <img src={avatar} alt="" className="h-10 w-10" />
        )}
        <div className="userInfo w-full">
          <div className="flex w-full justify-between items-center">
            <p>{props.NguoiDung.TenNguoiDung}</p>
            <p className="flex items-center">
              {props.NhanXet.Diem}{" "}
              <TiStarFullOutline className="text-yellow-500" />
            </p>
          </div>
          <i className="text-xs">11-12-2002</i>
          <p>{props.NhanXet.NoiDung}</p>
        </div>
      </div>
      {props.NhannXet && props.NhannXet.TraLoi !== null && (
        <Toggle>
          <Toggle.On>
            <div className="seller_reply ml-10 flex gap-3 border p-3 rounded-xl border-gray-400 mb-4">
              {props.NguoiDung.AnhNguoiDung !== null ? (
                <img
                  src={localStaticFile + props.NguoiDung.AnhNguoiDung}
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
