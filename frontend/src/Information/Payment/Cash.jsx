export default function Cash() {
  return (
    <div>
      <div>
        <div className="cashInfo p-5 border border-gray-300 mt-2 rounded-md ">
          <form action="" className="flex items-center gap-2">
            <select
              name=""
              id=""
              className="w-full border border-gray-500 p-2 rounded-md"
            >
              <option value="">Choose your place</option>
              <option value="">Giang Vo</option>
              <option value="">Hai Ba Trung</option>
              <option value="">Ba Dinh</option>
            </select>
            <p className="rounded-sm p-2 bg-blue-400 text-white font-bold">
              Address
            </p>
          </form>
          <div className="flex justify-end  mt-3 ">
            <button className="p-2 border border-red-500 text-white font-bold bg-red-500 rounded-lg px-4 hover:bg-red-700 transition-all duration-300 ease-in">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
