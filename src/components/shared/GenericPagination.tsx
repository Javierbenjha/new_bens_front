import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface GenericPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
}

export const GenericPagination: React.FC<GenericPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
}) => {
    const generatePages = () => {
        const totalPageNumbers = siblingCount * 2 + 5;

        if (totalPages <= totalPageNumbers) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, "dots", totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
            return [1, "dots", ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
            return [1, "dots", ...middleRange, "dots", totalPages];
        }
        
        return [];
    };

    const pages = generatePages();

    if (totalPages < 1) return null;

    return (
        <div className="flex items-center justify-center space-x-2 py-4">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 hover:bg-slate-100 border-slate-200 transition-colors"
                title="Página Anterior"
            >
                <ChevronLeft className="h-4 w-4 text-slate-600" />
            </Button>

            <div className="flex items-center space-x-1.5 px-2">
                {pages?.map((page, index) => {
                    if (page === "dots") {
                        return (
                            <div key={`dots-${index}`} className="flex h-8 w-8 items-center justify-center">
                                <MoreHorizontal className="h-4 w-4 text-slate-400" />
                            </div>
                        );
                    }

                    const isSelected = currentPage === page;

                    return (
                        <Button
                            key={page}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(page as number)}
                            className={`h-8 w-8 p-0 text-xs font-semibold transition-all duration-200 ${
                                isSelected 
                                    ? "bg-slate-900 text-white hover:bg-slate-800 shadow-sm transform scale-105" 
                                    : "hover:bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                        >
                            {page}
                        </Button>
                    );
                })}
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 hover:bg-slate-100 border-slate-200 transition-colors"
                title="Siguiente Página"
            >
                <ChevronRight className="h-4 w-4 text-slate-600" />
            </Button>
        </div>
    );
};
