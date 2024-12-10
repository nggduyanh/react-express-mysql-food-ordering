export default function SpecificAddres() {
  return (
    <div className="grid grid-cols-4 mb-10">
      <p className="pl-2"></p>
      <p className="pl-2">123 Nguyen Chi Thanh, Ha Noi</p>
      <p className="pl-2">0011223344</p>
      <div className="pl-2">
        <button className="mr-2 text-white font-bold rounded-lg px-2 border border-blue-500 bg-blue-500 hover:bg-blue-700 ">
          Update
        </button>
        <button className="mr-2 text-white font-bold rounded-lg px-2 border border-red-500 bg-red-500 hover:bg-red-700 ">
          Delete
        </button>
      </div>
    </div>
  );
}
