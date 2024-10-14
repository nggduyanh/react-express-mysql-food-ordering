import ResTypeButton from "../RestaurantPage/ResTypeButton";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GetTypeRes } from "../Route";
import useFetchData from "../Hook/useFetchData";
export default function Slider() {
  const [typeRes, setTypeRes] = useFetchData(GetTypeRes);
  const listType = typeRes.map((food) => {
    return <ResTypeButton key={food.id} {...food} />;
  });
  return (
    <div>
      <div className="bg_homeScreen">
        <div className="flex items-center justify-between w-11/12 mx-auto ">
          <GrPrevious className="cursor-pointe" />
          <div className="slider grid grid-cols-8 gap-3 my-3 w-full">
            {listType}
          </div>
          <GrNext className="cursor-pointe" />
        </div>
      </div>
      <div className="bg-white border border-t-gray-200 py-3 border-b-gray-200">
        <div className="advertise grid grid-cols-4 gap-4 w-11/12 mx-auto ">
          <img
            src="/advertise/50percent.jpg"
            alt="Designed by Freepik"
            className="advertiseBanner"
          />
          <img
            src="/advertise/safeDriver.jpg"
            alt="Designed by Freepik"
            className="advertiseBanner"
          />
          <img
            src="/advertise/favouriteFood.jpg"
            alt="Designed by Freepik"
            className="advertiseBanner"
          />
          <img
            src="/advertise/worldFood.jpg"
            alt="Designed by Freepik"
            className="advertiseBanner"
          />
        </div>
      </div>
    </div>
  );
}
