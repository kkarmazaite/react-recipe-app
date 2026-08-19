import type { Area } from "../types/area";
import type { Category } from "../types/category";
import type { Ingredient } from "../types/ingredient";
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

export const searchMeals = async (query: string): Promise<Meal[]> => {
  const data = await fetchApi<MealResponse>(`search.php?s=${encodeURIComponent(query)}`);
  return data.meals ?? [];
};

export const getCategoryList = async (): Promise<Category[]> => {
  const data = await fetchApi<{ meals: Category[] }>("list.php?c=list");
  return data.meals ?? [];
};

export const getAreaList = async (): Promise<Area[]> => {
  const data = await fetchApi<{ meals: Area[] }>("list.php?a=list");
  return data.meals ?? [];
};

export const getIngredientList = async (): Promise<Ingredient[]> => {
  const data = await fetchApi<{ meals: Ingredient[] }>("list.php?i=list");
  return data.meals ?? [];
};

export const filterByCategory = async (category: string): Promise<Meal[]> => {
  const data = await fetchApi<{ meals: Meal[] | null }>(
    `filter.php?c=${encodeURIComponent(category)}`
  );
  return data.meals ?? [];
};

export const filterByArea = async (area: string): Promise<Meal[]> => {
  const data = await fetchApi<{ meals: Meal[] | null }>(
    `filter.php?a=${encodeURIComponent(area)}`
  );
  return data.meals ?? [];
};

export const filterByIngredient = async (ingredient: string): Promise<Meal[]> => {
  const data = await fetchApi<{ meals: Meal[] | null }>(
    `filter.php?i=${encodeURIComponent(ingredient)}`
  );
  return data.meals ?? [];
};
