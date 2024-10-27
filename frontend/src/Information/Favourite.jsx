import { useContext, useEffect, useState } from "react";
import ResMini from "../RestaurantPage/InfoRes/ResMini";
import { UserAccount } from "../App";
import { getLoveRestaurant, GetTypeRes } from "../Route";
import useFetchData from "../Hook/useFetchData";
export default function Favourite() {
  const { userData } = useContext(UserAccount);
  const [listFavourites, setListFavourites] = useState([]);
  useEffect(() => {
    fetch(getLoveRestaurant + `${userData.MaNguoiDung}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("List empty");
        }
        return res.json();
      })
      .then((data) => setListFavourites(data))
      .catch((err) => {
        if (err.message.includes("404")) {
          setListFavourites([]);
        } else {
          console.log("Another error:", err.message);
        }
      });
  }, []);
  const [typeRes, setTypeRes] = useFetchData(GetTypeRes);

  const combineListFavourites = listFavourites?.reduce(
    (accummulate, currentValue) => {
      const filterType = typeRes.filter((type) => {
        return type.MaNguoiBan === currentValue.MaNguoiBan;
      });
      accummulate.push({
        ...currentValue,
        loaiMonAn: filterType,
      });
      return accummulate;
    },
    []
  );

  return (
    <div className="p-5">
      <p className="text-2xl font-bold mb-2">Favourite Restaurant</p>
      <div className="overflow-auto max-h-[650px]">
        {listFavourites.length === 0 ? (
          <p className="text-gray-500">Not found favourite list</p>
        ) : (
          combineListFavourites.map((fav) => {
            return <ResMini {...fav} key={fav.MaNguoiBan} />;
          })
        )}
        {/* <ResMini />
        <ResMini />
        <ResMini />
        <ResMini />
        <ResMini /> */}
      </div>
    </div>
  );
}