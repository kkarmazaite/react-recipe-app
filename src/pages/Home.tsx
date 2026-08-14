import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import { getRandomMeals } from "../services/api";
import type { Meal } from "../types/meal";
import MealList from "../components/MealList";

export default function Home() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRandomMeals = async () => {
            try {
                const randomMeals = await getRandomMeals(4);

                setMeals(randomMeals);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies.");
            }finally {
                setLoading(false);
            }
        }

        loadRandomMeals();
    }, [])

    return (
        <>
            <HeroBanner />
            <main className="container py-5">
                <div className="text-text-white mb-4">Popular recipes</div>

                <MealList meals={meals} loading={loading} error={error} />
            </main>
        </>
    )
}
