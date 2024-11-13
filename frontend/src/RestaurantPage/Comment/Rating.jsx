export default function Rating() {
  return (
    <div className="border bg-white border-pink-300 p-3 rounded-lg">
      <p>Ratings and Reviews</p>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs my-2 ">5 Star</p>
          <div className="percent border relative border-gray-300 w-11/12 h-2 rounded-full">
            <div className="result absolute h-2 w-7/12 bg-blue-400 rounded-md"></div>
          </div>
          <p className=" text-right text-xs">56%</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs my-2 ">4 Star</p>
          <div className="percent relative border border-gray-300 w-11/12 h-2 rounded-full">
            <div className="result absolute h-2 w-3/12 bg-blue-400 rounded-md"></div>
          </div>
          <p className=" text-right text-xs">30%</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs my-2 ">3 Star</p>
          <div className="percent relative border border-gray-300 w-11/12 h-2 rounded-full">
            <div className="result absolute h-2 w-2/12 bg-blue-400 rounded-md"></div>
          </div>
          <p className=" text-right text-xs">20%</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs my-2 ">2 Star</p>
          <div className="percent relative border border-gray-300 w-11/12 h-2 rounded-full">
            <div className="result absolute h-2 w-1/12 bg-blue-400 rounded-md"></div>
          </div>
          <p className=" text-right text-xs">10%</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs my-2 ">1 Star</p>
          <div className="percent relative border border-gray-300 w-11/12 h-2 rounded-full">
            <div className="result absolute h-2 w-0.5 bg-blue-400 rounded-md"></div>
          </div>
          <p className=" text-right text-xs">2%</p>
        </div>
      </div>
    </div>
  );
}
