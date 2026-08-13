import { Link } from "react-router-dom"
import logo from '../assets/logo.svg'

export default function Header() {
    return (
        <header className="flex justify-between items-center py-4 border-b border-solid border-text-light">
            <div className="container flex justify-between items-center">
                <Link to="/"><img className="h-10" src={logo} alt="React logo" /></Link>
                
                <nav className="flex gap-6">
                    <Link className="header-link" to="/">Home</Link>
                    <Link className="header-link" to="/listing">Listing</Link>
                    <Link className="header-link" to="/favourites">Favourites</Link>
                </nav>
            </div>
        </header>
    )
}
