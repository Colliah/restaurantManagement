"use client";

import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Grid,
  Beef,
  Pizza,
  Salad,
  Sandwich,
  Soup,
  Cookie,
  Coffee,
  Star,
  Clock,
  Filter,
  List,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";

const menuItems: any[] = [
  {
    id: "1",
    name: "Classic Burger",
    price: 12.99,
    category: "burgers",
    description: "Beef patty with lettuce, tomato, and special sauce",
    image: "https://placehold.co/100x100",
  },
  {
    id: "2",
    name: "Caesar Salad",
    price: 9.99,
    category: "salads",
    description: "Romaine lettuce with croutons and Caesar dressing",
    image: "https://placehold.co/100x100",
  },
  {
    id: "3",
    name: "Margherita Pizza",
    price: 14.99,
    category: "pizzas",
    description: "Tomato sauce, mozzarella, and fresh basil",
    image: "https://placehold.co/100x100",
  },
  {
    id: "4",
    name: "Garlic Bread",
    price: 5.99,
    category: "appetizers",
    description: "Toasted bread with garlic butter",
    image: "https://placehold.co/100x100",
  },
  {
    id: "5",
    name: "Chocolate Cake",
    price: 7.99,
    category: "desserts",
    description: "Rich chocolate cake with ganache",
    image: "https://placehold.co/100x100",
  },
  {
    id: "6",
    name: "Iced Tea",
    price: 3.99,
    category: "beverages",
    description: "Freshly brewed iced tea",
    image: "https://placehold.co/100x100",
  },
  {
    id: "7",
    name: "Pasta Carbonara",
    price: 13.99,
    category: "pasta",
    description: "Spaghetti with bacon, eggs, and parmesan",
    image: "https://placehold.co/100x100",
  },
  {
    id: "8",
    name: "Cheesecake",
    price: 8.99,
    category: "desserts",
    description: "New York style cheesecake",
    image: "https://placehold.co/100x100",
  },
  {
    id: "9",
    name: "Lemonade",
    price: 3.99,
    category: "beverages",
    description: "Fresh squeezed lemonade",
    image: "https://placehold.co/100x100",
  },
  {
    id: "10",
    name: "Chicken Wings",
    price: 10.99,
    category: "appetizers",
    description: "Spicy buffalo wings with blue cheese dip",
    image: "https://placehold.co/100x100",
  },
  {
    id: "11",
    name: "Fish & Chips",
    price: 15.99,
    category: "mains",
    description: "Battered cod with fries and tartar sauce",
    image: "https://placehold.co/100x100",
  },
  {
    id: "12",
    name: "Coffee",
    price: 4.99,
    category: "beverages",
    description: "Freshly brewed coffee",
    image: "https://placehold.co/100x100",
  },
  {
    id: "13",
    name: "Veggie Burger",
    price: 11.99,
    category: "burgers",
    description: "Plant-based patty with avocado and sprouts",
    image: "https://placehold.co/100x100",
  },
  {
    id: "14",
    name: "Greek Salad",
    price: 10.99,
    category: "salads",
    description: "Cucumber, tomato, olives, and feta cheese",
    image: "https://placehold.co/100x100",
  },
  {
    id: "15",
    name: "Pepperoni Pizza",
    price: 15.99,
    category: "pizzas",
    description: "Tomato sauce, mozzarella, and pepperoni",
    image: "https://placehold.co/100x100",
  },
];

interface MenuSectionProps {
  onAddToCart: (menuItem: any) => void;
}

