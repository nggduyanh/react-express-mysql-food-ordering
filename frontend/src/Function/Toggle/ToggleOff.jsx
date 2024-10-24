import { useContext } from "react";
import { setTrueFalse } from "./Toggle";
export default function ToggleOff({ children }) {
  const { On } = useContext(setTrueFalse);
  return <div>{!On && children}</div>;
}
