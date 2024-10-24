import ResMini from "../RestaurantPage/InfoRes/ResMini";

export default function Favourite() {
  return (
    <div className="p-5">
      <p className="text-2xl font-bold mb-2">Favourite Restaurant</p>
      <div className="overflow-auto max-h-[650px]">
        <ResMini />
        <ResMini />
        <ResMini />
        <ResMini />
        <ResMini />
      </div>
    </div>
  );
}
