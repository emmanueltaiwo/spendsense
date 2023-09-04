import TableCell from "@mui/material/TableCell";
import React from "react";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 200,
    label: "Expense\u00A0Id",
    dataKey: "expenseId",
  },
  {
    width: 120,
    label: "Expense\u00A0Item",
    dataKey: "expenseItem",
    numeric: true,
  },
  {
    width: 120,
    label: "Expene\u00A0Amount",
    dataKey: "expenseAmount",
    numeric: true,
  },
  {
    width: 120,
    label: "Expense\u00A0Date",
    dataKey: "expenseDate",
    numeric: true,
  },
  {
    width: 120,
    label: "Status",
    dataKey: "expenseStatus",
    numeric: true,
  },
];

export function RowContent(_index: number, row: Data) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? "right" : "left"}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}
