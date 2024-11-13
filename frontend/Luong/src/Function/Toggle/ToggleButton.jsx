import { useContext } from "react";
import { setTrueFalse } from "./Toggle";
export default function ToggleButton({ children, ...rest }) {
  const { handleSet } = useContext(setTrueFalse);
  return (
    <div className={rest.className} onClick={handleSet}>
      {children}
    </div>
  );
}
