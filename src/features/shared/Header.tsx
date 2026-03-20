import { useLocation } from "react-router-dom";
import { Menu, User, Bell } from "lucide-react";
import { menuItems } from "./Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";
import { Button } from "@/components/ui/button";

export const Header = () => {
    const location = useLocation();
    const { toggleSidebar } = useSidebar();

    const currentRoute = menuItems.find(
        (item) =>
            location.pathname === item.path ||
            (location.pathname.startsWith(item.path) && item.path !== "/admin")
    );

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </Button>
                <h2 className="text-lg font-bold text-slate-800">
                    {currentRoute?.label || "Panel de Control"}
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                    <Bell className="w-5 h-5" />
                </Button>
                <div className="h-8 w-px bg-slate-200 mx-2"></div>
                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-800 leading-none">Admin User</p>
                        <p className="text-xs text-slate-500 mt-1">Administrador</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border-2 border-indigo-100 shadow-sm">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </header>
    );
};

