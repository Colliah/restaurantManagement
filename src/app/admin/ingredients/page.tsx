"use client";

import DataTable from "./data-table";
import { columns } from "./columns";
import { useIngredients } from "@/hooks/api/use-ingredient";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function IngredientsPage() {
  const { data, isLoading } = useIngredients();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingredients</CardTitle>
        <CardDescription>Create and manage your menu offerings. Update names, prices, descriptions, ingredients, and availability for each item.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} isLoading={isLoading} data={data || []} />

      </CardContent>
    </Card>
  );
}
export default IngredientsPage;
