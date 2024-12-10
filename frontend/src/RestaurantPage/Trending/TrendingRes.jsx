import { useContext } from "react";
import useFilterRes_Type from "../../Hook/useFilterRes_Type";
import ResInfo from "../InfoRes/ResInfo";
import { UserContext } from "../../Layout/LayoutHeader";

export default function TrendingRes() {
  const { tokenValue } = useContext(UserContext);
  const trendingFood = useFilterRes_Type(" ", tokenValue)
    .filter((res) => res.LuotDanhGia > 0)
    .sort(
      (a, b) =>
        Math.round(b.Diem / b.LuotDanhGia) - Math.round(a.Diem / a.LuotDanhGia)
    )
    .map((res) => {
      return (
        <ResInfo key={res.MaNguoiBan} {...res}>
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
    <>
      <p className="text-2xl mb-3 pt-2">Trending Restaurant</p>
      <div className="grid grid-cols-4 gap-3">{trendingFood.slice(0, 4)}</div>
    </>
  );
}
