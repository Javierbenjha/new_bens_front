import { useLocation } from "react-router-dom";
import { menuItems } from "./Sidebar";

export const Header = () => {
    const location = useLocation();

    return (
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
            <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find(item => item.path === location.pathname)?.label || "Panel"}
            </h2>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Admin User</span>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    A
                </div>
            </div>
        </header>
    );
};