export default function MenuSelection({ onAddToCart }: MenuSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // const uniqueCategories = Array.from(new Set(menuItems.map((item) => item.category)))
  // const categories = ["all", ...uniqueCategories.sort()]

  const categoryTabs = [
    { value: "all", name: "All Items", icon: Grid },
    { value: "burgers", name: "Burgers", icon: Beef },
    { value: "pizzas", name: "Pizzas", icon: Pizza },
    { value: "salads", name: "Salads", icon: Salad },
    { value: "appetizers", name: "Appetizers", icon: Sandwich },
    { value: "mains", name: "Main Courses", icon: Soup },
    { value: "pasta", name: "Pasta", icon: Soup },
    { value: "desserts", name: "Desserts", icon: Cookie },
    { value: "beverages", name: "Beverages", icon: Coffee },
    { value: "favorites", name: "Favorites", icon: Star },
    { value: "specials", name: "Specials", icon: Clock },
  ];

  // Filter options
  const filterOptions = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "gluten-free", label: "Gluten Free" },
    { id: "spicy", label: "Spicy" },
    { id: "popular", label: "Popular" },
    { id: "new", label: "New Items" },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId],
    );
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriceRange =
      item.price >= priceRange[0] && item.price <= priceRange[1];

    // In a real app, you would have actual data for these filters
    // This is just a placeholder implementation
    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => {
        if (
          filter === "vegetarian" &&
          (item.category === "salads" || item.id === "13")
        )
          return true;
        if (filter === "gluten-free" && item.category === "salads") return true;
        if (filter === "spicy" && item.id === "10") return true;
        if (filter === "popular" && ["1", "3", "7", "10"].includes(item.id))
          return true;
        if (filter === "new" && ["13", "14", "15"].includes(item.id))
          return true;
        return false;
      });

    return (
      matchesCategory && matchesSearch && matchesPriceRange && matchesFilters
    );
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search menu..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {selectedFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedFilters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filters</h4>
                <Separator />
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Dietary Preferences</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={option.id}
                          checked={selectedFilters.includes(option.id)}
                          onCheckedChange={() => toggleFilter(option.id)}
                        />
                        <Label htmlFor={option.id}>{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Price Range</h5>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">${priceRange[0]}</span>
                    <div className="flex-1">
                      <Input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            Number.parseInt(e.target.value),
                          ])
                        }
                        className="w-full"
                      />
                    </div>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedFilters([]);
                      setPriceRange([0, 50]);
                    }}
                  >
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <Tabs
          orientation="vertical"
          defaultValue={selectedCategory}
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          className="flex flex-1 items-start gap-4"
        >
          <TabsList className="grid h-auto min-w-28 shrink-0 grid-cols-1 bg-background p-0">
            {categoryTabs.map((tab: any) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="justify-start rounded border-l-2 border-transparent py-1.5 data-[state=active]:border-primary data-[state=active]:bg-muted data-[state=active]:shadow-none"
              >
                <tab.icon className="me-2 h-5 w-5" /> {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-hidden">
            {categoryTabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-0 h-full"
              >
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  {tab.value === "favorites" ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>Your favorite items will appear here</p>
                      <Button variant="outline" className="mt-2">
                        Add Favorites
                      </Button>
                    </div>
                  ) : tab.value === "specials" ? (
                    <div className="space-y-4">
                      <Card className="overflow-hidden">
                        <div className="relative h-40 w-full">
                          <Image
                            src="https://placehold.co/200x600"
                            alt="Daily Special"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
                            <div className="p-4 text-white">
                              <Badge className="mb-2 bg-red-500">
                                Today&apos;s Special
                              </Badge>
                              <h3 className="text-xl font-bold">
                                Chef&apos;s Special Pasta
                              </h3>
                              <p className="text-sm opacity-90">
                                Fresh pasta with seasonal ingredients
                              </p>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Limited availability
                              </p>
                              <p className="font-medium">$18.99</p>
                            </div>
                            <Button
                              onClick={() =>
                                onAddToCart({
                                  id: "special-1",
                                  name: "Chef's Special Pasta",
                                  price: 18.99,
                                  category: "specials",
                                  description:
                                    "Fresh pasta with seasonal ingredients",
                                  image: "https://placehold.co/200x600",
                                })
                              }
                            >
                              Add to Order
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Card>
                          <CardContent className="p-4">
                            <Badge className="mb-2">Weekend Special</Badge>
                            <h3 className="font-medium">Surf & Turf</h3>
                            <p className="text-sm text-muted-foreground">
                              Steak and lobster with sides
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                              <p className="font-medium">$29.99</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  onAddToCart({
                                    id: "special-2",
                                    name: "Surf & Turf",
                                    price: 29.99,
                                    category: "specials",
                                    description: "Steak and lobster with sides",
                                    image: "/placeholder.svg",
                                  })
                                }
                              >
                                Add
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <Badge className="mb-2">Seasonal</Badge>
                            <h3 className="font-medium">Pumpkin Spice Latte</h3>
                            <p className="text-sm text-muted-foreground">
                              Limited time seasonal beverage
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                              <p className="font-medium">$5.99</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  onAddToCart({
                                    id: "special-3",
                                    name: "Pumpkin Spice Latte",
                                    price: 5.99,
                                    category: "beverages",
                                    description:
                                      "Limited time seasonal beverage",
                                    image: "/placeholder.svg",
                                  })
                                }
                              >
                                Add
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : filteredItems.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No items found</p>
                      <p className="text-sm">Try adjusting your filters</p>
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 pr-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredItems.map((item) => (
                        <Card
                          key={item.id}
                          className="overflow-hidden transition-shadow hover:shadow-md"
                        >
                          <div className="relative h-32 w-full">
                            <Image
                              src={item.image || "https://placehold.co/100x100"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                              <Badge>${item.price.toFixed(2)}</Badge>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button
                              className="w-full"
                              onClick={() => onAddToCart(item)}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add to Order
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2 pr-4">
                      {filteredItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center rounded-md border p-3 hover:bg-muted/50"
                        >
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={item.image || "https://placehold.co/100x100"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{item.name}</h3>
                              <Badge>${item.price.toFixed(2)}</Badge>
                            </div>
                            <p className="line-clamp-1 text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => onAddToCart(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
