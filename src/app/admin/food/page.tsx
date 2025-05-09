"use client";
import React from "react";
import DataTable from "./data-table";
import { columns, Food } from "./columns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const data: Food[] = [
  {
    name: "Ice cream",
    description: "abc",
    price: 100,
    category: "dairy",
    isAvailable: true,
    imageUrl: "abc.com",
  },
];
const FoodPage = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data || []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodPage;
