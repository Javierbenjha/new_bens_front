import { Outlet } from "react-router-dom";

export const StoreLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="h-16 bg-white shadow-sm flex items-center px-6">
                <h1 className="text-xl font-bold text-gray-800">My E-commerce Store</h1>
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
