import { Outlet } from "react-router-dom";
import imageFood from "../../assets/orderfood1.png";
export default function RegisterRes() {
  return (
    <div>
      <header className="flex items-center justify-between bg-pink-300 p-3">
        <div>
          <p className="font-bold text-white text-2xl">
            Become a member of our community
          </p>
        </div>
        <div>
          <img src={imageFood} alt="" className="w-20 h-w-20" />
        </div>
      </header>
      <Outlet />
    </div>
  );
}
