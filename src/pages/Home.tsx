import { useNavigate } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import MealList from "../components/MealList";
import { useRandomMeals } from "../hooks/useRandomMeals";

export default function Home() {
    const { meals, loading, error } = useRandomMeals(4);

    const navigate = useNavigate();
    const handleSearch = (query: string) => {
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <>
            <HeroBanner handleSearch={handleSearch} />

            <main className="container py-5">
                <div className="text-text-white mb-4">Popular recipes</div>

                <MealList meals={meals} loading={loading} error={error} />
            </main>
        </>
    )
}
