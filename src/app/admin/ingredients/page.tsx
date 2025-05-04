"use client";

import DataTable from "./data-table";
import { columns } from "./columns";
import { useIngredients } from "@/hooks/api/use-ingredient";

function IngredientsPage() {
  const { data, isLoading } = useIngredients();

  return (
    <div>
      <DataTable columns={columns} isLoading={isLoading} data={data || []} />
    </div>
  );
}
export default IngredientsPage;
