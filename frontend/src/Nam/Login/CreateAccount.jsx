import { Link } from "react-router-dom";

export default function CreateAccount(props) {
  return (
    <div className="mt-16 text-lg mx-auto">
      <p>
        {" "}
        {props.text}
        <Link to={props.link} className="ml-1 text-[#F58220]">
          {props.linktext}
        </Link>
      </p>
    </div>
  );
}
