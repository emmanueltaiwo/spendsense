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

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: function CustomTable(props) {
    return (
      <Table
        {...props}
        style={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    );
  },
  TableHead: function CustomTableHead(props) {
    return <TableHead {...props} />;
  },
  TableRow: function CustomTableRow({ item: _item, ...props }) {
    return (
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
    );
  },
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

// Set display names for each component
(VirtuosoTableComponents.Scroller as any).displayName = "Scroller";
(VirtuosoTableComponents.Table as any).displayName = "CustomTable";
(VirtuosoTableComponents.TableHead as any).displayName = "CustomTableHead";
(VirtuosoTableComponents.TableRow as any).displayName = "CustomTableRow";
(VirtuosoTableComponents.TableBody as any).displayName = "CustomTableBody";

export { VirtuosoTableComponents };
