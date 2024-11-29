import { createContext, useState } from "react";

const countContext = createContext();
export default function CountLayout({ children, rows }) {
  const [count, setCount] = useState(0);
  const handleNext = () => {
    setCount((prevCount) => {
      return prevCount + rows;
    });
  };
  const handlePrev = () => {
    setCount((prevCount) => {
      return prevCount - rows;
    });
  };
  return (
    <countContext.Provider value={{ count, handleNext, handlePrev, rows }}>
      {children}
    </countContext.Provider>
  );
}
export { countContext };
