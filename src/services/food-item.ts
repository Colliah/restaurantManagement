import { API_URL } from "@/constants";

export const foodItemApi = {
  async findAll() {
    const response = await fetch(`${API_URL}/food-items`);
    return response.json();
  },
};
