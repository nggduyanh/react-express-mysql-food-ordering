import ResInfo from "../InfoRes/ResInfo";
import ResTrending from "../InfoRes/ResTrending";

export default function TrendingRes() {
  return (
    <>
      <p className="text-2xl mb-3 pt-2">Trending this week</p>
      <div className="grid grid-cols-4 gap-3">
        <ResInfo img="/Food/foodImage.jpg">
          <p className="text-xl font-bold">Ten </p>
          <i>Burger</i>
          <p className="text-md text-gray-500">
            Open - Close: 12:00am - 23:00pm
          </p>
        </ResInfo>
        <ResInfo img="/Food/foodImage.jpg">
          <p className="text-xl font-bold">Ten </p>
          <i>Burger</i>
          <p className="text-md text-gray-500">
            Open - Close: 12:00am - 23:00pm
          </p>
        </ResInfo>
        <ResInfo img="/Food/foodImage.jpg">
          <p className="text-xl font-bold">Ten </p>
          <i>Burger</i>
          <p className="text-md text-gray-500">
            Open - Close: 12:00am - 23:00pm
          </p>
        </ResInfo>
        <ResInfo img="/Food/foodImage.jpg">
          <p className="text-xl font-bold">Ten </p>
          <i>Burger</i>
          <p className="text-md text-gray-500">
            Open - Close: 12:00am - 23:00pm
          </p>
        </ResInfo>
        {/* <ResTrending className="">
          <img src="/Food/foodImage.jpg" alt="" />
          <p className="text-xl font-bold">Ten </p>
          <i>Burger</i>
          <p className="text-md text-gray-500">
            Open - Close: 12:00am - 23:00pm
          </p>
          <p className="text-md text-gray-500">3 Star</p>
        </ResTrending>
        <ResTrending className="">
          <img src="/Food/foodImage.jpg" alt="" />
          <p className="text-xl font-bold">Ten </p>
          <i>Burger</i>
          <p className="text-md text-gray-500">
            Open - Close: 12:00am - 23:00pm
          </p>
          <p className="text-md text-gray-500">3 Star</p>
        </ResTrending>
        <ResTrending className="">
          <img src="/Food/foodImage.jpg" alt="" />
          <p className="text-xl font-bold">Ten </p>
          <i>Burger</i>
          <p className="text-md text-gray-500">
            Open - Close: 12:00am - 23:00pm
          </p>
          <p className="text-md text-gray-500">3 Star</p>
        </ResTrending> */}
      </div>
    </>
  );
}
