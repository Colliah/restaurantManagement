import { foodItemApi } from "@/services/food-item";
import { useQuery } from "@tanstack/react-query";

export const useFoodItems = () =>
  useQuery({
    queryKey: ["food_items"],
    queryFn: foodItemApi.findAll,
  });
