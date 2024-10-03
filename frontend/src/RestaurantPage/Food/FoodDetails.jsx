export default function FoodDetails({ isOrder, getInfo, mini, ...rest }) {
  const handleAdd = (value) => {
    getInfo(value);
  };
  return (
    <div
      className={`bg-white border border-gray-300 rounded-lg p-4 mb-3 hover:border-pink-400 transition-all duration-300 ease-in ${
        mini ? "flex items-center justify-between" : " "
      }`}
    >
      <div>
        <div className={mini ? "flex items-center gap-2" : ""}>
          <img
            src={rest.image}
            alt=""
            className={
              mini
                ? "h-16 w-16 border border-pink-400 p-1 rounded-full"
                : "h-72 relative left-1/2 -translate-x-1/2"
            }
          />
          <p>{rest.title}</p>
        </div>
        <p>{`Has been orderd: ${rest.rating.count}`}</p>
        <p>${rest.price}</p>
      </div>
      {!isOrder ? (
        <button
          onClick={() => handleAdd(rest)}
          className="uppercase border border-gray-600 py-2 px-4 rounded-lg hover:bg-gray-500 hover:text-white transition-all duration-200 ease-in"
        >
          Add
        </button>
      ) : (
        <h1>Hello</h1>
      )}
    </div>
  );
}
