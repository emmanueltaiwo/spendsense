import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

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

export function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}
