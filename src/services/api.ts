import type { Meal } from "../types/meal";

interface MealResponse {
  meals: Meal[];
}

const API_KEY = "1";
const BASE_URL = "https://themealdb.com/api/json/v1";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${API_KEY}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const getRandomMeal = async (): Promise<Meal> => {
  const data = await fetchApi<MealResponse>("random.php");
  return data.meals[0];
};

export const getMeal = async (id: string): Promise<Meal> => {
  const data = await fetchApi<MealResponse>(`lookup.php?i=${id}`);
  return data.meals[0];
};

export const getRandomMeals = async (count: number): Promise<Meal[]> => {
  return Promise.all(
    Array.from({ length: count }, () => getRandomMeal())
  );
};
