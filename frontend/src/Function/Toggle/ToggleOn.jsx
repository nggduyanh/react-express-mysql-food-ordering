import { useContext } from "react";
import { setTrueFalse } from "./Toggle";
export default function ToggleOn({ children }) {
  const { On } = useContext(setTrueFalse);
  return <div>{On && children}</div>;
}
