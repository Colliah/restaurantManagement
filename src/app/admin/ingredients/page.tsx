"use client";

import DataTable from "./data-table";
import { columns } from "./columns";
import { useIngredients } from "@/hooks/api/use-ingredient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function IngredientsPage() {
  const { data, isLoading } = useIngredients();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} isLoading={isLoading} data={data || []} />
      </CardContent>
    </Card>
  );
}
export default IngredientsPage;
