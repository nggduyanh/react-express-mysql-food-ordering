import ResInfo from "./InfoRes/ResInfo";
import GridDiv from "../Function/GridDiv";
import useFilterRes_Type from "../Hook/useFilterRes_Type";
import Search from "../Function/Search";
import { useContext, useState } from "react";
import { UserContext } from "../Layout/LayoutHeader";

export default function ListRes() {
  const [search, setSearch] = useState("");
  const { tokenValue } = useContext(UserContext);
  const listFood = useFilterRes_Type(search, tokenValue)?.map((res) => {
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

  return (
    <div className="marginJustification min-h-screen">
      <p className="text-2xl font-bold my-4">Good food near you</p>
      <Search searchResult={(val) => setSearch(val)} />
      <GridDiv cols={4} classname="listFood my-10">
        {listFood}
      </GridDiv>
    </div>
  );
}
