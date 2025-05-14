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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableItem, TableStatus } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function TableSetting() {
  const [tables, setTables] = useState<TableItem[]>([
    { number: 1, capacity: 2, status: "available" },
    { number: 2, capacity: 4, status: "occupied" },
    { number: 3, capacity: 4, status: "maintenance" },
    { number: 4, capacity: 6, status: "available" },
    { number: 5, capacity: 2, status: "reserved" },
    { number: 6, capacity: 8, status: "available" },
    { number: 7, capacity: 4, status: "occupied" },
    { number: 8, capacity: 2, status: "available" },
    { number: 9, capacity: 6, status: "maintenance" },
    { number: 10, capacity: 4, status: "available" },
    { number: 11, capacity: 2, status: "occupied" },
    { number: 12, capacity: 8, status: "available" },
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
        return (
          <Badge className="bg-green-100 text-green-800 hover:text-white">
            Available
          </Badge>
        );
      case "occupied":
        return (
          <Badge className="bg-red-100 text-red-800 hover:text-white">
            Occupied
          </Badge>
        );
      case "reserved":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:text-white">
            Reserved
          </Badge>
        );
      case "maintenance":
        return <Badge className="bg-gray-500 text-white">Maintenance</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center">
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
          <div className="flex items-center justify-between">
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
                <TableRow key={table.number}>
                  <TableCell>{table.number}</TableCell>
                  <TableCell>Bàn {table.number}</TableCell>
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

const tableFormSchema = z.object({
  number: z.coerce.number().min(1).max(100),
  capacity: z.coerce.number().min(1).max(10),
  status: z.enum(["available", "occupied", "reserved", "maintenance"]),
});

function TableForm({ mode }: TableFormProps) {
  const form = useForm<z.infer<typeof tableFormSchema>>({
    resolver: zodResolver(tableFormSchema),
    defaultValues: {
      number: 0,
      capacity: 0,
      status: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof tableFormSchema>) {
    console.log(values);
  }

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
          <DialogTitle>
            {mode === "create" ? "Add Table" : "Edit Table"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Create a new" : "Edit"} table for your
            restaurant.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Table number</FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        placeholder="Table number"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Capacity</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="Table capacity" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="col-span-3">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
