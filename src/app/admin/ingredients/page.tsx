"use client";
import * as React from "react";
import DataTable from "./data-table";
import { columns, Ingredient } from "./columns";
const data: Ingredient[] = [
  {
    id: "1",
    name: "Sugar",
    unit: 316,
    currentStock: 100,
    minimumStock: 100,
    supplierInfo: "Abc",
    costPerUnit: 100,
    createdAt: new Date("4/24/2025"),
    updatedAt: new Date("4/24/2025"),
  },
  {
    id: "1",
    name: "Sugar",
    unit: 316,
    currentStock: 101,
    minimumStock: 101,
    supplierInfo: "Abc",
    costPerUnit: 100,
    createdAt: new Date("4/24/2025"),
    updatedAt: new Date("4/24/2025"),
  },
];
function IngredientsPage() {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
export default IngredientsPage;
