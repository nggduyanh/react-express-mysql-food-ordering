import BarChart from "./BarChart";
import InforAdminNavigate from "./InforAdminNavigate";
import PieChart from "./PieChart";
export default function AdminHome() {
  return (
    <div>
      <p className="text-2xl font-bold ">Dashboard</p>
      <br />
      <div className="information_sales_food w-full">
        <InforAdminNavigate />
      </div>
      <br />
      <div className="flex items-center chart gap-4 justify-between">
        <BarChart />
        <PieChart />
      </div>
    </div>
  );
}
