"use client";

import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dispatch, SetStateAction, useState } from "react";
import PosReservation from "./pos-reservation";

const tableStatus = [
  { title: "All", value: "all", className: "" },
  { title: "Available", value: "available", className: "text-green-600" },
  { title: "Occupied", value: "occupied", className: "text-red-600" },
  { title: "Reserved", value: "reserved", className: "text-yellow-600" },
  { title: "Maintenance", value: "maintenance", className: "text-gray-600" },
];

interface TableSelectionProps {
  tableSelected: number | undefined;
  onSelectTable: Dispatch<SetStateAction<number | undefined>>;
}

// Generate 30 tables with varying capacities and statuses
const statuses = ["available", "occupied", "maintenance", "reserved"];
const capacities = [2, 4, 6, 8];
const tables = Array.from({ length: 37 }, (_, i) => ({
  id: i + 1,
  name: `Table ${i + 1}`,
  capacity: capacities[i % capacities.length],
  status: statuses[i % statuses.length],
}));

// Status background color map
const statusBgMap: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  occupied: "bg-red-100 text-red-800",
  reserved: "bg-yellow-100 text-yellow-800",
  maintenance: "bg-gray-200 text-gray-800",
};

export default function TableSelection({
  tableSelected,
  onSelectTable,
}: TableSelectionProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  // const [showReservationDialog, setShowReservationDialog] =
  //   useState<boolean>(false);

  const filteredTables = tables.filter(
    (table) => statusFilter === "all" || table.status === statusFilter,
  );

  return (
    <div className="h-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tables</h2>
        <div className="flex items-center gap-4">
          <ToggleGroup
            type="single"
            variant="outline"
            value={statusFilter}
            onValueChange={(value) => value && setStatusFilter(value)}
          >
            {tableStatus.map((status, idx) => (
              <ToggleGroupItem
                key={idx}
                value={status.value}
                className={cn(status.className)}
              >
                {status.title}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <PosReservation />
        </div>
      </div>

      <div className="grid max-h-[calc(100vh-200px)] grid-cols-5 gap-4 overflow-y-auto p-1">
        {filteredTables.map((table) => (
          <Card
            key={table.id}
            className={cn(
              "transition-all duration-300",
              tableSelected === table.id && "ring-2 ring-primary",
              table.status === "maintenance"
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:ring-2 hover:ring-primary",
            )}
            onClick={() => onSelectTable(table.id)}
          >
            <CardContent className="flex flex-col items-center justify-center p-4 text-center">
              <h3 className="font-medium">Table ${table.id}</h3>
              <p className="text-sm text-muted-foreground">
                {table.capacity} seats
              </p>
              <Badge
                variant="outline"
                className={cn("mt-2 capitalize", statusBgMap[table.status])}
              >
                {table.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
