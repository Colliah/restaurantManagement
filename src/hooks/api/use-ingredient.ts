import { ingredientsApi } from "@/services/ingredients";
import { useQuery } from "@tanstack/react-query";

export const useIngredients = () => {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: ingredientsApi.findAll,
  });
};
