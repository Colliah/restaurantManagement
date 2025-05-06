import SheetInventory from "@/components/sheet-inventory";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";



export type Inventory = {
    id: string;
    ingredient: {
        id: string,
        name: string,
        unit: string,
        category: string,
    };
    quantity: number;
    minimumRequired: number;
    lowStock: boolean;
    lastUpdated: string;
};

export const columns: ColumnDef<Inventory>[] = [
    {
        accessorKey: "ingredient",
        header: "Ingredient",
        cell: ({ row }) => <div className="capitalize">{row.original.ingredient.name}</div>,
    },

    {
        accessorKey: "ingredient",
        header: "Category",
        cell: ({ row }) => <div className="text-start">{row.original.ingredient.category}</div>
    },

    {
        accessorKey: "quantity",
        header: () => {
            return (
                <div>Current Quantity</div>
            );
        },
        cell: ({ row }) => (
            <div className="text-start">{row.getValue("quantity")}</div>
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
        accessorKey: "lowStock",
        header: "Status",
        cell: ({ row }) => (
            <div className="text-start">
                {row.getValue("lowStock") ? "In Stock" : "Low Stock"}
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
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    <SheetInventory
                        inventoryId={row.getValue("id")}
                        initialData={row.original}
                        mode="edit"
                    />
                    <Button variant="ghost">
                        <Trash2 className="text-red-600" />
                    </Button>
                </div>
            )
        }

    },
];

