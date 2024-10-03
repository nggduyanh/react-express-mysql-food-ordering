import SpecificComment from "./SpecificComment";
import Toggle from "../../Function/Toggle/LayoutToggle";
import { useState } from "react";

export default function ListComment() {
  return (
    <Toggle>
      <div className="border bg-white border-gray-300 p-3 rounded-lg">
        <p className="mb-2 border border-white border-b-gray-200 pb-2">
          All Ratings and reviews
        </p>
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
            <Toggle.On>Show reviews</Toggle.On>
            <Toggle.Off>Hide Reviews</Toggle.Off>
          </Toggle.Button>
        </div>
      </div>
    </Toggle>
  );
}
