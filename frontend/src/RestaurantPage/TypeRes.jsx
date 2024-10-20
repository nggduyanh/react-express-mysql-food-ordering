import { useParams } from "react-router-dom";
import ResInfo from "./InfoRes/ResInfo";
import GridDiv from "../Function/GridDiv";
import useFilterRes_Type from "../Hook/useFilterRes_Type";
import {
  FaSortAlphaDown,
  FaSortNumericUp,
  FaSortNumericDownAlt,
} from "react-icons/fa";
export default function TypeRes() {
  const typeValue = useParams();
  const getDataFromParams = typeValue.type.slice(1, typeValue.type.length + 1);
  const listFood = useFilterRes_Type(getDataFromParams).map((res) => {
    return (
      <ResInfo {...res} key={res.id}>
        <p className="text-xl font-bold">{res.TenNguoiBan} </p>
        <i className="text-gray-500">
          {res.loaiMonAn.map((loaiMonAn) => {
            return loaiMonAn.TenLoaiMonAn + " ";
          })}
        </i>
        <p className="text-md text-gray-500">
          Time: {res.ThoiGianMoCua} - {res.ThoiGianDongCua}
        </p>
      </ResInfo>
    );
  });
  const handleA_Z = () => {};
  const handleIncrease = () => {};
  const handleDecrease = () => {};
  return (
    <div className="marginJustification min-h-screen">
      <p className="text-2xl font-bold my-4">
        Restaurant type {typeValue.type}
      </p>
      <div className="filterOption flex items-center gap-3 ml-2">
        <button className="flex items-center gap-2 p-2 border font-bold hover:bg-green-500 hover:text-white hover:border-white transition-all ease-in border-gray-500 rounded-md">
          A - Z <FaSortAlphaDown />
        </button>
        <button className="flex items-center gap-2 p-2 border font-bold hover:bg-blue-500 hover:text-white hover:border-white transition-all ease-in border-gray-500 rounded-md">
          Increase <FaSortNumericUp />
        </button>
        <button className="flex items-center gap-2 p-2 border font-bold hover:bg-red-500 hover:text-white hover:border-white transition-all ease-in border-gray-500 rounded-md">
          Decrease <FaSortNumericDownAlt />
        </button>
      </div>
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
