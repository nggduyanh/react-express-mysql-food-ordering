import { Link } from "react-router-dom";
export default function FoodTypeButton(props) {
  return (
    <Link
      state={props.TenLoaiMonAn}
      to={`typeRes/:${props.TenLoaiMonAn}`}
      className="bg-white border border-gray-100 p-4 text-center shadow-md hover:shadow-2xl hover:border-gray-800 hover:bg-pink-500 hover:text-white transition-all duration-300  ease-in rounded-2xl cursor-pointer flex items-center justify-center"
    >
      {/* <img
          src={props.img}
          alt=""
          className="h-8 w-8 relative left-1/2 -translate-x-1/2"
        /> */}
      <p>{props.TenLoaiMonAn}</p>
    </Link>
  );
}
