import { lazy, Suspense, useContext } from "react";
import Slider from "./Slider";
import { Link } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import { createContext } from "react";
const LazyResInfo = lazy(() => import("../RestaurantPage/InfoRes/ResInfo"));
import GridDiv from "../Function/GridDiv";
import TrendingRes from "../RestaurantPage/Trending/TrendingRes";
import useFilterRes_Type from "../Hook/useFilterRes_Type";
import { UserContext } from "../Layout/LayoutHeader";
const RestaurantContext = createContext();
export default function HomePage() {
  const { place, tokenValue } = useContext(UserContext);
  return (
    <RestaurantContext.Provider value={"Nice"}>
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
                Restaurant near you: <strong>{place}</strong>
              </p>
              <Link to="all" className="flex items-center text-red-500">
                See more
                <GrFormNext className="text-xl" />
              </Link>
            </div>
            <br />
            <Suspense fallback={<p>Loading...</p>}>
              <GridDiv cols={4} classname="listFood">
                {useFilterRes_Type(place, tokenValue)
                  .map((items) => {
                    return (
                      <LazyResInfo key={items.id} {...items}>
                        <p className="text-xl font-bold">
                          {items.TenNguoiBan}{" "}
                        </p>
                        <i className="text-gray-500">
                          {items.loaiMonAn.map((loaiMonAn) => {
                            return loaiMonAn.TenLoaiMonAn + " ";
                          })}
                        </i>
                        <p className="text-md text-gray-500">
                          Time: {items.ThoiGianMoCua} - {items.ThoiGianDongCua}
                        </p>
                      </LazyResInfo>
                    );
                  })
                  .slice(0, 8)}
              </GridDiv>
            </Suspense>
            <br />
          </main>
        </div>
      </div>
    </RestaurantContext.Provider>
  );
}
