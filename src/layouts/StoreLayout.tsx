import { Outlet, Link } from "react-router-dom";
import logo from "../assets/images/logos/logoHori.png";

export const StoreLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="h-16 bg-white shadow-sm flex items-center px-6">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Bens Store Logo" className="h-16 w-auto object-contain" />
                </Link>
            </header>

            <main className="flex-1 bg-gray-50 p-6">
                <Outlet />
            </main>

            <footer className="h-16 bg-gray-900 text-white flex items-center justify-center">
                <p>&copy; {new Date().getFullYear()} My Store. All rights reserved.</p>
            </footer>
        </div>
    );
};
