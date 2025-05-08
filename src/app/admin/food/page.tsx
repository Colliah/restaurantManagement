"use client";
import React from "react";
import DataTable from "./data-table";
import { columns, Food } from "./columns";
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
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default FoodPage;
