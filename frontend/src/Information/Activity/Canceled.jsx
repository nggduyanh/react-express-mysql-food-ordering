import OrderStatus from "./OrderStatus";

export default function Canceled() {
  return (
    <div className="overflow-auto max-h-[750px]">
      <OrderStatus />
      <OrderStatus />
      <OrderStatus />
    </div>
  );
}
