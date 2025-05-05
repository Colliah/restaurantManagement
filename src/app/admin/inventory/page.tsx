"use client";
import * as React from "react";
import DataTable from "./data-table";
import { columns, Inventory } from "./columns";

const data:Inventory[] = [
    {
    ingredient: 'Milk',
    category: "Dairy",
    currentQuantity: 5,
    minimumRequired: 10,
    status: true,
    lastUpdated:"6/5/2003",
    actions: 'Edit',
    }
]
    

const InventoryPage = () =>{
 return(
    <div>
        <DataTable columns={columns} data={data} />
    </div>
  );
}
export default InventoryPage;