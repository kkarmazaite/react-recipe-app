import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Listing from "./pages/Listing"
import Favourites from "./pages/Favourites"

export default function App() {

  return (
   <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/listing">Listing</Link>
        <Link to="/favourites">Favourites</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  )
}
