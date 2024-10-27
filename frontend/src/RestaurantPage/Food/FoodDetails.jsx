import { formatCurrency } from "../../Route";

export default function FoodDetails({
  disabled,
  isShown,
  getInfo,
  mini,
  ...rest
}) {
  const handleAdd = (value) => {
    getInfo(value);
  };
  const handleShow = () => {
    isShown(rest);
  };
  return (
    <div
      className={`bg-white border border-gray-300 rounded-lg p-4 mb-3 hover:border-pink-400 transition-all duration-300 ease-in  ${
        mini ? "flex items-center justify-between" : " "
      }`}
    >
      <div onClick={handleShow} className="cursor-pointer">
        <div className={mini ? "flex items-center gap-2" : ""}>
          {rest.AnhMonAn !== null ? (
            <img
              src={rest.AnhMonAn}
              alt=""
              className={
                mini
                  ? "h-16 w-16 border border-pink-400 p-1 rounded-full"
                  : "h-72 relative left-1/2 -translate-x-1/2"
              }
            />
          ) : (
            <img
              src="/Food/NoFoodPhoto.jpg"
              alt=""
              className={
                mini
                  ? "h-16 w-16 border border-pink-400 p-1 rounded-full"
                  : "h-72 relative left-1/2 -translate-x-1/2"
              }
            />
          )}
          <p>{rest.TenMonAn}</p>
        </div>
        {mini && <p className="text-xs text-gray italic">Mota: {rest.MoTa}</p>}
        <p className="text-pink-500 font-bold">{formatCurrency(rest.GiaBan)}</p>
      </div>
      <button
        onClick={() => handleAdd(rest)}
        className="uppercase border border-gray-600 py-2 px-4 rounded-lg hover:bg-gray-500 hover:text-white transition-all duration-200 ease-in"
      >
        Add
      </button>
    </div>
  );
}
