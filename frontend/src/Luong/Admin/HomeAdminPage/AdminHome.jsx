export default function AdminHome() {
  return (
    <div>
      <p className="text-2xl font-bold ">Dashboard</p>
      <br />
      <div className="flex items-center gap-3">
        <div className="amount_user border flex flex-col justify-between border-blue-500 w-72 h-52 text-center">
          <p className="text-blue-500 font-bold mt-2 ">Total User</p>
          <p>200</p>
          <p></p>
        </div>
        <div className="amount_seller border border-blue-500 w-72 h-52 text-center">
          <p className="text-blue-500 font-bold mt-2 ">Total Seller</p>
          <p>24</p>
        </div>
        <div className="amount_seller border border-blue-500 w-72 h-52 text-center">
          <p className="text-blue-500 font-bold mt-2 ">
            Restaurants awaiting approval
          </p>
          <p>24</p>
        </div>
      </div>
    </div>
  );
}
