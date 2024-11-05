import { Link } from "react-router-dom";

export default function OrderStatus() {
  return (
    <div className="bg-white p-4 rounded-xl mb-3">
      <div className="flex justify-between mb-2">
        <div className="flex gap-3">
          <img
            src="/Food/foodImage.jpg"
            alt=""
            className="w-48 h-28 rounded-lg"
          />
          <div>
            <p>Conrad Chicago Restaurant</p>
            <p>Punjab, India</p>
            <p>ORDER #321DERS</p>
            <Link to="/activity/:123" className="mt-3 text-red-500">
              View Details
            </Link>
          </div>
        </div>
        <div className="text-center">
          <p className="bg-green-500 text-white rounded-md p-1">Delivered</p>
          <p className="text-xs mt-2">11/12/2003</p>
        </div>
      </div>
      <hr />
      <div className="detailsOrders flex items-center justify-between text-xs ">
        <div className="listOrder py-4">
          <p>Kesar Sweet x 1</p>
          <p>Gulab Jamun x 4</p>
        </div>
        <div className="pay flex place-items-center gap-2">
          <div>
            <p>Total payment</p>
            <strong>$12.5</strong>
          </div>
          <button className="py-2 px-4 bg-red-500 text-white rounded-md">
            Reorder
          </button>
          <button className="py-2 px-4 border-red-500 border text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200 ease-in">
            Help
          </button>
        </div>
      </div>
    </div>
  );
}
