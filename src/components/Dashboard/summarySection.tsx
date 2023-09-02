import React from "react";
import ExpensesChart from "./expensesChart";
import ExpensesOverview from "./expensesOverview";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseCurrency: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

interface SummarySectionProps {
  expenses: Data[];
}

const SummarySection = (props: SummarySectionProps) => {
  const { expenses } = props;
  return (
    <div className="flex flex-col gap-5">
      <ExpensesOverview expenses={expenses} />
      <ExpensesChart expenses={expenses} />
    </div>
  );
};

export default SummarySection;
