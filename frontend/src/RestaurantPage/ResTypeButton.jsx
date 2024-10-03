import { Link } from "react-router-dom";
export default function FoodTypeButton(props) {
  return (
    <div className="bg-white border border-gray-100 p-4 text-center shadow-md hover:shadow-2xl hover:border-gray-800 transition-all duration-300  ease-in rounded-2xl cursor-pointer">
      <Link state={props.name} to={`typeRes/:${props.name}`}>
        <img
          src={props.img}
          alt=""
          className="h-8 w-8 relative left-1/2 -translate-x-1/2"
        />
        <p>{props.name}</p>
      </Link>
    </div>
  );
}
