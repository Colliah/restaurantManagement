import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Ingredient = {
  id: string;
  name: string;
  unit: number;
  currentStock: number;
  minimumStock: number;
  supplierInfo: string;
  costPerUnit: number;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Ingredient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "currentStock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Current Stock
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("currentStock")}</div>
    ),
  },
  {
    accessorKey: "minimumStock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Minimum Stock
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("minimumStock")}</div>
    ),
  },
  {
    accessorKey: "supplierInfo",
    header: "Supplier Info",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("supplierInfo")}</div>
    ),
  },
  {
    accessorKey: "costPerUnit",
    header: "Cost Per Unit ",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("costPerUnit")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      const formattedDate = new Date(date).toLocaleString(); // hoặc format bằng date-fns
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date: Date = row.getValue("updatedAt");
      const formattedDate = new Date(date).toLocaleString(); // hoặc format bằng date-fns
      return <div>{formattedDate}</div>;
    },
  },
];
