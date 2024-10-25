import { useContext, useEffect, useState } from "react";
import ResMini from "../RestaurantPage/InfoRes/ResMini";
import { UserAccount } from "../App";
export default function Favourite() {
  const [listFavourites, setListFavourites] = useState([]);
  const { userData } = useContext(UserAccount);
  useEffect(() => {
    fetch(
      `http://localhost:3030/nguoiban/nguoibanyeuthich/${userData.MaNguoiDung}`
    )
      .then((res) => res.json())
      .then((data) => setListFavourites(data));
  }, []);
  return (
    <div className="p-5">
      <p className="text-2xl font-bold mb-2">Favourite Restaurant</p>
      <div className="overflow-auto max-h-[650px]">
        {!Array.isArray(listFavourites) ? (
          <p className="text-gray-500">Not found favourite list</p>
        ) : (
          listFavourites.map((fav) => {
            return <ResMini key={fav.MaNguoiBan} />;
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
