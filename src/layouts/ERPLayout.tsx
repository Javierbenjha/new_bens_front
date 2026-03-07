import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";

export const ERPLayout = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <Header />
                
                {/* Page Content */}
                <main className="flex-1 p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
