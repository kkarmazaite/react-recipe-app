import type { Meal } from "../types/meal";
import MealCard from "./MealCard";

interface MealListProps {
    meals: Meal[],
    loading?: boolean,
    error?: string|null
}

export default function MealList({meals, loading, error}: MealListProps) {
    return (
        loading ? 
            <div>Loading...</div>
        : 
        error ? 
            <div className="text-red-500">{error}</div>
        : 
        meals.length == 0 ? 
            <div>No meals found.</div>
        : 
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {meals.map((meal) => (
                    <MealCard meal={meal} key={meal.idMeal} />
                ))}
            </div>
        
    )
}
