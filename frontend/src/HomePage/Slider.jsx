import ResTypeButton from "../RestaurantPage/ResTypeButton";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GetTypeRes } from "../Route";
import useFetchData from "../Hook/useFetchData";
import { useContext, useState } from "react";
import { UserContext } from "../Layout/LayoutHeader";
export default function Slider() {
  const { tokenValue } = useContext(UserContext);
  const [typeRes, errorTypeRes] = useFetchData(GetTypeRes, tokenValue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8;
  const listType = typeRes?.data
    ?.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
    .map((food) => {
      return <ResTypeButton key={food.id} {...food} />;
    });
  // console.log(
  //   typeRes?.data?.slice(
  //     currentIndex * itemsPerPage,
  //     (currentIndex + 1) * itemsPerPage
  //   )
  // );
  const handleClickNext = () => {
    if (typeRes && typeRes.data) {
      const totalPages = Math.ceil(typeRes.data.length / itemsPerPage);
      if (currentIndex < totalPages - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };
  const handleClickPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div>
      <div className="bg_homeScreen">
        <div className="flex items-center justify-between w-11/12 mx-auto ">
          <div
            className="cursor-pointer border border-gray-400 p-2 rounded-full hover:border-pink-500 hover:text-white hover:bg-pink-500 transition-all duration-200"
            onClick={handleClickPrev}
          >
            <GrPrevious />
          </div>
          <div className="slider grid grid-cols-8 grid-rows-1 gap-3 my-3 w-full">
            {listType}
          </div>
          <div
            className="cursor-pointer border border-gray-400 p-2 rounded-full hover:border-pink-500 hover:text-white hover:bg-pink-500 transition-all duration-200"
            onClick={handleClickNext}
          >
            <GrNext />
          </div>
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
