import { useLocation } from "react-router-dom";
import ResInfo from "../InfoRes/ResInfo";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useMemo } from "react";
import FoodDetails from "../Food/FoodDetails";
import MarginJustifi from "../../Function/MarginJustifi";
import GridDiv from "../../Function/GridDiv";
const Rating = lazy(() => import("../Comment/Rating"));
import OrderDetails from "./OrderDetails";
import ListComment from "../Comment/ListComment";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { IoLocationOutline, IoCloseCircleSharp } from "react-icons/io5";
import {
  formatCurrency,
  GetFoodRestaurant,
  GetPromotion,
  GetRestaurant,
  localStaticFile,
} from "../../Route/index.js";
import Card from "../../Information/Payment/Card";
import { UserContext } from "../../Layout/LayoutHeader.jsx";

export default function SpecificRes() {
  const { tokenValue } = useContext(UserContext);
  const [close, setClose] = useState(true);
  const [showFood, setShowFood] = useState(false);
  const [Food, setFood] = useState([]);
  const [detailsFood, setDetailsFood] = useState();
  const [order, setOrder] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [amountOrder, setAmountOrder] = useState([]);
  const ResInfor = useLocation();
  useEffect(() => {
    fetch(GetFoodRestaurant + `/nguoiban/${ResInfor.state.MaNguoiBan}`, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No list was found");
        }
        return res.json();
      })
      .then((listFood) => {
        const assignTypeFood = listFood.map((food) => {
          const getType = ResInfor.state.loaiMonAn.find((type) => {
            return type.MaLoaiMonAn === food.MaLoaiMonAn;
          });
          return {
            ...food,
            loaiMonAn: getType?.TenLoaiMonAn,
            AmountOrder: 0,
          };
        });
        setFood(assignTypeFood);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setFood([]);
        } else console.log(err.message);
      });
  }, [tokenValue]);
  const [Seller, setSeller] = useState([]);
  useEffect(() => {
    fetch(GetRestaurant + `/${ResInfor.state.MaNguoiBan}`, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not found seller");
        }
        return res.json();
      })
      .then((data) => setSeller(data))
      .catch((err) => {
        setSeller([]);
      });
  }, []);
  useEffect(() => {
    fetch(GetPromotion, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No promotion found");
        }
        return res.json();
      })
      .then((data) => {
        setPromotions(data);
      })
      .catch((err) => {
        console.log(err.message);
        setPromotions([]);
      });
  }, [tokenValue]);

  const categoryFood = useMemo(() => {
    const array = Food.reduce((accumulate, currentVal) => {
      if (!accumulate.includes(currentVal.loaiMonAn)) {
        accumulate.push(currentVal.loaiMonAn);
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
          return cate === items.loaiMonAn;
        });
        filterArray.push({ id: index, loaiMonAn: cate, list: resCateFood });
      });
      return filterArray;
    }
    return caculateCategory;
  }, [Food, categoryFood]);
  const listFoodbyCategory = useMemo(() => {
    return getFoodByCategory().map((food) => {
      return (
        <div key={food.id}>
          <p className="font-bold text-2xl my-2 capitalize">{food.loaiMonAn}</p>
          <div>
            {food.list.map((items) => (
              <FoodDetails
                isShown={(value) => {
                  setShowFood(true);
                  setDetailsFood(value);
                }}
                getInfo={(value) => {
                  setOrder((prevOrder) => {
                    const checkOrder = prevOrder.find((prev) => {
                      return prev.MaMonAn === value.MaMonAn;
                    });
                    if (!checkOrder) {
                      return [...prevOrder, value];
                    } else return [...prevOrder];
                  });
                  setAmountOrder((prevAmount) => {
                    const checkAmount = prevAmount.find((prev) => {
                      return prev.id === value.MaMonAn;
                    });
                    if (!checkAmount) {
                      return [...prevAmount, { id: value.MaMonAn, amount: 1 }];
                    } else return [...prevAmount];
                  });
                }}
                mini={true}
                key={items.MaMonAn}
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
          <ResInfo details={true} rate={ResInfor.state.Diem}>
            <p className="font-bold capitalize text-4xl tracking-widest">
              {ResInfor.state.TenNguoiBan}
            </p>
            <p className="my-2">
              Address: {ResInfor.state.DiaChi},{ResInfor.state.ThanhPho}
            </p>
            <i className="my-2 block">
              Restaurant Type:{" "}
              {ResInfor.state.loaiMonAn.map((type) => {
                return type.TenLoaiMonAn + " ";
              })}
            </i>
            <p>
              Time: {ResInfor.state.ThoiGianMoCua} -{" "}
              {ResInfor.state.ThoiGianDongCua}
            </p>
          </ResInfo>
          <div className="res_image flex justify-end">
            {ResInfor.state.AnhNguoiBan !== null ? (
              <img
                src={ResInfor.state.img}
                alt=""
                className="w-11/12 h-48 rounded-xl"
              />
            ) : (
              <img
                src="/resDefault.jpg"
                alt=""
                className="w-11/12 h-48 rounded-xl"
              />
            )}
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

      {listFoodbyCategory.length !== 0 ? (
        <>
          <div className="grid grid-cols-3 my-3">
            <div className="col-span-2 ">
              <MarginJustifi>
                <p className="text-2xl font-bold my-4">Menu</p>
                <GridDiv cols={1}>{listFoodbyCategory}</GridDiv>
              </MarginJustifi>
              <br />
              {showFood && (
                <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                  <div className="bg-white w-8/12 foodDetails p-6 rounded shadow-lg overflow-y-auto relative">
                    <div className="absolute Xbutton text-3xl">
                      <IoCloseCircleSharp
                        onClick={() => setShowFood(false)}
                        className="text-red-500 cursor-pointer"
                      />
                    </div>
                    <div className="InforFoods ">
                      <div className="flex gap-5">
                        {detailsFood.AnhMonAn !== null ? (
                          <img
                            src={localStaticFile + detailsFood.AnhMonAn}
                            alt=""
                            className="w-80 h-80 border border-pink-400 "
                          />
                        ) : (
                          <img
                            src="/Food/NoFoodPhoto.jpg"
                            className="w-64 h-64 border border-pink-400 "
                          />
                        )}
                        <div className="flex flex-col justify-between">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-2xl">Name: </p>
                            <p className="text-2xl font-bold uppercase">
                              {detailsFood.TenMonAn}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className=" italic ">
                              <b>Description:</b> {detailsFood.MoTa}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="font-bold">Type: </p>
                            <p className="my-3">{detailsFood.loaiMonAn}</p>
                          </div>
                          <p className=" text-green-700 font-bold">
                            <b className="text-green-500 text-xl">Price: </b>
                            {formatCurrency(detailsFood.GiaBan)}
                          </p>
                          <div className="btn flex items-center gap-5 x">
                            <button className=" bg-pink-400 font-bold text-white  w-24 rounded-lg hover:bg-pink-600 transition-all duration-200 ease-in">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Ratings mt-2">
                      <Suspense fallback={<p>Loading...</p>}>
                        <Rating />
                      </Suspense>
                      <Suspense fallback={<p>Loading...</p>}>
                        <ListComment
                          sellerInfor={Seller}
                          foodDetails={detailsFood}
                        />
                      </Suspense>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <OrderDetails
              lstPromotions={promotions}
              orderList={order}
              setOrderList={setOrder}
              AmountList={amountOrder}
              setAmount={setAmountOrder}
              name={ResInfor.state.TenNguoiBan}
              img={ResInfor.state.AnhNguoiBan}
              InputCard={(paymentMethod) => {}}
            />
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
        </>
      ) : (
        <div className="mx-20 py-10">
          <img src="/Closed.jpg" alt="" className="" />
        </div>
      )}
    </div>
  );
}
