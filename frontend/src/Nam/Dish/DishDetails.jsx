import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  formatCurrency,
  formatDate,
  formatTime,
  GetFoodTypeRestaurant,
  // GetUserInfo,
  handleRefreshPage,
  localStaticFile,
  RepComment,
} from "../../routebackend";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
// import useFetchData from "../Components/useFetchData";
import axios from "axios";
import {
  GetAllUser,
  GetSellerInfo,
  SellerComment,
  updateSellerComment,
} from "../../Route";
import toast from "react-hot-toast";

export default function DishDetails() {
  const data = useLocation();
  const detailsFood = data.state;
  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  // let userData = useFetchData(GetUserInfo, tokenValue);
  // const userInfo = userData?.data?.[0];
  // console.log("userInfo", userData);
  const [seller, setSeller] = useState({});
  const [typeFood, setTypeFood] = useState([]);
  useEffect(() => {
    fetch(GetFoodTypeRestaurant, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("List empty");
        }
        return res.json();
      })
      .then((data) => {
        const filterTypeFood = data.filter((type) => {
          return type.MaLoaiMonAn === detailsFood.MaLoaiMonAn;
        });
        setTypeFood(filterTypeFood);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setTypeFood([]);
        } else console.log("Another error", err.message);
      });
  }, [detailsFood, tokenValue]);
  //http://localhost:3030/nguoiban/nhanxet/1
  useEffect(() => {
    const getSeller = async () => {
      try {
        const response = await axios.get(GetSellerInfo, {
          headers: {
            Authorization: "Bearer " + tokenValue,
          },
        });
        const data = response.data;
        setSeller(data[0]);
      } catch (err) {
        console.log("Something went wrong");
      }
    };
    getSeller();
  }, [tokenValue]);
  const [NhanXet, setNhanXet] = useState([]);
  useEffect(() => {
    if (seller && seller.MaNguoiBan) {
      fetch(SellerComment + `${seller?.MaNguoiBan}`, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("List empty");
          }
          return res.json();
        })
        .then((data) => {
          const filterData = data?.[0].NhanXet.filter((item) => {
            // return item?.MonAn?.MaMonAn === detailsFood.MaMonAn;
            return item.MaMonAn === detailsFood?.MaMonAn;
          });
          setNhanXet(filterData);
        })
        .catch((err) => {
          console.log(err);
          if (err.message.includes("404")) {
            setNhanXet([]);
          } else console.log("Another error", err.message);
        });
    }
  }, [seller, tokenValue]);
  // console.log(NhanXet?.[0]?.NhanXet.MaNguoiMua);
  const [Buyers, setBuyers] = useState([]);
  useEffect(() => {
    fetch(GetAllUser, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("List empty");
        }
        return res.json();
      })
      .then((data) => {
        setBuyers(data);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setBuyers([]);
        } else console.log("Another error", err.message);
      });
  }, [tokenValue]);

  const [showRep, setShowRep] = useState(false);
  const handleRep = () => {
    setShowRep(!showRep);
  };

  const [RepNhanXet, setRepNhanXet] = useState({
    MaMonAn: detailsFood?.MaMonAn,
    TraLoi: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRepNhanXet((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(RepNhanXet);
  };

  const handleSubmit = async (id) => {
    try {
      if (RepNhanXet.TraLoi === "") {
        toast.error("Please enter your reply");
      } else {
        const response = await axios.patch(
          updateSellerComment,
          {
            MaNguoiMua: id,
            MaMonAn: RepNhanXet.MaMonAn,
            TraLoi: RepNhanXet.TraLoi,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          alert("Rep successful");
          handleRefreshPage();
        } else {
          console.error("Failed to update. Status:", response.status);
          alert("Failed to update. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error adding:", err);
    }
  };

  const list = NhanXet.map((item) => {
    return (
      <div key={item?.MaNguoiDung} className="">
        <div className="flex items-center gap-3">
          <img
            src={
              item.AnhNguoiDung && item.AnhNguoiDung !== null
                ? localStaticFile + item.AnhNguoiDung
                : `../../images/avatar.png`
            }
            alt=""
            className="rounded-full self-start w-10 h-10"
          />
          <div className="flex flex-col w-full ">
            <div className="flex flex-col">
              <p className="text-md text-pink-500 font-bold">
                {item?.MaNguoiDung}
                {Buyers.find((buyer) => buyer?.MaNguoiDung === item?.MaNguoiMua)
                  ?.TenNguoiDung || "N/A"}
                <span className="text-xs text-gray-500 ml-2">
                  {formatDate(item?.ThoiGianTao)}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  {formatTime(item?.ThoiGianTao)}
                </span>
              </p>
              <span className="text-sm">Diem: {item?.Diem}</span>
            </div>
            <p className="mb-2">{item?.NoiDung}</p>
            {item.AnhNhanXet.length !== 0 && (
              <div className="flex items-center">
                {item.AnhNhanXet.map((items, index) => {
                  return (
                    <img
                      key={index}
                      src={localStaticFile + items}
                      className="w-20 h-20 rounded-md"
                    />
                  );
                })}
              </div>
            )}
            <p className="mb-3 text-red-500 font-bold">
              {item?.TraLoi && item?.TraLoi !== ""
                ? item?.TraLoi + " (from you)"
                : ""}
            </p>
          </div>
        </div>
        <textarea
          name="TraLoi"
          id=""
          onChange={handleChange}
          className="px-2 py-1 w-full rounded-lg mb-2 border border-default-200"
          placeholder="Reply"
        ></textarea>
        <button
          className="border border-t-orange-500 border-white w-full bg-orange-500 text-white font-bold text-center rounded-lg mb-3"
          onClick={() => handleSubmit(item.MaNguoiMua)}
        >
          Commit
        </button>
      </div>
    );
  });
  return (
    <div className="">
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <h1>Food Name</h1>
            <Link to="/dish">
              <h3>Back to list</h3>
            </Link>
            <div className="pt-6 grid grid-cols-2 gap-6">
              <div className="border border-default-200 p-6 rounded-lg">
                <div className="flex justify-center items-center">
                  <img
                    src={
                      detailsFood?.AnhMonAn && detailsFood?.AnhMonAn !== null
                        ? localStaticFile + detailsFood?.AnhMonAn
                        : `./images/Dashboard/burito1.png`
                    }
                    alt=""
                    className="mx-9 w-full h-full"
                  />
                </div>
                {/* <div className="flex gap-2 h-32 justify-center">
                                    <div className="border border-[#F58220] rounded-lg overflow-hidden h-32 w-32">
                                        <img src="./images/Dashboard/burito2.png" alt="" className="h-full" />
                                    </div>
                                    <div className="border border-[#F58220] rounded-lg overflow-hidden h-32 w-32">
                                        <img src="./images/Dashboard/burito1.png" alt="" className="h-full" />
                                    </div>
                                    <div className="border border-[#F58220] rounded-lg overflow-hidden h-32 w-32">
                                        <img src="./images/Dashboard/burito3.png" alt="" className="h-full" />
                                    </div>
                                </div> */}
              </div>
              <div className="border border-default-200 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h1 className="text-4xl">{detailsFood.TenMonAn}</h1>
                  <h3 className="text-3xl">
                    {formatCurrency(detailsFood.GiaBan)}
                  </h3>
                </div>

                <p className="mb-4 text-md text-default-500">
                  {detailsFood.MoTa}
                </p>
                <div className="flex mb-4 gap-2">
                  {typeFood.map((type) => {
                    return (
                      <div
                        key={type}
                        className="rounded-full border border-default-200 px-3 py-1.5 text-xs"
                      >
                        {type.TenLoaiMonAn}
                      </div>
                    );
                  })}
                </div>
                <h4 className="text-xl mb-4">Đánh giá</h4>
                <div className=" overflow-auto max-h-[600px]">{list}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
