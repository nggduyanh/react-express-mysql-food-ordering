import { useParams } from "react-router-dom";
import ResInfo from "./InfoRes/ResInfo";
import GridDiv from "../Function/GridDiv";
import {
  FaSortAlphaDown,
  FaSortNumericUp,
  FaSortNumericDownAlt,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Layout/LayoutHeader";
import axios from "axios";
import { GetTypeRes, searchUrl } from "../Route";
import useFetchData from "../Hook/useFetchData";
export default function TypeRes() {
  const typeValue = useParams();
  const { tokenValue } = useContext(UserContext);
  // const getDataFromParams = typeValue.type.slice(1, typeValue.type.length + 1);
  const [listType, setListType] = useState([]);
  const typeFood = useFetchData(GetTypeRes, tokenValue);
  useEffect(() => {
    const getResTaurants = async () => {
      const response = await axios.get(searchUrl + `${typeValue.type}`, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setListType(data);
      } else {
        setListType([]);
      }
    };
    getResTaurants();
  }, [typeValue, tokenValue]);
  const list = listType
    .map((res) => {
      const foodType = typeFood?.[0]?.data?.filter((type) => {
        return type?.MaNguoiBan === res.tmp?.MaNguoiBan;
      });
      return {
        ...res,
        NguoiBan: {
          ...res.NguoiBan,
          loaiMonAn: foodType,
        },
      };
    })
    .map((items) => {
      return (
        <ResInfo {...items.NguoiBan} key={items.tmp.MaNguoiBan}>
          <p className="text-xl font-bold">{items.NguoiBan.TenNguoiBan} </p>
          <i className="text-gray-500">
            {items.NguoiBan.loaiMonAn.map((loaiMonAn) => {
              return loaiMonAn.TenLoaiMonAn + " ";
            })}
          </i>
          <p className="text-md text-gray-500">
            Time: {items.NguoiBan.ThoiGianMoCua} -{" "}
            {items.NguoiBan.ThoiGianDongCua}
          </p>
        </ResInfo>
      );
    });

  // const listFood = useFilterRes_Type(getDataFromParams, tokenValue).map(
  //   (res) => {
  //     return (
  //       <ResInfo {...res} key={res.id}>
  //         <p className="text-xl font-bold">{res.TenNguoiBan} </p>
  //         <i className="text-gray-500">
  //           {res.loaiMonAn.map((loaiMonAn) => {
  //             return loaiMonAn.TenLoaiMonAn + " ";
  //           })}
  //         </i>
  //         <p className="text-md text-gray-500">
  //           Time: {res.ThoiGianMoCua} - {res.ThoiGianDongCua}
  //         </p>
  //       </ResInfo>
  //     );
  //   }
  // );
  const compareAToZ = (a, b) =>
    a.NguoiBan.TenNguoiBan.localeCompare(b.NguoiBan.TenNguoiBan);
  const compareRatingIncrease = (a, b) => a.NguoiBan.Diem - b.NguoiBan.Diem;
  const compareRatingDecrease = (a, b) => b.NguoiBan.Diem - a.NguoiBan.Diem;

  // Sort functions
  const handleSortA_Z = () => {
    const sortedList = [...listType].sort(compareAToZ);
    setListType(sortedList);
  };

  const handleSortIncrease = () => {
    const sortedList = [...listType].sort(compareRatingIncrease);
    setListType(sortedList);
  };

  const handleSortDecrease = () => {
    const sortedList = [...listType].sort(compareRatingDecrease);
    setListType(sortedList);
  };
  return (
    <div className="marginJustification min-h-screen">
      <p className="text-2xl font-bold my-4">
        Restaurant type {typeValue.type}
      </p>
      <div className="filterOption flex items-center gap-3 ml-2">
        <button
          onClick={handleSortA_Z}
          className="flex items-center gap-2 p-2 border font-bold hover:bg-green-500 hover:text-white hover:border-white transition-all ease-in border-gray-500 rounded-md"
        >
          A - Z <FaSortAlphaDown />
        </button>
        <button
          onClick={handleSortIncrease}
          className="flex items-center gap-2 p-2 border font-bold hover:bg-blue-500 hover:text-white hover:border-white transition-all ease-in border-gray-500 rounded-md"
        >
          Increase <FaSortNumericUp />
        </button>
        <button
          onClick={handleSortDecrease}
          className="flex items-center gap-2 p-2 border font-bold hover:bg-red-500 hover:text-white hover:border-white transition-all ease-in border-gray-500 rounded-md"
        >
          Decrease <FaSortNumericDownAlt />
        </button>
      </div>
      {list.length !== 0 ? (
        <GridDiv cols={4} classname="listFood">
          {list}
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
