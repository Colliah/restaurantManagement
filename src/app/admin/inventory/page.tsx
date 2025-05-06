"use client";
import * as React from "react";
import DataTable from "./data-table";
import { columns, Inventory } from "./columns";

const data:Inventory[] = [
  {
    id: "1",
    ingredient: {
      id: "1",
      name: "Flour",
      unit: "kg",
      category: "Baking",
    },
    quantity: 25,
    lastUpdated: ("2023-05-01"),
    minimumRequired: 10,
    lowStock: false,
  },
]
    

const InventoryPage = () =>{
 return(
    <div>
        <DataTable columns={columns} data={data} />
    </div>
  );
}
export default InventoryPage;