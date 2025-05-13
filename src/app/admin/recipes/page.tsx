"use client";
import * as React from "react";
import DataTable from "./data-table";
import { columns, Recipe } from "./columns";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
const data: Recipe[] = [
  {
    id: "1",
    name: "Trung chien",
    instruction: "xxx",
    servingSize: 1,
    preparationTime: 10,
    createdAt: new Date("4/24/2025"),
    updatedAt: new Date("4/24/2025"),
  },
  {
    id: "2",
    name: "Thit kho hot vit",
    instruction: "xxx",
    servingSize: 2,
    preparationTime: 30,
    createdAt: new Date("4/24/2025"),
    updatedAt: new Date("4/24/2025"),
  },
];
function RecipesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recipes</CardTitle>
        <CardDescription>Manage all menu entries in one place. Add or update item names, prices, descriptions, ingredients, and full recipes to ensure consistency in preparation and presentation.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
export default RecipesPage;
