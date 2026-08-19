import { useAsync } from "./useAsync";
import { getMeal } from "../services/api";

export function useMeal(id: string | undefined) {
  const { data, loading, error } = useAsync(
    () => (id ? getMeal(id) : Promise.reject()),
    [id],
    "Failed to load meal."
  );
  return { meal: data, loading, error };
}
