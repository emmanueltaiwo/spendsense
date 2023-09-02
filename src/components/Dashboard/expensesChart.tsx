import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

interface ExpensesChartProps {
  expenses: Data[];
}

const ExpensesChart = (props: ExpensesChartProps) => {
  const { expenses } = props;
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  // Find the lowest and highest years from expensesDate
  const years = expenses.map((expense) =>
    new Date(expense.expenseDate).getFullYear()
  );
  const lowestYear = Math.min(...years);
  const highestYear = Math.max(...years);

  const chartFilterExpenses = expenses.filter((expense) => {
    const chartFilterYear = new Date(expense.expenseDate).getFullYear();
    return selectedYear === chartFilterYear;
  });

  const chartData = {
    labels: chartFilterExpenses.map((expense) => expense.expenseItem),
    datasets: [
      {
        label: "Expense Amount",
        data: chartFilterExpenses.map((expense) =>
          parseFloat(expense.expenseAmount)
        ),
        backgroundColor: "rgba(0, 0, 255, 0.600)", // Customize colors as needed
      },
    ],
  };

  const chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expenses Bar Chart",
      },
    },
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div className="bg-white w-full h-full min-lg:h-[500px] rounded-lg justify-center flex flex-col gap-5 p-2 shadow-gray-400 shadow-sm">
      <div className="bg-blue-800 rounded-lg p-2 w-full">
        <label
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          htmlFor="yearSelect"
        >
          {expenses.length < 1 ? "No expenses found" : "Select Year"}{" "}
        </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={handleYearChange}
          className="border border-gray-300 text-white text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-blue-800"
        >
          {Array.from({ length: highestYear - lowestYear + 1 }, (_, index) => (
            <option key={index} value={lowestYear + index}>
              {lowestYear + index}
            </option>
          ))}
        </select>
      </div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
};

export default ExpensesChart;
