import type { Meal } from "../types/meal";

interface MealResponse {
  meals: Meal[];
}

const API_KEY = "1";
const BASE_URL = "https://themealdb.com/api/json/v1";

export const getRandomMeal = async (): Promise<Meal> => {
  const response = await fetch(`${BASE_URL}/${API_KEY}/random.php`);

  if (!response.ok) {
    throw new Error("Failed to fetch random meal");
  }

  const data: MealResponse = await response.json();

  return data.meals[0];
};

export const getRandomMeals = async (count: number): Promise<Meal[]> => {
  return Promise.all(
    Array.from({ length: count }, () => getRandomMeal())
  );
};
