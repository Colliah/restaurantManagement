"use client";

import DataTable from "@/components/data-table";
import SheetMenuItems from "@/components/sheet-menu-items";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { columns } from "./columns";
import { Food } from "./columns";
import MenuItemCard from "@/components/menu-item-card";

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

export default function MenuItemsTable() {
  return (
    <Tabs defaultValue="menu-items">
      <TabsList className="w-fit justify-start rounded border-b bg-background p-0">
        <TabsTrigger
          className="h-full rounded-b-none border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:shadow-none"
          value="menu-categories"
        >
          Menu Categories
        </TabsTrigger>
        <TabsTrigger
          className="h-full rounded-b-none border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:shadow-none"
          value="menu-items"
        >
          Menu Items
        </TabsTrigger>
      </TabsList>
      <TabsContent value="menu-categories" className="mt-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <MenuItemCard data={data} />
        </div>
      </TabsContent>

      <TabsContent value="menu-items">
        <Card>
          <CardHeader>
            <CardTitle>Menu Items</CardTitle>
            <CardDescription>
              Manage all menu items here. Add, edit, or remove dishes, update
              descriptions, prices, and availability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data}
              AddComponent={() => <SheetMenuItems mode="create" />}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
