import React from "react";
import TopExpensesList from "../Dashboard/topExpensesList";
import NotificationsBox from "./notificationsBox";
import ExpensesTable from "../Expenses/expensesTable";
import MobileSearch from "../Dashboard/mobileSearch";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseCurrency: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

interface NotificationsContainerProps {
  filteredExpenses: Data[];
  expenses: Data[];
  handleSearchExpenses: (searchStr: string, e: any) => void;
}

const NotificationsContainer = (props: NotificationsContainerProps) => {
  const { filteredExpenses, expenses, handleSearchExpenses } = props;
  return (
    <section className="w-full flex flex-col gap-10">
      <MobileSearch handleSearchExpenses={handleSearchExpenses} />
      <div className="lg:mx-10 xl:mx-16 mt-10 grid gap-10 xl:grid-cols-[2.7fr_1.3fr] p-3">
        <NotificationsBox />
        <TopExpensesList expenses={expenses} />
      </div>
      <ExpensesTable
        pageName="notifications"
        filteredExpenses={filteredExpenses}
      />
    </section>
  );
};

export default NotificationsContainer;
