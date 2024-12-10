import { FiMessageSquare } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
import ResOrderDetailAdd from "./ResOrderAdd";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  formatCurrency,
  GetPromotion,
  OrderAdd,
  OrderDetailAdd,
  PaymentMethod,
  urlPayment,
} from "../../Route";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useOutletContext } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { localStaticFile } from "../../routebackend";
import { socket } from "../../Route/socket";
const OrderReducer = {
  listFood: [],
  promotions: {},
  suggestion: "",
  paymentMethod: "",
  address: "",
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
    case "SUGGESTION":
    case "ADDRESS":
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
  const { tokenValue, userData } = useOutletContext();
  const [detailsOrder, dispatch] = useReducer(OrderAction, OrderReducer);
  const [totalMoney, settotalMoney] = useState(0);
  const [mainAddress, setMainAddress] = useState();
  const DiaChiDen = JSON.parse(sessionStorage.getItem("userAddress"));
  const [paymentMethod, setPaymentMethod] = useState([]);
  const navigate = useNavigate();
  const handlePayment = async (e) => {
    dispatch({ type: "PAYMENT", event: e });
  };
  const handleSuggestionChange = (e) => {
    dispatch({ type: "SUGGESTION", event: e });
  };
  const handlePromotionChange = async (e) => {
    const { value } = e.target;
    if (value === "remove") {
      dispatch({ type: "PROMOTION", payload: "" });
      return;
    }
    const response = await axios.get(GetPromotion + `/${value}`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    });
    const data = await response.data;
    console.log("data", data);
    dispatch({ type: "PROMOTION", payload: data[0] });
  };
  useEffect(() => {
    if (DiaChiDen) {
      setMainAddress(DiaChiDen.address);
    }
  }, [tokenValue, DiaChiDen]);

  useEffect(() => {
    dispatch({ type: "LIST_ORDER", payload: props.orderList });
  }, [props.orderList]);
  useEffect(() => {
    fetch(PaymentMethod, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not found PaymendMethod");
        }
        return res.json();
      })
      .then((data) => {
        setPaymentMethod(data);
      })
      .catch((err) => {
        console.log(err);
        setPaymentMethod([]);
      });
  }, [tokenValue]);
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
    let totalTemp = totalPrice;
    if (totalTemp === 0) return totalTemp;
    if (order.promotions && Object.keys(order.promotions).length > 0) {
      if (order.promotions.PhanTram !== null) {
        console.log("You choose PhanTram");
        totalTemp = totalTemp - totalTemp * (order.promotions.PhanTram / 100);
      } else if (order.promotions.GiaTri !== null) {
        console.log("You choose GiaTri");
        totalTemp -= order.promotions.GiaTri;
      }
    } else {
      totalTemp = totalPrice;
    }
    if (totalTemp < 0) return totalPrice;
    return totalTemp;
  };
  const handleChangeAddress = (e) => {
    dispatch({ type: "ADDRESS", event: e });
  };
  const handlePayOrder = async (event) => {
    event.preventDefault();
    const total = applyPromotions(detailsOrder);
    settotalMoney(total);
    try {
      // console.log({
      //   DiaChiDen: "De La Thanh",
      //   TrangThai: 1,
      //   GiaBan: total,
      //   MaTaiXe: null,
      //   MaNguoiMua: userData.MaNguoiDung,
      //   MaKhuyenMai: detailsOrder.promotions.MaKhuyenMai,
      //   MaPhuongThucGiaoDich: parseInt(detailsOrder.paymentMethod),
      // });
      let TrangThaiThanhToan =
        parseInt(detailsOrder.paymentMethod) !== 1 ? false : true;
      let settingsAddress = detailsOrder.address || mainAddress;  
      if (detailsOrder.listFood.length > 0 && detailsOrder.paymentMethod !== "" && settingsAddress !== undefined) {
        const response = await toast.promise(
          axios.post(
            OrderAdd,
            {
              DiaChiDen:
                mainAddress !== undefined ? mainAddress : detailsOrder.address,
              TrangThai: 1,
              GiaBan: total,
              MaTaiXe: null,
              MaNguoiMua: userData.MaNguoiDung,
              MaKhuyenMai: detailsOrder.promotions?.MaKhuyenMai || null,
              TrangThaiThanhToan: TrangThaiThanhToan,
              MaPhuongThucGiaoDich: parseInt(detailsOrder.paymentMethod),
              LoiNhan: detailsOrder.suggestion,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenValue}`,
              },

              withCredentials: true,
            }
          ),
          {
            loading: "Creating order...",
            success: (response) => {
              const successMessage = `Order created successfully: ${response.data[0].MaDonHang}`; // Lưu thông báo thành công
              // Hiển thị thông báo
              // setTimeout(() => {
              //   navigate("/");
              // }, 2000);
              return successMessage;
            },
            error: (err) => `Error creating order: ${err.message}`,
          }
        );

        // toast.success("Order created successfully!");
        const addOrderDetaisl = props.orderList.map((order) => {
          const amountNumber = props.AmountList.find((amount) => {
            return amount.id === order.MaMonAn;
          });
          return {
            MaMonAn: order.MaMonAn,
            MaDonHang: response.data[0].MaDonHang,
            SoLuong: parseInt(amountNumber.amount),
          };
        });
        // toast.success("Order details created successfully!");
        const reponseDetailsOrder = await toast.promise(
          axios.post(
            OrderDetailAdd,
            {
              arr: addOrderDetaisl,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenValue}`,
              },
              withCredentials: true,
            }
          ),
          {
            loading: "Creating order details...",
            success: (response) => {
              const successMessage = `Order details created successfully!`; // Lưu thông báo thành công
              // Hiển thị thông báo
              // setTimeout(() => {
              //   navigate("/home/activity/ongoing");
              // }, 2000);
              socket.emit(
                "send_order",
                response.data[0],
                props.Seller?.[0].MaNguoiBan
              );
              return successMessage;
            },
            // success: () => {
            //   return "Order details created successfully!"
            // },
            error: (err) => {
              return `Error creating order details: ${err.message}`;
            },
          }
        );

        if (TrangThaiThanhToan === false) {
          toast.promise(
            (async () => {
              const responseOrder = await axios.post(
                urlPayment,
                {
                  MaDonHang: response.data[0].MaDonHang,
                  DiaChiDen:
                    mainAddress !== undefined
                      ? mainAddress
                      : detailsOrder.address,
                  TrangThai: 1,
                  GiaBan: total,
                  MaTaiXe: null,
                  MaNguoiMua: userData.MaNguoiDung,
                  MaKhuyenMai: detailsOrder.promotions?.MaKhuyenMai || null,
                  TrangThaiThanhToan: false,
                  MaPhuongThucGiaoDich: parseInt(detailsOrder.paymentMethod),
                  LoiNhan: detailsOrder.suggestion,
                  ListItems: reponseDetailsOrder?.data,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenValue}`,
                  },

                  withCredentials: true,
                }
              );
              return responseOrder;
            })(),
            {
              loading: "Wait for our payment...",
              success: (response) => {
                // console.log("Response: " + response);
                const successMessage = response.data.return_message;
                if (response.data.return_code !== 1) {
                  const failedMessage = "Something went wrong";
                  return failedMessage;
                }
                window.location.href = response.data.order_url;
                socket.emit(
                  "send_order",
                  response.data[0],
                  props.Seller?.[0].MaNguoiBan
                );
                // navigate("/" + response.data.order_url);
                return successMessage;
              },
              error: (err) => {
                return `Error creating order details: ${err.message}`;
              },
            }
          );
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate("/home/activity/ongoing");
        }
      } else {
        toast.error("You must add your order");
      }
    } catch (err) {
      toast.error("An error occurred while processing your order!");
      console.log(err);
    }
  };
  return (
    <div className="sticky-div">
      <div className="pr-16 -ml-6 ">
        <div className="border shadow-xl bg-white border-gray-300 rounded-2xl w-full orderBox p-4 grid grid-rows-9 gap-3">
          <div className="text-xl font-bold pb-2 flex items-center gap-3">
            {props.img !== null ? (
              <img
                src={localStaticFile + props.img}
                alt=""
                className="w-10 h-10 rounded-full"
              />
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
                            src={localStaticFile + order.AnhMonAn}
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
          {mainAddress === undefined && (
            <div className="flex items-center">
              <input
                placeholder="enter your address"
                type="text"
                name="address"
                onChange={handleChangeAddress}
                className=" rounded-l-lg px-2 border border-gray-400 h-full w-full"
              />
              <div className="w-2/12 justify-center bg-pink-500 h-full rounded-r-lg flex items-center">
                <GoHome className="font-bold text-white text-3xl " />
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <select
              name="promotions"
              onChange={handlePromotionChange}
              className="w-full border border-gray-300 p-2"
            >
              <option value="" hidden>
                Choose promotion
              </option>
              {props.lstPromotions.map((promotion) => {
                return (
                  <option
                    disabled={promotion.SoLuong < 1 ? true : false}
                    className=""
                    key={promotion.MaKhuyenMai}
                    value={promotion.MaKhuyenMai}
                  >
                    {promotion.TenKhuyenMai} ({" "}
                    <span className="">
                      Amount:{" "}
                      {promotion.SoLuong < 1 ? "Sold out" : promotion.SoLuong}
                    </span>
                    )
                  </option>
                );
              })}
              <option value="remove" className="">
                Remove promotion
              </option>
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
              {paymentMethod.map((payment) => {
                return (
                  <option
                    key={payment.MaPhuongThucGiaoDich}
                    value={payment.MaPhuongThucGiaoDich}
                  >
                    {payment.TenPhuongThucGiaoDich}
                  </option>
                );
              })}
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
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            zIndex: 9999,
          },
          success: {
            style: {
              border: "2px solid gray",
              background: "green",
              color: "white",
              fontWeight: "bold",
            },
          },
          error: {
            style: {
              border: "2px solid gray",
              background: "red",
              color: "white",
              fontWeight: "bold",
            },
          },
          loading: {
            style: {
              border: "2px solid gray",
              background: "#D1006B",
              color: "white",
              fontWeight: "bold",
            },
          },
        }}
      />
    </div>
  );
}
