import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableComponents } from "react-virtuoso";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseCurrency: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

export const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      style={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => (
    <TableRow
      {...props}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#e0e0e0";
        e.currentTarget.style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "";
        e.currentTarget.style.cursor = "default";
      }}
    />
  ),
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};
