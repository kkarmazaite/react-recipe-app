import SearchFilters from "../components/SearchFilters";
import MealList from "../components/MealList";
import { useMealSearch } from "../hooks/useMealSearch";

export default function Search() {
  const { results, loading, error, searchByQuery, searchByCategory, searchByArea, searchByIngredient } =
    useMealSearch();

  return (
    <main className="container py-5">
      <SearchFilters
        searchByQuery={searchByQuery}
        searchByCategory={searchByCategory}
        searchByArea={searchByArea}
        searchByIngredient={searchByIngredient}
      />
      <MealList meals={results} loading={loading} error={error} />
    </main>
  );
}
