import { useAsync } from "./useAsync";
import { getAreaList, getCategoryList, getIngredientList } from "../services/api";
import type { Category } from "../types/category";
import type { Ingredient } from "../types/ingredient";
import type { Area } from "../types/area";

export function useCategoryList() {
  const { data, loading, error } = useAsync<Category[]>(
    () => getCategoryList(),
    [],
    "Failed to load categories."
  );
  return { categories: data ?? [], loading, error };
}

export function useAreaList() {
  const { data, loading, error } = useAsync<Area[]>(
    () => getAreaList(),
    [],
    "Failed to load areas."
  );
  return { areas: data ?? [], loading, error };
}

export function useIngredientList() {
  const { data, loading, error } = useAsync<Ingredient[]>(
    () => getIngredientList(),
    [],
    "Failed to load ingredients."
  );
  return { ingredients: data ?? [], loading, error };
}
