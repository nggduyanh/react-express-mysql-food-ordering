import { useLocation } from "react-router-dom";
import ResInfo from "../InfoRes/ResInfo";
import { lazy, Suspense, useEffect, useState } from "react";
import { useMemo } from "react";
// const FoodDetails = lazy(() => import("../Food/foodDetails"));
// const MarginJustifi = lazy(() => import("../../Function/MarginJustifi"));
// const GridDiv = lazy(() => import("../../Function/GridDiv"));
// const Rating = lazy(() => import("../Comment/Rating"));
// const OrderDetails = lazy(() => import("./OrderDetails"));
// const ListComment = lazy(() => import("../Comment/ListComment"));
import FoodDetails from "../Food/FoodDetails";
import MarginJustifi from "../../Function/MarginJustifi";
import GridDiv from "../../Function/GridDiv";
import Rating from "../Comment/Rating";
import OrderDetails from "./OrderDetails";
import ListComment from "../Comment/ListComment";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { IoLocationOutline, IoCloseCircleSharp } from "react-icons/io5";
import Card from "../../Information/Payment/Card";
export default function SpecificRes() {
  const [close, setClose] = useState(true);
  const [Food, setFood] = useState([]);
  const ResInfor = useLocation();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, []);
  const categoryFood = useMemo(() => {
    const array = Food.reduce((accumulate, currentVal) => {
      if (!accumulate.includes(currentVal.category)) {
        accumulate.push(currentVal.category);
      }
      return accumulate;
    }, []);
    return array;
  }, [Food]);
  const getFoodByCategory = useMemo(() => {
    function caculateCategory() {
      let filterArray = [];
      categoryFood.forEach((cate, index) => {
        let resCateFood = Food.filter((items) => {
          return cate === items.category;
        });
        filterArray.push({ id: index, category: cate, list: resCateFood });
      });
      return filterArray;
    }
    return caculateCategory;
  }, [Food, categoryFood]);
  const listFoodbyCategory = useMemo(() => {
    return getFoodByCategory().map((food) => {
      return (
        <div key={food.id}>
          <p className="font-bold text-2xl my-2 capitalize">{food.category}</p>
          <div>
            {food.list.map((items) => (
              <FoodDetails
                isOrder={false}
                getInfo={(val) => console.log("Restaurant", val)}
                mini={true}
                key={items.id}
                {...items}
              />
            ))}
          </div>
        </div>
      );
    });
  }, [getFoodByCategory]);
  return (
    <div className="background_res relative">
      <div className="bg-black bckImage">
        <div className="overlay"></div>
        <MarginJustifi classname=" text-white flex justify-between py-10 header_content">
          <ResInfo rate={ResInfor.state.rate}>
            <p className="font-bold capitalize text-4xl tracking-widest">
              {ResInfor.state.title}
            </p>
            <p className="my-2">Address: Thanh Pho Ha Noi</p>
            <i className="my-2 block">{ResInfor.state.category}</i>
            <p>Open Time: 12:00am</p>
          </ResInfo>
          <div className="res_image flex justify-end">
            <img
              src={ResInfor.state.img}
              alt=""
              className="w-10/12  h-48 rounded-xl"
            />
          </div>
        </MarginJustifi>

        <MarginJustifi classname="w-14 h-14 flex items-center rounded-xl border bg-gradient-to-r from-pink-600 to-orange-500 border-pink-400 p-3 absolute z-10 left-1/2 -translate-x-1/2 -bottom-8 infoRestaurant text-white justify-between">
          <div className="flex items-center gap-3">
            <div className="roundCheckInfo ">
              <FaRegCommentAlt className="setupForRound" />
            </div>
            <div className="roundCheckInfo">
              <FaRegHeart className="setupForRound" />
            </div>
            <div className="roundCheckInfo">
              <IoLocationOutline className="setupForRound" />
            </div>
          </div>
          <div>
            <button className="border border-white rounded-xl p-2 hover:bg-white hover:text-black transition-all duration-300 ease-in font-bold">
              Contact
            </button>
          </div>
        </MarginJustifi>
      </div>
      <br />
      <MarginJustifi>
        <p className="text-2xl font-bold my-4">Combo Food</p>
        <GridDiv cols={4}>
          {Food.slice(0, 4).map((food) => {
            return (
              <FoodDetails
                getInfo={(val) => console.log(val)}
                mini={false}
                key={food.id}
                {...food}
              />
            );
          })}
        </GridDiv>
      </MarginJustifi>

      <div className="grid grid-cols-3 my-3">
        <div className="col-span-2">
          <MarginJustifi>
            <p className="text-2xl font-bold my-4">Menu</p>
            <GridDiv cols={1}>{listFoodbyCategory}</GridDiv>
          </MarginJustifi>
          <br />
          <MarginJustifi>
            <Rating />
            <br />
            <ListComment />
          </MarginJustifi>
        </div>
        <OrderDetails InputCard={(paymentMethod) => {}} />
      </div>
      {!close && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20`}
        >
          <div className="absolute top-24 right-80 text-3xl">
            <IoCloseCircleSharp className="text-red-500 cursor-pointer" />
          </div>
          <div className="bg-white w-7/12 h-3/4 p-6 rounded shadow-lg">
            <Card />
          </div>
        </div>
      )}
    </div>
  );
}
