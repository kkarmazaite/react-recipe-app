import { useMemo } from "react";
import { useParams } from "react-router-dom"
import type { Meal } from "../types/meal";
import { useMeal } from "../hooks/useMeal";

export default function Meal() {
    const { id } = useParams();

    const { meal, loading, error } = useMeal(id);

    const mealIngredients = useMemo(() => {
        if (!meal) return [];

        const list: string[] = [];

        for (let i = 1; i <= 20; i++) {
            const measure = meal[`strMeasure${i}` as keyof Meal] as string;
            const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
            if (measure && ingredient) list.push(`${measure} ${ingredient}`);
        }

        return list;
    }, [meal]);

    return (
        <main className="container py-5">
            { loading ? 
                <div>Loading...</div>
            : 
            error ? 
                <div className="text-red-500">{error}</div>
            : 
            !meal ? 
                <div>Meal not found.</div>
            :
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                    <div>
                        <h2 className="text-primary mb-5">{ meal.strMeal }</h2>

                        <img
                            className="h-75 w-full object-cover mb-3"
                            src={ `${meal.strMealThumb}/large` } 
                            alt={meal.strMeal}
                            loading="lazy"
                            height={448}
                        />

                        <div className="flex gap-3 mb-3">
                            <div className="bg-text-light text-text-dark px-2 rounded opacity-70">{ meal.strCategory }</div>
                            <div className="bg-text-light text-text-dark px-2 rounded opacity-70">{ meal.strCountry }</div>
                            {meal.strSource && <a className="bg-primary hover:brightness-130 text-text-white px-2 rounded" href={ meal.strSource } target="_blank">Source</a>}
                            {meal.strYoutube && <a className="bg-primary hover:brightness-130 text-text-white px-2 rounded" href={ meal.strYoutube } target="_blank">Youtube</a>}
                        </div>

                        <h4 className="mb-2">Ingredients</h4>
                        <ul className="list-disc list-inside">
                            {mealIngredients.map((mealIngredient, idx) => (
                                <li key={idx}>{ mealIngredient }</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-2">Instructions</h4>
                        <p>{ meal.strInstructions }</p>
                    </div>
                </div>
            }
        </main>
    )
}
