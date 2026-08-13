import { BrowserRouter, Route, Routes } from "react-router-dom"
import Favourites from "./pages/Favourites"
import Header from "./components/Header"
import Home from "./pages/Home"
import Listing from "./pages/Listing"

export default function App() {

  return (
   <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  )
}
