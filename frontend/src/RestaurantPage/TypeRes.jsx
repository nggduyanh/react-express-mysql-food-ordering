import { useParams } from "react-router-dom";
import ResInfo from "./InfoRes/ResInfo";
import GridDiv from "../Function/GridDiv";
import useFilterRes_Type from "../Hook/useFilterRes_Type";
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
  return (
    <div className="marginJustification min-h-screen">
      <p className="text-2xl font-bold my-4">
        Restaurant type {typeValue.type}
      </p>
      <div className="filterOption">
        <select
          name=""
          id=""
          className="min-w-36 border border-gray-500 p-2 ml-2 rounded-xl"
        >
          <option value="" hidden>
            Filter
          </option>
          <option value="">A-Z</option>
          <option value=""></option>
          <option value=""></option>
        </select>
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
