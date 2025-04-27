"use client";
import React from "react";
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
import { Textarea } from "./ui/textarea";

const foodItem = [
  {
    id: "1",
    name: "Pizza",
    description: "Delicious pizza",
    price: 10,
    category: "Pizza",
    isAvailable: true,
    imageUrl: "www.gogle.com",
  },
];

const allIngredients = [
  {
    ingredientId: "flour",
    name: "Flour",
  },
  {
    ingredientId: "cheese",
    name: "Cheese",
  },
  {
    ingredientId: "tomato",
    name: "Tomato Sauce",
  },
];

// Updated form schema
const formSchema = z.object({
  foodItem: z
    .object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number(),
      category: z.string(),
      isAvailable: z.boolean(),
      imageUrl: z.string().optional(),
    })
    .optional(),
  instructions: z.string().min(1, "Instructions are required"),
  preparationTime: z.coerce
    .number()
    .min(1, "Preparation time must be at least 1 minute"),
  ingredients: z
    .array(
      z.object({
        ingredientId: z.string(),
        name: z.string(),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1, "At least one ingredient is required"),
});

const SheetRecipes = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodItem: undefined,
      instructions: "",
      preparationTime: 0,
      ingredients: [],
    },
  });

  const { watch, setValue } = form;
  const currentIngredients = watch("ingredients");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleAddIngredient = (ingredientId: string) => {
    const ingredient = allIngredients.find(
      (i) => i.ingredientId === ingredientId,
    );
    if (!ingredient) return;

    // Check if ingredient already exists
    if (currentIngredients.some((i) => i.ingredientId === ingredientId)) {
      return;
    }

    setValue("ingredients", [
      ...currentIngredients,
      {
        ingredientId: ingredient.ingredientId,
        name: ingredient.name,
        quantity: 1,
      },
    ]);
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    setValue(
      "ingredients",
      currentIngredients.filter((i) => i.ingredientId !== ingredientId),
    );
  };

  const handleQuantityChange = (ingredientId: string, quantity: number) => {
    setValue(
      "ingredients",
      currentIngredients.map((i) =>
        i.ingredientId === ingredientId ? { ...i, quantity } : i,
      ),
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="ml-4">
        <Button>Create</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-8">
          <SheetTitle>Recipes</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="foodItem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Food Item <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(foodId) => {
                      const selectedFood = foodItem.find(
                        (food) => food.id === foodId,
                      );
                      field.onChange(selectedFood);
                    }}
                    value={field.value?.id}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a food item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {foodItem.map((food) => (
                        <SelectItem key={food.id} value={food.id}>
                          {food.name}
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
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Instructions <span className="text-red-500">*</span>
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
              name="preparationTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Preparation Time <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="How many minutes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>
                Ingredients <span className="text-red-500">*</span>
              </FormLabel>
              <div className="space-y-4">
                {/* Select to add new ingredient */}
                <Select onValueChange={handleAddIngredient} value="">
                  <SelectTrigger>
                    <SelectValue placeholder="Add an ingredient" />
                  </SelectTrigger>
                  <SelectContent>
                    {allIngredients
                      .filter(
                        (ingredient) =>
                          !currentIngredients.some(
                            (i) => i.ingredientId === ingredient.ingredientId,
                          ),
                      )
                      .map((ingredient) => (
                        <SelectItem
                          key={ingredient.ingredientId}
                          value={ingredient.ingredientId}
                        >
                          {ingredient.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                {/* List of selected ingredients with quantity inputs */}
                {currentIngredients.map((ingredient) => (
                  <div
                    key={ingredient.ingredientId}
                    className="flex items-center gap-2"
                  >
                    <div className="flex-1">
                      <p>{ingredient.name}</p>
                    </div>
                    <div className="w-24">
                      <Input
                        type="number"
                        min="1"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            ingredient.ingredientId,
                            parseInt(e.target.value) || 1,
                          )
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleRemoveIngredient(ingredient.ingredientId)
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <SheetFooter>
              <Button type="submit">Submit</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetRecipes;
