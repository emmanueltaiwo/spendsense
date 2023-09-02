import React from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import PaidIcon from "@mui/icons-material/Paid";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseCurrency: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

interface ExpensesOverviewProps {
  expenses: Data[];
}

const ExpensesOverview = (props: ExpensesOverviewProps) => {
  const { expenses } = props;

  const getUserCurrency = expenses.map((expense) => expense.expenseCurrency);

  const getTotalExpenses = () => {
    const totalExpenseAmount = expenses.reduce(
      (total, expense) => total + parseFloat(expense.expenseAmount),
      0
    );

    return totalExpenseAmount;
  };

  const getMonthlyExpenses = () => {
    const currentDate = new Date();

    const currentMonthNumber = currentDate.getMonth() + 1;
    const currentYearNumber = currentDate.getFullYear();
    const formattedMonth = currentMonthNumber.toString().padStart(2, "0");
    const formattedYear = currentYearNumber.toString().padStart(2, "0");

    const monthlyExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.expenseDate);
      const expenseMonthNumber = expenseDate.getMonth() + 1;

      const expenseYearNumber = expenseDate.getFullYear();
      const formattedExpenseMonth = expenseMonthNumber
        .toString()
        .padStart(2, "0");

      const formattedExpenseYear = expenseYearNumber
        .toString()
        .padStart(2, "0");

      return (
        formattedExpenseMonth === formattedMonth &&
        formattedExpenseYear === formattedYear
      );
    });

    const totalMonthlyExpenseAmount = monthlyExpenses.reduce(
      (total, expense) => total + parseFloat(expense.expenseAmount),
      0
    );

    return totalMonthlyExpenseAmount;
  };

  const getDailyExpenses = () => {
    const currentDate = new Date();
    const currentDayNumber = currentDate.getDate();
    const currentMonthNumber = currentDate.getMonth() + 1;
    const currentYearNumber = currentDate.getFullYear();
    const formattedMonth = currentMonthNumber.toString().padStart(2, "0");
    const formattedDay = currentDayNumber.toString().padStart(2, "0");
    const formattedYear = currentYearNumber.toString().padStart(2, "0");

    const dailyExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.expenseDate);
      const expenseMonthNumber = expenseDate.getMonth() + 1;
      const expenseDayNumber = expenseDate.getDate();
      const expenseYearNumber = expenseDate.getFullYear();
      const formattedExpenseMonth = expenseMonthNumber
        .toString()
        .padStart(2, "0");
      const formattedExpenseday = expenseDayNumber.toString().padStart(2, "0");
      const formattedExpenseYear = expenseYearNumber
        .toString()
        .padStart(2, "0");

      return (
        formattedExpenseMonth === formattedMonth &&
        formattedExpenseday === formattedDay &&
        formattedExpenseYear === formattedYear
      );
    });

    const totalDailyExpenseAmount = dailyExpenses.reduce(
      (total, expense) => total + parseFloat(expense.expenseAmount),
      0
    );

    return totalDailyExpenseAmount;
  };

  return (
    <div className="flex flex-col justify-center items-center  py-2 lg:flex-row gap-3">
      <div className="w-full h-32 bg-blue-800 rounded-lg flex gap-2 flex-col items-start justify-center p-3 relative">
        <div
          className="absolute top-[-30px] right-0 bottom-0 w-[500px]"
          style={{
            background: `url('/assets/Images/blue-coin.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "100% 100%",
            opacity: 0.3,
            width: "150%",
            height: "150%",
          }}
        />
        <h3 className="text-white flex items-center gap-2 text-1xl font-bold">
          <SavingsIcon /> Total Expenses
        </h3>
        <h2 className="text-gray-200 text-2xl font-extrabold">
          {getUserCurrency[0]} {getTotalExpenses().toLocaleString()}
        </h2>
      </div>

      <div className="w-full h-32 bg-[rgb(194,194,194)] rounded-lg flex gap-2 flex-col items-start justify-center p-3 relative">
        <div
          className="absolute top-[20px] right-0 bottom-0"
          style={{
            background: `url('/assets/Images/white-coin.png')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "100% 100%",
            opacity: 0.3,
            width: "50%",
            height: "100%",
          }}
        />
        <h3 className="text-black flex items-center gap-2 text-1xl font-bold">
          <PaidIcon className="text-black" /> Monthly Expenses
        </h3>
        <h2 className="text-blue-800 text-2xl font-extrabold">
          {getUserCurrency[0]} {getMonthlyExpenses().toLocaleString()}{" "}
        </h2>
      </div>

      <div className="w-full h-32 bg-slate-800 rounded-lg flex gap-2 flex-col items-start justify-center p-3 relative">
        <div
          className="absolute top-[15px] right-0 bottom-0"
          style={{
            background: `url('/assets/Images/black-coin.png')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "100% 100%",
            opacity: 0.3,
            width: "50%",
            height: "100%",
          }}
        />
        <h3 className="text-white flex items-center gap-2 text-1xl font-bold">
          <LocalAtmIcon /> Daily Expenses
        </h3>
        <h2 className="text-gray-200 text-2xl font-extrabold">
          {getUserCurrency[0]} {getDailyExpenses().toLocaleString()}
        </h2>
      </div>
    </div>
  );
};

export default ExpensesOverview;
