import { useMemo } from "react";
import useFetchData from "./useFetchData";
import { GetRestaurant, GetTypeRes } from "../Route";

export default function useFilterRes_Type(valueFilter = " ") {
  const [Restaurant, setRestaurant] = useFetchData(GetRestaurant);
  const [typeRes, setTypeRes] = useFetchData(GetTypeRes);
  const listRestaurant = useMemo(
    () =>
      Restaurant.map((items) => {
        const filterType = typeRes.filter((type) => {
          return type.MaNguoiBan === items.MaNguoiBan;
        });
        return {
          ...items,
          loaiMonAn: filterType,
        };
      }),
    [Restaurant, typeRes]
  );
  const filterRes = useMemo(() => {
    const trimValueFilter = valueFilter.trim();
    return listRestaurant.filter((value) => {
      const matchesName = value.TenNguoiBan.includes(trimValueFilter);
      const matchesTypeFood = value.loaiMonAn.some((food) =>
        food.TenLoaiMonAn.includes(trimValueFilter)
      );
      return matchesName || matchesTypeFood;
    });
  }, [listRestaurant, valueFilter]);
  if (filterRes.length !== 0) {
    return filterRes;
  }
  return listRestaurant;
}
