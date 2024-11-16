import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { handleRefreshPage } from "../../routebackend";
export default function SellerType() {
  const tokenValue = JSON.parse(localStorage.getItem("token")).token;
  const [SellerListType, setSellerListType] = useState([]);
  const [seller, setSeller] = useState({});
  const [listSellerType, setListSellerType] = useState([]);
  useEffect(() => {
    const getSellerListType = async () => {
      const response = await axios.get("http://localhost:3030/loainguoiban", {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      const data = response.data;
      setSellerListType(data);
    };
    getSellerListType();
  }, [tokenValue]);
  useEffect(() => {
    const getSeller = async () => {
      const response = await axios.get(
        "http://localhost:3030/nguoiban/current",
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      const data = response.data;
      setSeller(data[0]);
    };
    getSeller();
  }, [tokenValue]);
  useEffect(() => {
    const getListType = async () => {
      const response = await axios.get(
        `http://localhost:3030/loainguoiban/nguoiban/${seller?.MaNguoiBan}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      const data = response.data;
      setListSellerType(data);
    };
    getListType();
  }, [seller, tokenValue]);
  const handleChoosSellerType = async (id) => {
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await axios.post(
          "http://localhost:3030/nguoiban/loainguoiban/add",
          {
            MaNguoiBan: seller?.MaNguoiBan,
            MaLoaiNguoiBan: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        if (response.status === 201) {
          handleRefreshPage();
        }
      })(),
      {
        loading: "Waiting to add seller type...",
        success: "Success adding",
        error: (err) => console.log(err) || "Error adding",
      }
    );
  };
  const handleDeleteSellerType = async (id) => {
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.delete(
          "http://localhost:3030/nguoiban/loainguoiban/delete",
          {
            data: {
              MaNguoiBan: seller?.MaNguoiBan,
              MaLoaiNguoiBan: id,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        if (response.status === 204) {
          handleRefreshPage();
        }
      })(),
      {
        loading: "Waiting to delete seller type...",
        success: "Success delete",
        error: (err) => console.log(err) || "Error deleting",
      }
    );
  };
  console.log(listSellerType);
  return (
    <div className="">
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <h1 className="text-2xl font-medium mb-6">Seller type</h1>
            <div>
              <p className="ml-5 my-5">Seller TypeList list</p>
              {SellerListType?.length > 0 && (
                <div className="grid grid-cols-6 gap-3">
                  {SellerListType.map((items) => {
                    const filterSellerType = listSellerType.some((type) => {
                      return type.MaLoaiNguoiBan === items.MaLoaiNguoiBan;
                    });
                    return (
                      <div
                        className="bg-orange-500 flex items-center justify-between text-white font-bold p-3 rounded-lg mb-3 hover:bg-orange-700 transition-all duration-150 ease-in"
                        key={items.MaLoaiNguoiBan}
                      >
                        <FaPlusCircle
                          onClick={() =>
                            filterSellerType
                              ? null
                              : handleChoosSellerType(items.MaLoaiNguoiBan)
                          }
                          className={`${
                            filterSellerType ? "text-gray-500" : ""
                          } cursor-pointer`}
                        />
                        {items.TenLoaiNguoiBan}
                        <FaMinusCircle
                          onClick={() =>
                            !filterSellerType
                              ? null
                              : handleDeleteSellerType(items.MaLoaiNguoiBan)
                          }
                          className={`${
                            !filterSellerType ? "text-gray-500" : ""
                          } cursor-pointer`}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <br />
          </section>
        </div>
      </div>
    </div>
  );
}
