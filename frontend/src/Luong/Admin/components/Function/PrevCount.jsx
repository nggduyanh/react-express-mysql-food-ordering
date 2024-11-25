import { useContext } from "react";
import { countContext } from "./CountLayout";
import { FaArrowLeft } from "react-icons/fa";

export default function PrevCount() {
  const { handlePrev, count } = useContext(countContext);
  return (
    <div>
      <FaArrowLeft
        className={`cursor-pointer ${count === 0 && "text-gray-200"} `}
        onClick={count === 0 ? null : handlePrev}
      />
    </div>
  );
}
