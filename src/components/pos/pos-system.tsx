"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Header from "./header";
import MenuSelection from "./menu-selection";
import OrderSummary from "./order-summary";
import TableSelection from "./table-selection";

export default function PosSystem() {
  const [activeTab, setActiveTab] = useState<string>("tables");
  const [tableSelected, setTableSelected] = useState<number>();

  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden">
      <Header />
      <div className="h-full w-full">
        <div className="flex h-full flex-1 flex-col">
          <div className="grid h-full grid-cols-3 gap-4 p-4">
            <div className="col-span-2 overflow-auto rounded-xl border bg-white shadow">
              <Tabs
                className="mt-4 mx-4"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="inline-flex w-auto">
                  <TabsTrigger value="tables">Tables</TabsTrigger>
                  <TabsTrigger value="menu">Menu</TabsTrigger>
                </TabsList>
                <TabsContent value="tables">
                  <TableSelection
                    tableSelected={tableSelected}
                    onSelectTable={setTableSelected}
                  />
                </TabsContent>
                <TabsContent value="menu">
                  <MenuSelection />
                </TabsContent>
              </Tabs>
            </div>
            <div className="col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
