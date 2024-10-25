import { FiMessageSquare } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
import ResOrderDetailAdd from "./ResOrderAdd";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { GetPromotion } from "../../Route";
const OrderReducer = {
  listFood: [],
  promotions: {},
  suggestion: "",
  paymentMethod: "",
};
const OrderAction = (state, action) => {
  switch (action.type) {
    case "LIST_ORDER":
      return {
        ...state,
        listFood: action.payload,
      };
    case "PROMOTION":
      return {
        ...state,
        promotions: action.payload,
      };
    case "SET_PROMOTION": {
      break;
    }
    case "SUGGESTION":
    case "PAYMENT": {
      const { name, value } = action.event.target;
      return {
        ...state,
        [name]: value,
      };
    }
    default:
      return state;
  }
};
export default function OrderDetails(props) {
  const [detailsOrder, dispatch] = useReducer(OrderAction, OrderReducer);
  const handlePayment = (e) => {
    dispatch({ type: "PAYMENT", event: e });
  };
  const handleSuggestionChange = (e) => {
    dispatch({ type: "SUGGESTION", event: e });
  };
  const handlePromotionChange = async (e) => {
    const { name, value } = e.target;
    const response = await axios.get(GetPromotion + `/${value}`);
    const data = await response.data;
    dispatch({ type: "PROMOTION", payload: data[0] });
  };
  useEffect(() => {
    dispatch({ type: "LIST_ORDER", payload: props.orderList });
  }, [props.orderList]);
  const handlePayOrder = (event) => {
    event.preventDefault();
    console.log("Order Reducer", detailsOrder);
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const handleTotal = () => {
    const totalPrice = props.orderList.reduce((accummulate, currentValue) => {
      const getAmountNumber = props.AmountList.find((amount) => {
        return amount.id === currentValue.MaMonAn;
      });

      return (accummulate += currentValue.GiaBan * getAmountNumber.amount);
    }, 0);
    return totalPrice;
  };
  const applyPromotions = (order) => {
    let totalPrice = handleTotal();
    if (totalPrice === 0) return totalPrice;
    if (order.promotions && Object.keys(order.promotions).length > 0) {
      if (order.promotions.PhanTram !== null) {
        console.log("You choose PhanTram");
        return (totalPrice =
          totalPrice - totalPrice * (order.promotions.PhanTram / 100));
      }
      if (order.promotions.GiaTri !== null) {
        console.log("You choose GiaTri");
        return (totalPrice -= order.promotions.GiaTri);
      }
    } else {
      return totalPrice;
    }
  };
  return (
    <div className="sticky-div">
      <div className="pr-16 -ml-6 ">
        <div className="border shadow-xl bg-white border-gray-300 rounded-2xl w-full orderBox p-4 grid grid-rows-8 gap-3">
          <div className="text-xl font-bold pb-2 flex items-center gap-3">
            {props.img !== null ? (
              <img src={props.img} alt="" className="w-10 h-10 rounded-full" />
            ) : (
              <img
                src="/resDefault.jpg"
                alt=""
                className="w-10 h-10 rounded-full"
              />
            )}
            <p>{props.name}</p>
          </div>
          <div className=" max-h-52 overflow-y-auto row-span-2 p-1 border border-gray-300 rounded-lg order list">
            {props.orderList.length === 0 ? (
              <p className="text-gray-500 text-center translate-y-1/2">
                No food was order
              </p>
            ) : (
              <div>
                {props.orderList.map((order) => {
                  return (
                    <ResOrderDetailAdd
                      index={order.MaMonAn}
                      funct={props.setOrderList}
                      setAmountOrder={props.setAmount}
                      key={order.MaMonAn}
                    >
                      <div className="flex items-center">
                        {order.AnhMonAn !== null ? (
                          <img
                            src={order.AnhMonAn}
                            alt=""
                            className="h-10 w-10"
                          />
                        ) : (
                          <img
                            src="/Food/NoFoodPhoto.jpg"
                            alt=""
                            className="h-10 w-10"
                          />
                        )}
                        <p>{order.TenMonAn}</p>
                      </div>
                    </ResOrderDetailAdd>
                  );
                })}
              </div>
              // props.orderList
            )}
          </div>
          <div className="flex items-center justify-between">
            <select
              name="promotions"
              onChange={handlePromotionChange}
              className="w-full border border-gray-200 p-2"
            >
              <option value="">Choose promotion</option>
              {props.lstPromotions.map((promotion) => {
                return (
                  <option
                    key={promotion.MaKhuyenMai}
                    value={promotion.MaKhuyenMai}
                  >
                    {promotion.TenKhuyenMai}
                  </option>
                );
              })}
            </select>
            <div className="p-2 bg-red-500 font-bold text-white rounded-e-lg">
              %Apply
            </div>
          </div>
          <div className="comment flex gap-2 items-center">
            <div className="block ">
              <FiMessageSquare />
            </div>
            <textarea
              className="w-full border border-gray-300 p-2"
              name="suggestion"
              onChange={handleSuggestionChange}
              placeholder="any suggesion, we will pass it on"
            ></textarea>
          </div>
          <div className="payment method flex items-center">
            <select
              name="paymentMethod"
              id="paymentMethod"
              className="w-full border border-gray-200 p-2"
              onChange={handlePayment}
            >
              <option value="">Choose Payment method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="e-wallet">E-wallet</option>
            </select>
            <div className="py-3 px-4 bg-green-500 font-bold text-white rounded-e-lg">
              <MdOutlinePayment />
            </div>
          </div>
          <div className="row-span-2 flex flex-col justify-between">
            <div className="max-h-52 overflow-y-auto ">
              {props.orderList.map((order) => {
                const amountNumber = props.AmountList.find((amount) => {
                  return amount.id === order.MaMonAn;
                });
                return (
                  <div key={order.MaMonAn} className="flex justify-between">
                    <p>{order.TenMonAn}</p>
                    <div className="flex items-center">
                      <p className="mr-2 font-bold text-green-700">
                        {formatCurrency(order.GiaBan)}
                      </p>{" "}
                      x<p className="ml-2">{amountNumber.amount}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border border-white border-t-black ">
              <p className="text-xl text-gray-500">Total</p>
              <p className="text-xl text-gray-500">
                {formatCurrency(applyPromotions(detailsOrder))}
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={handlePayOrder}
              className="w-full py-4 bg-green-500 hover:bg-green-800 transition-all ease-in duration-200 text-white font-bold uppercase rounded-xl"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
