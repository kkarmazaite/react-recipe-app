import { BrowserRouter, Route, Routes } from "react-router-dom"
import Favourites from "./pages/Favourites"
import Header from "./components/Header"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Meal from "./pages/Meal"
import { MealProvider } from "./contexts/MealContext"

export default function App() {
  return (
    <MealProvider>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meal/:id" element={<Meal />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </MealProvider>
  )
}
