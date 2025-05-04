import { instance } from "@/lib/axios";

export const ingredientsApi = {
  async findAll() {
    const response = await instance.get(`/ingredients`);
    return response.data;
  },

  async createIngredient(data: any) {
    const response = await instance.post(`/ingredients`, data);
    return response.data;
  },

  async updateIngredient(ingredientId:string, data: any) {
    const response = await instance.patch(`/ingredients/${ingredientId}`, data);
    return response.data;
  },

  async deleteIngredient(ingredientId:string) {
    const response = await instance.delete(`/ingredients/${ingredientId}`);
    return response.data;
  },
};
