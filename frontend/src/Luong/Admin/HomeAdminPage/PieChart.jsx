import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);
export default function PieChart() {
  const pieData = {
    labels: ["Electronics", "Clothing", "Groceries", "Home Appliances"],
    datasets: [
      {
        label: "Category Sales",
        data: [12000, 9000, 7000, 5000],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="pie_chart w-2/5  border border-blue-500 rounded-md h-[400px] flex flex-col">
      <p className="text-xl font-bold mb-4 text-center mt-2">Pie chart</p>
      <div className="w-full h-5/6 flex items-center justify-center">
        <Pie data={pieData} />
      </div>
    </div>
  );
}
