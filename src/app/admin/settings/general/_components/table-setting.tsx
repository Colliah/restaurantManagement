"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableItem, TableStatus } from "@/types/table";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TableSetting() {
  const [tables, setTables] = useState<TableItem[]>([
    { id: 1, name: "Table 1", capacity: 2, status: "available" },
    { id: 2, name: "Table 2", capacity: 4, status: "occupied" },
    { id: 3, name: "Table 3", capacity: 4, status: "maintenance" },
    { id: 4, name: "Table 4", capacity: 6, status: "available" },
    { id: 5, name: "Table 5", capacity: 2, status: "reserved" },
    { id: 6, name: "Table 6", capacity: 8, status: "available" },
    { id: 7, name: "Table 7", capacity: 4, status: "occupied" },
    { id: 8, name: "Table 8", capacity: 2, status: "available" },
    { id: 9, name: "Table 9", capacity: 6, status: "maintenance" },
    { id: 10, name: "Table 10", capacity: 4, status: "available" },
    { id: 11, name: "Table 11", capacity: 2, status: "occupied" },
    { id: 12, name: "Table 12", capacity: 8, status: "available" },
  ]);

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "occupied":
        return "bg-red-500";
      case "reserved":
        return "bg-yellow-500";
      case "maintenance":
        return "bg-gray-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusBadge = (status: TableStatus) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800 hover:text-white">Available</Badge>;
      case "occupied":
        return <Badge className="bg-red-100 text-red-800 hover:text-white">Occupied</Badge>;
      case "reserved":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:text-white">Reserved</Badge>;
      case "maintenance":
        return <Badge className="bg-gray-500 text-white">Maintenance</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to POS</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Table Management</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tables</CardTitle>
              <CardDescription>
                Manage restaurant tables and their status.
              </CardDescription>
            </div>

            <TableForm mode="create" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tables.map((table) => (
                <TableRow key={table.id}>
                  <TableCell>{table.id}</TableCell>
                  <TableCell>{table.name}</TableCell>
                  <TableCell>{table.capacity} seats</TableCell>
                  <TableCell>{getStatusBadge(table.status)}</TableCell>
                  <TableCell className="text-right">
                    <TableForm mode="edit" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Total tables: {tables.length}
          </p>
          <div className="flex gap-2">
            <Badge className="bg-green-500">
              {tables.filter((table) => table.status === "available").length}{" "}
              Available
            </Badge>
            <Badge className="bg-red-500">
              {tables.filter((table) => table.status === "occupied").length}{" "}
              Occupied
            </Badge>
            <Badge className="bg-yellow-500">
              {tables.filter((table) => table.status === "reserved").length}{" "}
              Reserved
            </Badge>
            <Badge className="bg-gray-500">
              {tables.filter((table) => table.status === "maintenance").length}{" "}
              Maintenance
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

interface TableFormProps {
  mode: "create" | "edit";
}

function TableForm({ mode }: TableFormProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={mode === "create" ? "default" : "ghost"}
          size={mode === "create" ? "default" : "icon"}
        >
          {mode === "create" ? (
            <>
              <Plus className="size-4" />
              Add
            </>
          ) : (
            <Edit className="size-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {" "}
          {mode === "create" ? "Add Table" : "Edit Table"}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
