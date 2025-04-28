import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type Recipe = {
  id: string;
  name: string;
  instruction: string;
  servingSize: number;
  preparationTime: number;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Recipe>[] = [
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
    accessorKey: "instruction",
    header: "Instruction",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("instruction")}</div>
    ),
  },
  {
    accessorKey: "servingSize",
    header: "Serving Size",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("servingSize")}</div>
    ),
  },
  {
    accessorKey: "preparationTime",
    header: "Preparation Time",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("preparationTime")}</div>
    ),
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => {
  //     const date: Date = row.getValue("createdAt");
  //     const formattedDate = new Date(date).toLocaleString(); // hoặc format bằng date-fns
  //     return <div>{formattedDate}</div>;
  //   },
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  //   cell: ({ row }) => {
  //     const date: Date = row.getValue("updatedAt");
  //     const formattedDate = new Date(date).toLocaleString(); // hoặc format bằng date-fns
  //     return <div>{formattedDate}</div>;
  //   },
  // },
];
