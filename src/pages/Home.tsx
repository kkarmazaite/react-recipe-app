import HeroBanner from "../components/HeroBanner";
import MealList from "../components/MealList";
import { useRandomMeals } from "../hooks/useRandomMeals";

export default function Home() {
    const { meals, loading, error } = useRandomMeals(4);

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
