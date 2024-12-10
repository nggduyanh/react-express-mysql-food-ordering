import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import axios from "axios";
import {
  GetSellerInfo,
  refreshPage,
  FoodsType,
  FoodsTypeAdd,
  FoodsTypeDelete,
  FoodsTypeUpdate,
} from "../../Route";
import { FaMinusCircle } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import toast from "react-hot-toast";

export default function FoodType() {
  const [foodType, setFoodType] = useState({
    TenLoaiMonAn: "",
  });
  const [foodTypeList, setFoodTypeList] = useState([]);
  const tokenValue = JSON.parse(localStorage.getItem("token")).token;
  const [seller, setSeller] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentType, setCurrentType] = useState({});
  const [isClose, setIsClose] = useState(true);
  useEffect(() => {
    const getSeller = async () => {
      const response = await axios.get(GetSellerInfo, {
        headers: {
          Authorization: "Bearer " + tokenValue,
        },
      });
      const data = response.data;
      setSeller(data[0]);
    };
    getSeller();
  }, [tokenValue]);
  useEffect(() => {
    if (seller) {
      const getFoodTypeList = async () => {
        const response = await axios.get(FoodsType, {
          headers: {
            Authorization: "Bearer " + tokenValue,
          },
        });
        const data = response.data;
        const filterData = data.filter((type) => {
          return type.MaNguoiBan === seller?.MaNguoiBan;
        });
        setFoodTypeList(filterData);
      };
      getFoodTypeList();
    }
  }, [seller, tokenValue]);
  const handleChangeType = (event) => {
    const { name, value } = event.target;
    setFoodType((prevFood) => {
      return {
        ...prevFood,
        [name]: value,
      };
    });
  };
  const handleAddFoodType = async (event) => {
    event.preventDefault();

    if (foodType.TenLoaiMonAn === "") {
      toast.error("Please enter your food type");
    } else {
      try {
        const response = await axios.post(
          FoodsTypeAdd,
          {
            MaNguoiBan: seller?.MaNguoiBan,
            TenLoaiMonAn: foodType.TenLoaiMonAn,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tokenValue,
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          alert("Created successfully");
          refreshPage();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleDeleteFoodType = async (id) => {
    console.log(id);
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.delete(FoodsTypeDelete, {
          data: {
            MaNguoiBan: seller?.MaNguoiBan,
            MaLoaiMonAn: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenValue,
          },
        });
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 204
        ) {
          refreshPage();
        }
      })(),
      {
        loading: "Deleteing...",
        success: "Delete success",
        error: (err) => console.log(err) || "Error deleting",
      }
    );
  };
  const handleUpdateFoodType = async (event) => {
    event.preventDefault();
    console.log(currentType?.MaLoaiMonAn);
    if (foodType.TenLoaiMonAn === "") {
      toast.error("Please update your food type");
    } else {
      toast.promise(
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const response = await axios.patch(
            FoodsTypeUpdate,
            {
              TenLoaiMonAn: foodType.TenLoaiMonAn,
              MaLoaiMonAn: currentType?.MaLoaiMonAn,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokenValue,
              },
            }
          );
          if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 204
          ) {
            refreshPage();
          }
        })(),
        {
          loading: "Update...",
          success: "Update success",
          error: (err) => console.log(err) || "Error update",
        }
      );
    }
  };
  const getCurrentIdType = async (id) => {
    // console.log(id);
    const response = await axios.get(FoodsType + `/${id}`, {
      headers: {
        Authorization: "Bearer " + tokenValue,
      },
    });
    const data = response.data;
    setCurrentType(data[0]);
  };
  useEffect(() => {
    if (currentType) {
      setFoodType((prevType) => {
        return {
          ...prevType,
          TenLoaiMonAn: currentType?.TenLoaiMonAn || "",
        };
      });
    } else {
      setFoodType((prevType) => {
        return {
          ...prevType,
          TenLoaiMonAn: "",
        };
      });
    }
  }, [currentType,tokenValue]);
  return (
    <div className="">
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <h1 className="text-2xl font-medium mb-6">Food type</h1>
            <div>
              <p className="ml-5">FoodType list</p>
              <div className="flex items-center gap-5 justify-items-center">
                {foodTypeList?.length > 0 ? (
                  foodTypeList.map((items) => {
                    return (
                      <div
                        key={items.MaLoaiMonAn}
                        className="flex items-center text-center w-max rounded-xl p-2 gap-2 my-2 bg-orange-500 text-white font-bold "
                      >
                        <GrUpdate
                          className="cursor-pointer"
                          onClick={() => {
                            setIsUpdate(true);
                            getCurrentIdType(items.MaLoaiMonAn);
                          }}
                        />
                        <p>{items.TenLoaiMonAn}</p>
                        <FaMinusCircle
                          className="cursor-pointer"
                          onClick={
                            () => {
                              setIsClose(false);
                              getCurrentIdType(items.MaLoaiMonAn);
                            }
                            // handleDeleteFoodType(items.MaLoaiMonAn)
                          }
                        />
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <p>No list of foodtype was created</p>
                  </div>
                )}
              </div>
            </div>
            {!isClose && (
              <div className="fixed top-1/2 -translate-y-1/2 left-1/2 text-center -translate-x-1/2 w-1/4 h-1/6 bg-white rounded-lg border border-orange-500">
                <p className="mt-3 text-md p-2">
                  Are you sure you want to delete your type food?
                </p>
                <div className="flex items-center justify-center gap-5">
                  <button
                    onClick={() =>
                      handleDeleteFoodType(currentType?.MaLoaiMonAn)
                    }
                    className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setIsClose(true)}
                    className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <br />
            <form className="flex flex-col gap-6">
              <input
                type="text"
                name="TenLoaiMonAn"
                value={foodType.TenLoaiMonAn}
                onChange={handleChangeType}
                className="border border-orange-500 p-4 rounded-lg"
                placeholder="Enter your food type (ex: Món nước, đồ chiên rán,...)"
              />
              <div className="flex items-center justify-end gap-3">
                {isUpdate ? (
                  <button
                    onClick={handleUpdateFoodType}
                    className="w-min self-end bg-orange-500 text-white font-bold px-10 py-2 rounded-2xl transition-all duration-150 ease-in hover:bg-orange-700"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={handleAddFoodType}
                    className="w-min self-end bg-orange-500 text-white font-bold px-10 py-2 rounded-2xl transition-all duration-150 ease-in hover:bg-orange-700"
                  >
                    Add
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
