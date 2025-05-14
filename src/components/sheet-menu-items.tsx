"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormDescription } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./ui/file-upload";
import { CloudUpload, X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  price: z.number().min(0, {
    message: "Price must be at least 1.",
  }),
  category: z
    .string()
    .min(2, {
      message: "Category must be at least 2 characters.",
    })
    .optional(),
  isAvailable: z.boolean().optional(),
  imageUrl: z.string(),
});

interface SheetMenuItemsProps {
  mode: "create" | "edit";
}

const SheetMenuItems = ({ mode }: SheetMenuItemsProps) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      isAvailable: false,
      imageUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    //maybe làm toast ở đây
    console.log(values);
  }
  return (
    <Sheet>
      <SheetTrigger asChild className="ml-4">
        <Button>{mode === "create" ? "Create" : "Edit"}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-8">
          <SheetTitle>
            {mode === "create" ? "Create menu item" : "Edit menu item"}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Price <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="space-x-6">
                  <FormLabel>Available</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select File</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative rounded-lg bg-background p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex w-full flex-col items-center justify-center p-8">
                          <CloudUpload className="h-10 w-10 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent className="w-[300px] flex-row gap-2 overflow-x-auto">
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => {
                            const imageUrl = URL.createObjectURL(file);
                            return (
                              <FileUploaderItem key={i} index={i}>
                                <div className="relative h-20 w-20">
                                  <img
                                    src={imageUrl}
                                    alt={file.name}
                                    className="h-20 w-20 rounded-md object-cover"
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white"
                                    onClick={() => {
                                      const newFiles = files.filter(
                                        (_, index) => index !== i,
                                      );
                                      setFiles(newFiles);
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </FileUploaderItem>
                            );
                          })}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>Select a file to upload.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type="submit">Submit</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenuItems;
