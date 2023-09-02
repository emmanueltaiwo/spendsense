import React, { useState, useEffect } from "react";
import MobileSearch from "../Dashboard/mobileSearch";
import ExpensesTable from "../Expenses/expensesTable";
import TopExpensesList from "../Dashboard/topExpensesList";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseCurrency: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

interface ExpensesContainerProps {
  filteredExpenses: Data[];
  expenses: Data[];
  handleSearchExpenses: (searchStr: string, e: any) => void;
}

const ExpensesContainer = (props: ExpensesContainerProps) => {
  const { filteredExpenses, expenses, handleSearchExpenses } = props;
  const [sortedExpenses, setSortedExpenses] = useState(filteredExpenses);

  useEffect(() => {
    setSortedExpenses(filteredExpenses);
  }, [filteredExpenses]);

  const sortExpenses = (criteria: string) => {
    if (criteria === "newest") {
      setSortedExpenses(
        [...expenses].sort(
          (a, b) => +new Date(b.expenseDate) - +new Date(a.expenseDate)
        )
      );
    } else if (criteria === "oldest") {
      setSortedExpenses(
        [...expenses].sort(
          (a, b) => +new Date(a.expenseDate) - +new Date(b.expenseDate)
        )
      );
    } else if (criteria === "amount-asc") {
      setSortedExpenses(
        [...expenses].sort(
          (a, b) => parseFloat(a.expenseAmount) - parseFloat(b.expenseAmount)
        )
      );
    } else if (criteria === "amount-desc") {
      setSortedExpenses(
        [...expenses].sort(
          (a, b) => parseFloat(b.expenseAmount) - parseFloat(a.expenseAmount)
        )
      );
    }
  };

  const handleAlphabetFilter = (alphabet: string) => {
    if (alphabet === "all") {
      setSortedExpenses(expenses);
    } else {
      const filteredByAlphabet = expenses.filter((expense) =>
        expense.expenseItem.startsWith(alphabet)
      );
      setSortedExpenses(filteredByAlphabet);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <MobileSearch handleSearchExpenses={handleSearchExpenses} />

      <div className="flex gap-2 xl:mx-16 lg:mx-10 mx-3 md:mt-10 mt-5 flex-wrap">
        <select
          className="border border-gray-300 text-white text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 bg-blue-800"
          onChange={(e) => sortExpenses(e.target.value)}
        >
          <option value="newest">Sort by Newest Date</option>
          <option value="oldest">Sort by Oldest Date</option>
        </select>

        <button
          className="border border-gray-300 active:bg-blue-700 text-white text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 bg-blue-800"
          onClick={() => sortExpenses("amount-asc")}
        >
          Sort by Amount (Low to High)
        </button>
        <button
          className="border active:bg-blue-700 border-gray-300 text-white text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 bg-blue-800"
          onClick={() => sortExpenses("amount-desc")}
        >
          Sort by Amount (High to Low)
        </button>

        <select
          className="border active:bg-blue-500 border-gray-300 text-white text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 bg-blue-800"
          onChange={(e) => handleAlphabetFilter(e.target.value)}
        >
          <option value="all">All</option>
          {Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(65 + i)
          ).map((alphabet) => (
            <option key={alphabet} value={alphabet}>
              {alphabet}
            </option>
          ))}
        </select>
      </div>

      <div className="lg:mx-10 xl:mx-16 mt-2 grid gap-10 xl:grid-cols-[2.7fr_1.3fr] p-3">
        <ExpensesTable pageName="expenses" filteredExpenses={sortedExpenses} />
        <TopExpensesList expenses={expenses} />
      </div>
    </div>
  );
};

export default ExpensesContainer;
