import { useEffect, useReducer, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  formatCurrency,
  formatDate,
  getDetailsOrder,
  GetTypeRes,
  localStaticFile,
} from "../../Route";
import axios from "axios";

const OrderAction = {
  orderDetaiInfo: [],
  sellerInfo: [],
};

const OrderReducer = (state, action) => {
  switch (action.type) {
    case "ORDER": {
      return {
        ...state,
        orderDetaiInfo: action.payload,
      };
    }
    case "SELLER": {
      return {
        ...state,
        sellerInfo: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default function OrderStatus(props) {
  const { tokenValue, userData, setIsCloseFunct } = useOutletContext();
  const { orderStatus } = useOutletContext();
  const [orderDetails, dispatch] = useReducer(OrderReducer, OrderAction);
  const [seller, setSeller] = useState({});
  useEffect(() => {
    fetch(getDetailsOrder + `${props.MaDonHang}`, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No food was found");
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "ORDER", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.MaDonHang, tokenValue]);
  useEffect(() => {
    const getNguoiBan = async () => {
      try {
        const response = await axios.get("http://localhost:3030/nguoiban", {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });
        const seller = response.data;
        const filterSeller = seller.find((seller) => {
          return (
            seller.MaNguoiBan ===
            orderDetails.orderDetaiInfo?.[0]?.MonAn?.MaNguoiBan
          );
        });
        const responseFilterFood = await axios.get(GetTypeRes, {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });
        const data = responseFilterFood.data;
        const filterFoodType = data.filter((food) => {
          return food.MaNguoiBan === filterSeller?.MaNguoiBan;
        });

        setSeller({
          ...filterSeller,
          loaiMonAn: filterFoodType,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getNguoiBan();
  }, [tokenValue, orderDetails.orderDetaiInfo]);

  let colorStatus = " ";
  let nameStatus = " ";
  if (props.TrangThai === orderStatus?.[4].MaTrangThai) {
    colorStatus = "bg-red-500";
    nameStatus = orderStatus[4].TenTrangThai;
  } else if (props.TrangThai === orderStatus?.[3].MaTrangThai) {
    colorStatus = "bg-green-500";
    nameStatus = orderStatus[3].TenTrangThai;
  } else {
    colorStatus = "bg-yellow-500";
    if (props.TrangThai === orderStatus?.[0].MaTrangThai)
      nameStatus = orderStatus[0].TenTrangThai;
    else if (props.TrangThai === orderStatus?.[1].MaTrangThai)
      nameStatus = orderStatus[1].TenTrangThai;
    else if (props.TrangThai === orderStatus?.[2].MaTrangThai)
      nameStatus = orderStatus[2].TenTrangThai;
  }

  return (
    <div className="bg-white p-4 rounded-xl mb-3">
      <div className="flex justify-between mb-2">
        <div className="flex gap-3">
          {seller.AnhNguoiBan && seller.AnhNguoiBan !== null ? (
            <img
              src={localStaticFile + seller.AnhNguoiBan}
              className="w-48 h-28 rounded-lg"
            />
          ) : (
            <img
              src="/resDefault.jpg"
              alt=""
              className="w-48 h-28 rounded-lg"
            />
          )}
          <div>
            <p className="font-bold text-2xl">{seller.TenNguoiBan}</p>
            <p>Ordered by: {userData.TenNguoiDung}</p>
            <p>Address going to: {props.DiaChiDen}</p>
            <p>OrderID: {props.MaDonHang}</p>

            {/* <Link to="/activity/:123" className="mt-3 text-red-500">
              View Details
            </Link> */}
          </div>
        </div>
        <div className="text-center">
          <p className={`${colorStatus} text-white rounded-md p-1`}>
            {nameStatus}
          </p>
          <p>{formatDate(props.ThoiGianTao)}</p>
        </div>
      </div>
      <hr />

      <div className="detailsOrders flex items-center justify-between text-xs ">
        <div className="listOrder py-4">
          <div>
            {orderDetails.orderDetaiInfo.map((order) => {
              return (
                <div
                  key={order.ChiTietDonHang.MaMonAn}
                  className="flex items-center"
                >
                  <p className="mr-2">{order.MonAn.TenMonAn}</p> x
                  <p className="ml-2">{order.ChiTietDonHang.SoLuong}</p>
                  <p className="ml-2">
                    ({formatCurrency(order.MonAn.GiaBan)}{" "}
                    <span className="font-bold">each</span>)
                  </p>
                </div>
              );
            })}
            <p>Note: {props.LoiNhan !== null ? props.LoiNhan : "No note"}</p>
          </div>
        </div>
        <div className="pay flex place-items-center gap-2">
          <div>
            <p className="">Total payment</p>
            <strong className="text-green-600">
              {formatCurrency(props.GiaBan)}
            </strong>
          </div>
          <Link
            to={`/home/restaurant/:${seller.TenNguoiBan}`}
            state={seller}
            className="py-2 px-4 bg-red-500 text-white rounded-md"
          >
            Reorder
          </Link>
          <button className="py-2 px-4 border-red-500 border text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200 ease-in">
            Help
          </button>
          <button
            onClick={() => {
              setIsCloseFunct(false, props);
            }}
            className="py-2 px-4 bg-gray-300 font-bold border-gray-300 border text-gray-500 rounded-md hover:bg-gray-500 hover:text-white transition-all duration-200 ease-in"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
