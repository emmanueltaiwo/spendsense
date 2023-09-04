import React from "react";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Link from "next/link";
import { VirtuosoTableComponents } from "./tableComponent";
import { fixedHeaderContent } from "./expenseTableHeader";
import { RowContent } from "./expenseTableRow";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseCurrency: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

interface ExpensesTableProps {
  filteredExpenses: Data[];
  pageName: string;
}

const ExpensesTable = (props: ExpensesTableProps) => {
  const { filteredExpenses, pageName } = props;

  function createData(
    id: string,
    expenseId: string,
    expenseItem: string,
    expenseCurrency: string,
    expenseAmount: string,
    expenseDate: string,
    expenseStatus: string
  ): Data {
    return {
      id,
      expenseId,
      expenseItem,
      expenseCurrency,
      expenseAmount,
      expenseDate,
      expenseStatus,
    };
  }

  const rows: Data[] =
    filteredExpenses?.map((data, index) =>
      createData(
        index.toString(),
        data.expenseId,
        data.expenseItem,
        data.expenseCurrency,
        data.expenseCurrency + parseFloat(data.expenseAmount).toLocaleString(),
        data.expenseDate,
        data.expenseStatus
      )
    ) || [];

  return (
    <section
      className={`${
        pageName === "expenses"
          ? "flex flex-col gap-5"
          : "lg:mx-[3.3rem] xl:mx-[4.6rem] mx-3 flex flex-col gap-5"
      }`}
    >
      <h1 className="text-3xl font-medium">Expenses</h1>

      <Paper
        className={`${
          pageName === "expenses" ? "h-[650px] w-[100%]" : "h-[300px] w-[100%]"
        }`}
      >
        {filteredExpenses && filteredExpenses.length > 0 ? (
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={RowContent}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-lg text-gray-500">
              No expenses found,{" "}
              <Link
                href="/create"
                className="text-blue-700 underline text-sm font-bold"
              >
                Create Expenses
              </Link>{" "}
            </h1>
          </div>
        )}
      </Paper>
    </section>
  );
};

export default ExpensesTable;
