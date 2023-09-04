import React from "react";
import Link from "next/link";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseCurrency: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

interface TopExpensesListProps {
  expenses: Data[];
}

const TopExpensesList = (props: TopExpensesListProps) => {
  const { expenses } = props;

  const getTopExpensesList = () => {
    // Sort the expenses array in descending order by expenseAmount
    const sortedExpenses = expenses
      .slice()
      .sort(
        (a, b) => parseFloat(b.expenseAmount) - parseFloat(a.expenseAmount)
      );

    return sortedExpenses.slice(0, 5); // Return the top 5 expenses
  };

  const getExpenseCurrency =
    expenses &&
    expenses.length > 0 &&
    expenses.map((expense) => expense.expenseCurrency);

  return (
    <div className="bg-white shadow-gray-400 shadow-sm rounded-lg px-3 py-3 flex flex-col gap-3">
      <h1 className="text-[20px] font-medium">Most Expensive Items</h1>

      <div className="bg-[rgba(179,179,179,0.3)] mt-5 px-3 py-3 rounded-lg mb-10">
        <ul className="flex flex-col gap-7">
          {getTopExpensesList().length < 1 ? (
            <li className="text-lg font-bold text-center">No Expenses Found</li>
          ) : (
            getTopExpensesList().map((expense: Data) => (
              <li
                key={expense.expenseId}
                className="flex gap-2 items-center bg-blue-700 hover:bg-blue-800 rounded-lg p-2 py-3 mt-2 cursor-pointer"
              >
                <FolderSpecialIcon fontSize="small" className="text-white" />
                <h3 className="text-lg font-medium text-white">
                  {expense.expenseItem}:
                </h3>
                <span className="bg-gray-500 ml-auto text-white px-2 py-[0.5px] rounded-xl text-lg font-bold">
                  {Array.isArray(getExpenseCurrency)
                    ? getExpenseCurrency[0]
                    : "$"}{" "}
                  {parseFloat(expense.expenseAmount).toLocaleString()}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
      <Link
        href="/create"
        className="mx-auto text-center w-[80%] rounded-lg py-[7px] px-4 bg-blue-500 text-white text-lg font-medium active:bg-blue-400 active:border-blue-900 active:border-2 mt-auto"
      >
        Create Expense
      </Link>
    </div>
  );
};

export default TopExpensesList;
