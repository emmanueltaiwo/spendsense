import React from "react";
import MobileSearch from "../Dashboard/mobileSearch";
import ExpensesTable from "../Expenses/expensesTable";
import CreateExpenses from "./createExpenses";
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

interface CreateExpensesLayoutProps {
  filteredExpenses: Data[];
  expenses: Data[];
  handleSearchExpenses: (searchStr: string, e: any) => void;
}

const CreateExpensesLayout = (props: CreateExpensesLayoutProps) => {
  const { filteredExpenses, expenses, handleSearchExpenses } = props;
  return (
    <div className="w-full flex flex-col gap-5">
      <MobileSearch handleSearchExpenses={handleSearchExpenses} />
      <div className="lg:mx-10 xl:mx-16 mt-2 md:mt-10 grid gap-10 xl:grid-cols-[2.7fr_1.3fr] p-3">
        <CreateExpenses />
        <TopExpensesList expenses={expenses} />
      </div>

      <ExpensesTable pageName="create" filteredExpenses={filteredExpenses} />
    </div>
  );
};

export default CreateExpensesLayout;
