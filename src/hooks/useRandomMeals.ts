import { useAsync } from "./useAsync";
import { getRandomMeals } from "../services/api";
import type { Meal } from "../types/meal";

export function useRandomMeals(count: number) {
  const { data, loading, error } = useAsync<Meal[]>(
    () => getRandomMeals(count),
    [count],
    "Failed to load meals."
  );
  return { meals: data ?? [], loading, error };
}
