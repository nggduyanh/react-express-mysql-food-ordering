import { Bar } from "react-chartjs-2";
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
export default function BarChart() {
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [
          14568, 10423, 5678, 3456, 11234, 9876, 12345, 14567, 16789, 18012,
          19345, 17890,
        ],
        backgroundColor: "blue",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="bar_chart w-3/5 border border-blue-500 rounded-md h-[400px]  flex flex-col">
      <p className="font-bold text-xl mb-4 text-center mt-2">Bar chart</p>
      <div className="w-full h-5/6 flex items-center justify-center">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}
