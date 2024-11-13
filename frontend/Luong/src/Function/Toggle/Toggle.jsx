import { useState } from "react";
import { createContext } from "react";
const setTrueFalse = createContext();
export default function Toggle({ children }) {
  const [On, setOn] = useState(false);
  const handleSet = () => {
    setOn((prevOn) => !prevOn);
  };
  return (
    <setTrueFalse.Provider value={{ On, handleSet }}>
      {children}
    </setTrueFalse.Provider>
  );
}
export { setTrueFalse };
