import { Link } from "react-router-dom";

export default function SuccessPayment() {
  return (
    <div className="min-h-screen marginJustification text-center relative">
      <div className="absolute w-9/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="font-bold text-4xl mb-3">
          Nguyen Van A, Your order has been successful
        </p>
        <p>
          Check your order status in{" "}
          {
            <Link to="/activity" className="text-red-500">
              Activity
            </Link>
          }{" "}
          about next steps information.
        </p>
        <br />
        <p className="text-9xl">🎉</p>
        <br />
        <p className="text-2xl mb-2">Preparing your order</p>
        <p className="text-gray-500 text-sm">
          Your order will be prepared and will come soon
        </p>
        <br />
        <Link
          to="/activity/:123"
          className="bg-red-500 text-white w-full p-3 hover:bg-red-700 transition-all duration-200 ease-in"
        >
          Track my Order
        </Link>
      </div>
    </div>
  );
}
