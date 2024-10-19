import useFilterRes_Type from "../../Hook/useFilterRes_Type";
import ResInfo from "../InfoRes/ResInfo";

export default function TrendingRes() {
  const trendingFood = useFilterRes_Type()
    .sort((a, b) => b.Diem - a.Diem)
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
