import { Link } from "react-router-dom";
import type { Meal } from "../types/meal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useMealContext } from "../contexts/MealContext"

interface MealCardProps {
    meal: Meal
}

export default function MealCard({meal}: MealCardProps) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMealContext()
    const favorite = isFavorite(meal.idMeal)

     function onFavoriteClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (favorite) removeFromFavorites(meal.idMeal)
        else addToFavorites(meal)
    }

    return (
        <Link className="relative border border-solid border-text-light rounded" to={`/meal/${meal.idMeal}`}>
            {   
                meal.strMealThumb && 
                <img className="h-37.5 w-full object-cover" src={ meal.strMealThumb } alt={meal.strMeal} />
            }

            <div className="p-2 flex flex-col justify-between gap-1">
                <div className="font-bold text-primary">{meal.strMeal}</div>
                <div>
                    <div className="text-sm">{meal.strCategory}</div>
                </div>
            </div>

            <button className="absolute cursor-pointer p-2 right-0 top-0" onClick={onFavoriteClick}>
                {
                    favorite ? 
                    <FontAwesomeIcon className="text-red-600" icon={faHeartSolid} /> : 
                    <FontAwesomeIcon icon={faHeartRegular} />
                }
            </button>
        </Link>
    )
}
