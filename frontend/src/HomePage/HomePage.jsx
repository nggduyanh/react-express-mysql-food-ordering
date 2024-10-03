import { lazy, Suspense } from "react";
import Slider from "./Slider";
import { Link } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import { useState, createContext } from "react";
const LazyResInfo = lazy(() => import("../RestaurantPage/InfoRes/ResInfo"));
import FoodData from "../data/FoodData";
import GridDiv from "../Function/GridDiv";
import TrendingRes from "../RestaurantPage/Trending/TrendingRes";
const RestaurantContext = createContext();
export default function HomePage() {
  const [Food, setFood] = useState(FoodData);
  const listFood = Food.map((items) => {
    return (
      <LazyResInfo key={items.id} {...items}>
        <p className="text-xl font-bold">{items.title} </p>
        <i>{items.category}</i>
        <p className="text-md text-gray-500">Open - Close: 12:00am - 23:00pm</p>
      </LazyResInfo>
    );
  });
  const get3TrendingRandom = Math.floor(Math.random() * Food.length);
  const TrendingFood = () => {
    return <h1>Hello</h1>;
  };
  return (
    <RestaurantContext.Provider value={Food}>
      <div className="min-h-screen">
        <Slider />
        <div className="bg_homeScreen">
          <main className="w-11/12 mx-auto ">
            <div className="Trending">
              <TrendingRes />
            </div>
            <br />
            <div className="flex items-center justify-between">
              <p className="text-2xl">
                Restaurant near you: <strong>Ha Noi</strong>
              </p>
              <Link
                state={Food}
                to="all"
                className="flex items-center text-red-500"
              >
                See more
                <GrFormNext className="text-xl" />
              </Link>
            </div>
            <br />
            <Suspense fallback={<p>Loading...</p>}>
              <GridDiv cols={4} classname="listFood">
                {listFood}
              </GridDiv>
            </Suspense>
            <br />
          </main>
        </div>
      </div>
    </RestaurantContext.Provider>
  );
}
export { RestaurantContext };
