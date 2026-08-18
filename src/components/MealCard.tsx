import { Link } from "react-router-dom";
import type { Meal } from "../types/meal";

interface MealCardProps {
    meal: Meal
}

export default function MealCard({meal}: MealCardProps) {
    return (
        <Link className="border border-solid border-text-light rounded" to={`/meal/${meal.idMeal}`}>
            {   
                meal.strMealThumb && 
                <img className="h-37.5 w-full object-cover" src={ meal.strMealThumb } alt="React logo" />
            }

            <div className="p-2 flex flex-col justify-between gap-1">
                <div className="font-bold text-primary">{meal.strMeal}</div>
                <div>
                    <div className="text-sm">{meal.strCategory}</div>
                </div>
            </div>
        </Link>
    )
}
