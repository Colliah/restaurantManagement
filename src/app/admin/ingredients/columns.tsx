import { queryClient } from "@/components/providers/providers";
import SheetIngredient, { Unit } from "@/components/sheet-ingredient";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IngredientCategory } from "@/enums/ingredient-category.enum";
import { ingredientsApi } from "@/services/ingredients";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export type Ingredient = {
  id: string;
  name: string;
  unit: Unit;
  category: IngredientCategory;
  description: string;
  averageCost: number;
  allergenInfo: string;
  nutritionalInfo: string;
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
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => <div className="capitalize">{row.getValue("unit")}</div>,
  },
  {
    accessorKey: "averageCost",
    header: "Average Cost",
    cell: ({ row }) => (
      <div>{row.getValue("averageCost")}</div>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const mutationDelete = useMutation({
        mutationFn: () => ingredientsApi.deleteIngredient(row.getValue("id")),
        onSuccess: () => {
          toast.success("Ingredient deleted");
          queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        },
        onError: (error) => {
          console.log(error), toast.error("Ingredient not deleted");
        },
      });

      return (
        <div className="capitalize">
          <SheetIngredient
            mode="edit"
            ingredientId={row.original.id}
            initialData={row.original}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => mutationDelete.mutate()}
            disabled={mutationDelete.isPending}
          >
            {mutationDelete.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash2 className="text-red-600" />
            )}
          </Button>
        </div>
      );
    },
  },
];
