import ResInfo from "./InfoRes/ResInfo";
import GridDiv from "../Function/GridDiv";
import { FaSearch } from "react-icons/fa";
import useFilterRes_Type from "../Hook/useFilterRes_Type";
import Search from "../Function/Search";
export default function ListRes() {
  const listFood = useFilterRes_Type().map((res) => {
    return (
      <ResInfo {...res} key={res.id}>
        <p className="text-xl font-bold">{res.TenNguoiBan} </p>
        <i>
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
  const handleChangeSearch = (event) => {};
  return (
    <div className="marginJustification min-h-screen">
      <p className="text-2xl font-bold my-4">Good food near you</p>
      <Search />
      <GridDiv cols={4} classname="listFood mt-5">
        {listFood}
      </GridDiv>
    </div>
  );
}
