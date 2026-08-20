import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useAreaList, useCategoryList, useIngredientList } from "../hooks/useFilterOptions";
import FilterDropdown from "./FilterDropdown";

interface SearchFiltersProps {
  searchByQuery: (query: string) => void;
  searchByCategory: (category: string) => void;
  searchByArea: (area: string) => void;
  searchByIngredient: (ingredient: string) => void;
}

export default function SearchFilters({
  searchByQuery,
  searchByCategory,
  searchByArea,
  searchByIngredient,
}: SearchFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const area = searchParams.get("area") ?? "";
  const ingredient = searchParams.get("ingredient") ?? "";

  const { categories, loading: categoriesLoading } = useCategoryList();
  const { areas, loading: areasLoading } = useAreaList();
  const { ingredients, loading: ingredientsLoading } = useIngredientList();

  useEffect(() => {
    if (query) searchByQuery(query);
    else if (category) searchByCategory(category);
    else if (area) searchByArea(area);
    else if (ingredient) searchByIngredient(ingredient);
  }, [query, category, area, ingredient]);

  return (
    <div className="flex gap-3 mb-4 items-center flex-wrap">
      <SearchInput
        key={query}
        onSearch={(newQuery) => setSearchParams({ q: newQuery })}
        initialValue={query}
      />
      <FilterDropdown
        label="Category"
        options={categories.map((c) => c.strCategory)}
        value={category}
        onChange={(newCategory) =>
          setSearchParams(newCategory ? { category: newCategory } : {})
        }
        loading={categoriesLoading}
      />
      <FilterDropdown
        label="Area"
        options={areas}
        value={area}
        onChange={(newArea) =>
          setSearchParams(newArea ? { area: newArea } : {})
        }
        loading={areasLoading}
      />
      <FilterDropdown
        label="Ingredient"
        options={ingredients.map((i) => i.strIngredient)}
        value={ingredient}
        onChange={(newIngredient) =>
          setSearchParams(newIngredient ? { ingredient: newIngredient } : {})
        }
        loading={ingredientsLoading}
      />
    </div>
  );
}
