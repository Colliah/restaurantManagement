"use client";
import React from "react";
import DataTable from "./data-table";
import { columns, Food } from "./columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>Menu Items</CardTitle>
        <CardDescription>Manage all menu items here. Add, edit, or remove dishes, update descriptions, prices, and availability.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default FoodPage;
