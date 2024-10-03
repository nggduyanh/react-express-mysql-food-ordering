import { useParams, useLocation } from "react-router-dom";
import ResInfo from "./InfoRes/ResInfo";
import FoodData from "../data/FoodData";
import { useState } from "react";
import GridDiv from "../Function/GridDiv";
export default function TypeRes() {
  const [foodData, setFoodData] = useState(FoodData);
  const typeValue = useParams();
  const value = useLocation();
  const listFood = foodData
    .filter((items) => items.category === value.state)
    .map((items) => {
      return (
        <ResInfo {...items} key={items.id}>
          <p className="text-xl font-bold">{items.title} </p>
          <i>{items.category}</i>
          <p className="text-md text-gray-500">
            Open - Close: 12:00am - 23:00pm
          </p>
        </ResInfo>
      );
    });

  return (
    <div className="marginJustification min-h-screen">
      <p className="text-2xl font-bold my-4">Good food near you</p>
      {listFood.length !== 0 ? (
        <GridDiv cols={4} classname="listFood">
          {listFood}
        </GridDiv>
      ) : (
        <div className="">
          <div className="text-center">
            <p className="text-2xl">No restaurant found</p>
            <img src="/NoData.jpg" alt="Designed by freepik" className="" />
          </div>
        </div>
      )}
    </div>
  );
}
