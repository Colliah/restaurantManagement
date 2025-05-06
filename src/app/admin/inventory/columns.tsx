import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import{ Pencil } from "lucide-react";



export type Inventory = {
    ingredient: string;
    category: string;
    currentQuantity: number;
    minimumRequired: number;
    status: boolean;
    lastUpdated: string;
    actions: string;
};

export const columns: ColumnDef<Inventory>[] = [
    {
        accessorKey: "ingredient",
        header: "Ingredient",
        cell: ({ row }) => <div className="capitalize">{row.getValue("ingredient")}</div>,
    },
    
    {
        accessorKey: "category",
        header: () => {
            return (<div>Category</div>);
        },
        cell: ({ row }) => (
            <div className="text-start">{row.getValue("category")}</div>
        ),
    },

    {
        accessorKey: "currentQuantity",
        header: () => {
            return (
                <div>Current Quantity</div>
            );
        },
        cell: ({ row }) => (
            <div className="text-start">{row.getValue("currentQuantity")}</div>
        ),
    },

    {
        accessorKey: "minimumRequired",
        header: () => {
            return (
                <div>Minimum Required</div>
            );
        },
        cell: ({ row }) => (
            <div className="text-start">{row.getValue("minimumRequired")}</div>
        ),
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="text-start">
            {row.getValue("Status") ? "In Stock" : "Low Stock"}
          </div>
        ),
      },

    {
        accessorKey: "lastUpdated",
        header: "Last Updated",
    },

    {
        accessorKey: "actions",
        header: "Actions",
        cell: () => (
            <Button>
            <Pencil />
            </Button>
        ),
    },
];
