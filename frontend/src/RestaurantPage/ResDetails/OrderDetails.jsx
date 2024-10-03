import { FiMessageSquare } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
export default function OrderDetails() {
  return (
    <div className="sticky-div">
      <div className="pr-16 -ml-6 ">
        <div className="border shadow-xl bg-white border-gray-300 rounded-2xl w-full orderBox p-4 grid grid-rows-8 gap-3">
          <div className="text-xl font-bold pb-2 flex items-center gap-3">
            <img
              src="/public/blackImage.jpg"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <p>Restaurant shop name</p>
          </div>
          <div className="row-span-2 p-1 border border-gray-300 rounded-lg order list">
            Order list
          </div>
          <div className="flex items-center justify-between">
            <select name="" id="" className="w-full border border-gray-200 p-2">
              <option value="">Choose promotion</option>
            </select>
            <div className="p-2 bg-red-500 font-bold text-white rounded-e-lg">
              %Apply
            </div>
          </div>
          <div className="comment flex gap-2 items-center">
            <div className="block ">
              <FiMessageSquare />
            </div>
            <textarea
              className="w-full border border-gray-300 p-2"
              name=""
              id=""
              placeholder="any suggesion, we will pass it on"
            ></textarea>
          </div>
          <div className="payment method flex items-center">
            <select name="" id="" className="w-full border border-gray-200 p-2">
              <option value="">Choose Payment method</option>
              <option value="">Cash</option>
              <option value="">Card</option>
              <option value="">E-wallet</option>
            </select>
            <div className="py-3 px-4 bg-green-500 font-bold text-white rounded-e-lg">
              <MdOutlinePayment />
            </div>
          </div>
          <div className="row-span-2">Caculate order</div>
          <div>
            <button className="w-full py-4 bg-green-500 hover:bg-green-800 transition-all ease-in duration-200 text-white font-bold uppercase rounded-xl">
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
