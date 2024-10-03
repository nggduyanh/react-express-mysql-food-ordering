import OrderStatus from "./OrderStatus";

export default function Complete() {
  return (
    <div className="overflow-auto max-h-[750px]">
      <OrderStatus />
      <OrderStatus />
      <OrderStatus />
    </div>
  );
}
