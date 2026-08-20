import MealList from "../components/MealList";
import { useMealContext } from "../contexts/MealContext";

export default function Favourites() {
    const { favorites } = useMealContext();

    return (
        <main className="container py-5">
            <MealList meals={ favorites } />
        </main>
    )
}
