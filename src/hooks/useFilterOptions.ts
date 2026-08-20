import { useAsync } from "./useAsync";
import { getAreaList, getCategoryList, getIngredientList } from "../services/api";
import type { Category } from "../types/category";
import type { Ingredient } from "../types/ingredient";
import type { Area } from "../types/area";
import { useMemo } from "react";

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

  const areas = useMemo(() => {
    const unique = new Set((data ?? []).map((a) => a.strArea));
    return Array.from(unique).sort();
  }, [data]);
  
  return { areas, loading, error };
}

export function useIngredientList() {
  const { data, loading, error } = useAsync<Ingredient[]>(
    () => getIngredientList(),
    [],
    "Failed to load ingredients."
  );
  return { ingredients: data ?? [], loading, error };
}
