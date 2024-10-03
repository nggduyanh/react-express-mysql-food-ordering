import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Toggle from "../../Function/Toggle/LayoutToggle";
export default function ResInfo({ children, ...rest }) {
  const NumberOfStar = rest.rate;
  const DecimalOfStar = Number.parseInt(NumberOfStar);
  let arrayOfStar = new Array(5);
  let i = 0;
  console.log(arrayOfStar.length);
  while (i < 5) {
    if (i >= DecimalOfStar) arrayOfStar.push(<TiStarOutline />);
    else arrayOfStar.push(<TiStarFullOutline className="text-yellow-500" />);
    i++;
  }
  return (
    <Toggle>
      <div className="FoodItems p-2  rounded-lg">
        {rest.img !== undefined && (
          <div className="relative">
            <Link to={`/restaurant/:${rest.title}`} state={rest}>
              <img src={rest.img} alt="" className="w-full h-48 rounded-lg" />
            </Link>
            <Toggle.Button>
              <div className="absolute top-0 right-0 p-2 m-2 text-lg text-pink-500 z-10 cursor-pointer border rounded-full border-white bg-white">
                <Toggle.Off>
                  <FaRegHeart />
                </Toggle.Off>
                <Toggle.On>
                  <FaHeart className="text-red-500" />
                </Toggle.On>
              </div>
            </Toggle.Button>
            <div className="absolute bottom-0 right-0 p-2">
              <div className="flex items-center bg-green-700 gap-1 text-white font-bold text-xs p-1 rounded-md">
                <TiStarOutline />
                <p>{rest.rate}</p>
                <p>(300+)</p>
              </div>
            </div>
          </div>
        )}
        <div className="mt-3"></div>
        {/* <Link to={`/restaurant/:${rest.title}`} state={rest}> */}
        {children}
        {/* </Link> */}
        <div className="flex items-center mt-3">{arrayOfStar}</div>
      </div>
    </Toggle>
  );
}
