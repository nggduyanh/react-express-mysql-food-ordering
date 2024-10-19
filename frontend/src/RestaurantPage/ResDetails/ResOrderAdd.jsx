import { useState } from "react";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
export default function ResOrderDetailAdd({ children, funct, ...rest }) {
  const [count, setCount] = useState(1);
  const handleAdd = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleMinus = () => {
    setCount((prevCount) => {
      if (prevCount > 1) {
        return prevCount - 1;
      } else {
        funct((prevOrder) => {
          const indexFood = prevOrder.findIndex(
            (food) => food.MaMonAn === rest.index
          );
          if (indexFood !== -1) {
            return [
              ...prevOrder.slice(0, indexFood),
              ...prevOrder.slice(indexFood + 1),
            ];
          }
          return prevOrder;
        });
        return 1;
      }
    });
  };
  return (
    <div className="flex items-center gap-2 mb-1 justify-between">
      {children}
      <div className="flex items-center gap-2">
        <FaCirclePlus
          className="text-pink-500 cursor-pointer"
          onClick={handleAdd}
        />
        <p>{count}</p>
        <FaCircleMinus
          className="text-pink-500 cursor-pointer"
          onClick={handleMinus}
        />
      </div>
    </div>
  );
}
