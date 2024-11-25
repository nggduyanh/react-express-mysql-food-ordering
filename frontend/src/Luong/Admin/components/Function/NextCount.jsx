import { useContext } from "react";
import { countContext } from "./CountLayout";
import { FaArrowRight } from "react-icons/fa";

export default function NextCount(list) {
  const { handleNext, count } = useContext(countContext);
  return (
    <div>
      <FaArrowRight
        className={`cursor-pointer ${
          count + 5 === list.array.length && "text-gray-200"
        } `}
        onClick={count + 5 === list.array.length ? null : handleNext}
      />
    </div>
  );
}
