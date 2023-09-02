import React from "react";
import SummarySection from "./summarySection";
import TopExpensesList from "./topExpensesList";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseCurrency: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

interface DashboardOverviewProps {
  expenses: Data[];
}

const DashboardOverview = (props: DashboardOverviewProps) => {
  const { expenses } = props;
  return (
    <section className="lg:mx-10 xl:mx-16 mt-2 md:mt-10 grid gap-10 xl:grid-cols-[2.7fr_1.3fr] p-3">
      <SummarySection expenses={expenses} />

      <TopExpensesList expenses={expenses} />
    </section>
  );
};

export default DashboardOverview;
