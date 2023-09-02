import React from "react";
import DashboardOverview from "./dashboardOverview";
import ExpensesTable from "../Expenses/expensesTable";
import MobileSearch from "./mobileSearch";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseCurrency: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

interface DashboardLayoutPrrops {
  filteredExpenses: Data[];
  expenses: Data[];
  handleSearchExpenses: (searchStr: string, e: any) => void;
}

const DashboardLayout = (props: DashboardLayoutPrrops) => {
  const { filteredExpenses, expenses, handleSearchExpenses } = props;
  return (
    <div className="w-full flex flex-col gap-5">
      <MobileSearch handleSearchExpenses={handleSearchExpenses} />
      <DashboardOverview expenses={expenses} />
      <ExpensesTable pageName="dashboard" filteredExpenses={filteredExpenses} />
    </div>
  );
};

export default DashboardLayout;
