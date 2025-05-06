"use client";
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Inventory } from '@/app/admin/inventory/columns';
import { Edit } from 'lucide-react';
import { Button } from './ui/button';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';




const formSchema = z.object({
  updateType: z.string().min(1, "Please select an update type"),
  amount: z.string().min(1, "Please enter an amount"),
  reason: z.string().min(1, "Please enter a reason"),
})

interface SheetInventoryProps {
  inventoryId?: string;
  initialData?: Inventory;
  mode?: "create" | "edit"
}
const SheetInventory = ({ mode, }: SheetInventoryProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      updateType: "",
      amount: "",
      reason: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="ml-4">
        {mode === "create" ? (
          <Button>Create</Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Update Flour Stock</SheetTitle>
          <SheetDescription>
            Make changes to your inventory stock. Please fill in all required fields.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="updateType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select update type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="add">Add Stock</SelectItem>
                      <SelectItem value="remove">Remove Stock</SelectItem>
                      <SelectItem value="update">Set Exact Amount</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount to Add</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input type="number" placeholder="Enter quantity" {...field} />
                      <span className="ml-2">kg</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Update</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter reason for inventory update"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-black">
              Update Inventory
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default SheetInventory