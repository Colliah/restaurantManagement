"use client";
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
import { Form } from "./ui/form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ingredientsApi } from "@/services/ingredients";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "./providers/providers";
import { useState } from "react";
import { Edit, Loader2 } from "lucide-react";
import { Ingredient } from "@/app/admin/ingredients/columns";
import { IngredientCategory } from "@/enums/ingredient-category.enum";
import { Textarea } from "./ui/textarea";

export enum Unit {
  GRAM = "g",
  KILOGRAM = "kg",
  LITER = "l",
  MILLILITER = "ml",
  PIECES = "pieces",
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  unit: z.nativeEnum(Unit).optional(),
  category: z
    .string()
    .min(1, {
      message: "Category is required.",
    }),
  description: z
    .string()
    .optional(),
  averageCost: z.coerce.number().optional(),
  allergenInfo: z
    .string()
    .optional(),
  nutritionalInfo: z
    .string()
    .optional(),
});

interface SheetIngredientProps {
  ingredientId?: string;
  initialData?: Ingredient;
  mode?: "create" | "edit";
}

const SheetIngredient = ({
  mode,
  ingredientId,
  initialData,
}: SheetIngredientProps) => {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (mode === "create") {
        return ingredientsApi.createIngredient(data);
      }
      return ingredientsApi.updateIngredient(ingredientId!, data);
    },
    onSuccess: () => {
      toast.success(
        mode === "create" ? "Ingredient created" : "Ingredient updated",
      );
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
    onSettled: () => {
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "create"
        ? {
          name: "",
          unit: undefined,
          category: "",
          description: "",
          averageCost: 0,
          allergenInfo: "",
          nutritionalInfo: ""
        }
        : {
          name: initialData?.name || "",
          unit: initialData?.unit || undefined,
          category: initialData?.category || "",
          description: initialData?.description || "",
          averageCost: initialData?.averageCost || 0,
          allergenInfo: initialData?.allergenInfo || "",
          nutritionalInfo: initialData?.nutritionalInfo || "",
        },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="ml-4">
        {mode === "create" ? (
          <Button>Create</Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="!w-[50%]">
        <SheetHeader className="mb-8">
          <SheetTitle>Ingredients</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Unit <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Unit).map((v) => (
                          <SelectItem key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(IngredientCategory).map((v) => (
                          <SelectItem className="capitalize" key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <FormField
              control={form.control}
              name="averageCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Average Cost
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allergenInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Allergen Info
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nutritionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nutritional Info
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
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
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetIngredient;
