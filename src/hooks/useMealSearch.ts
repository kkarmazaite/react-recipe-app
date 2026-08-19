import { useRef, useState } from "react";
import { searchMeals, filterByCategory, filterByIngredient, filterByArea } from "../services/api";
import type { Meal } from "../types/meal";

type SearchMode = "query" | "category" | "area" | "ingredient";

interface UseMealSearchResult {
  results: Meal[];
  loading: boolean;
  error: string | null;
  searchByQuery: (query: string) => void;
  searchByCategory: (category: string) => void;
  searchByArea: (area: string) => void;
  searchByIngredient: (ingredient: string) => void;
}

export function useMealSearch(): UseMealSearchResult {
  const [results, setResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const run = (mode: SearchMode, fn: () => Promise<Meal[]>) => {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(null);

    fn()
      .then((data) => {
        if (currentRequest !== requestId.current) return;
        setResults(data);
      })
      .catch(() => {
        if (currentRequest !== requestId.current) return;
        setError(`Failed to search by ${mode}.`);
      })
      .finally(() => {
        if (currentRequest !== requestId.current) return;
        setLoading(false);
      });
  };

  return {
    results,
    loading,
    error,
    searchByQuery: (query) => run("query", () => searchMeals(query)),
    searchByCategory: (category) => run("category", () => filterByCategory(category)),
    searchByArea: (area) => run("area", () => filterByArea(area)),
    searchByIngredient: (ingredient) => run("ingredient", () => filterByIngredient(ingredient)),
  };
}
