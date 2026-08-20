import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Meal } from "../types/meal";

interface MealContextType {
    favorites: Meal[];
    addToFavorites: (meal: Meal) => void;
    removeFromFavorites: (mealId: string) => void;
    isFavorite: (mealId: string) => boolean;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export const useMealContext = () => {
    const context = useContext(MealContext);
    if (!context) {
        throw new Error("useMealContext must be used within a MealProvider");
    }
    return context;
};

interface MealProviderProps {
    children: ReactNode;
}

export const MealProvider = ({ children }: MealProviderProps) => {
    const [favorites, setFavorites] = useState<Meal[]>([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");

        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])

    const addToFavorites = (meal: Meal) => {
        setFavorites(prev => [...prev, meal])
    }

    const removeFromFavorites = (mealId: string) => {
        setFavorites(prev => prev.filter(meal => meal.idMeal !== mealId))
    }
    
    const isFavorite = (mealId: string) => {
        return favorites.some(meal => meal.idMeal === mealId)
    }

    const value: MealContextType = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MealContext.Provider value={value}>{children}</MealContext.Provider>
}
