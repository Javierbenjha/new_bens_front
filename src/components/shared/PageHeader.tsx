import React from "react";

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode; // Para botones, modales, etc. que van a la derecha
}

export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
                <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
};
