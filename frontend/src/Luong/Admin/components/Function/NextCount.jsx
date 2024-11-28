import { useContext } from "react";
import { countContext } from "./CountLayout";
import { FaArrowRight } from "react-icons/fa";

export default function NextCount(list) {
  const { handleNext, count } = useContext(countContext);
  const isLastBatch = count + 5 >= list.array.length;
  console.log(isLastBatch);
  return (
    <div>
      <FaArrowRight
        className={`cursor-pointer ${isLastBatch ? "text-gray-200" : ""}`}
        onClick={isLastBatch ? null : handleNext}
      />
    </div>
  );
}
