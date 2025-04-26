"use client";
import * as React from "react";
import DataTable from "./data-table";
import { columns, Recipe } from "./columns";
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
  <div>
    <DataTable columns={columns} data={data} />
  </div>;
}
export default RecipesPage;
