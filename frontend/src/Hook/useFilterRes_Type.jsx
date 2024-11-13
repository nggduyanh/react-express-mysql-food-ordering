import { useMemo } from "react";
import useFetchData from "./useFetchData";
import { GetRestaurant, GetTypeRes } from "../Route";

export default function useFilterRes_Type(valueFilter = " ", tokenValue) {
  const [Restaurant, restaurantError] = useFetchData(GetRestaurant, tokenValue);
  const [typeRes, TypeError] = useFetchData(GetTypeRes, tokenValue);

  const listRestaurant = useMemo(() => {
    if (!Restaurant.data || !typeRes.data) return [];
    return Restaurant.data.map((items) => {
      const filterType = typeRes.data.filter((type) => {
        return type.MaNguoiBan === items.MaNguoiBan;
      });
      return {
        ...items,
        loaiMonAn: filterType,
      };
    });
  }, [Restaurant, typeRes]);
  // useEffect(() => {
  //   const getValueSearch = async () => {
  //     const response = await axios.get(searchUrl + `${valueFilter}`, {
  //       headers: { Authorization: `Bearer ${tokenValue}` },
  //     });
  //     const data = response.data;
  //     console.log("Search: ", data);
  //   };
  //   getValueSearch();
  // }, [valueFilter]);
  const filterRes = useMemo(() => {
    const trimValueFilter = valueFilter.trim();
    return listRestaurant.filter((value) => {
      const matchesName = value.TenNguoiBan.includes(trimValueFilter);
      const matchesTypeFood = value.loaiMonAn.some((food) =>
        food.TenLoaiMonAn.includes(trimValueFilter)
      );
      const matchesPlaces = value.ThanhPho.includes(trimValueFilter);
      return matchesName || matchesTypeFood || matchesPlaces;
    });
  }, [listRestaurant, valueFilter]);
  if (restaurantError || TypeError || !Restaurant || !typeRes) {
    return [];
  }
  return filterRes.length > 0 ? filterRes : listRestaurant;
}
