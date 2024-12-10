import { useContext } from "react";
import { setTrueFalse } from "./Toggle";
export default function ToggleOff({ children, ...rest }) {
  const { On } = useContext(setTrueFalse);
  return <div {...rest}>{!On && children}</div>;
}
