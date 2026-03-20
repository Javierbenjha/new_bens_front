import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export interface Column<T> {
    header: string;
    key?: keyof T;
    render?: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (item: T) => void;
}

export const GenericTable = <T extends Record<string, any>>({
    columns,
    data,
    onRowClick,
}: GenericTableProps<T>) => {
    return (
        <div className="rounded-md border bg-white overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead key={index} className="bg-slate-50 font-semibold text-slate-700">
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!Array.isArray(data) || data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-slate-500">
                                {!Array.isArray(data) ? "Error: Los datos no son válidos." : "No hay datos para mostrar."}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                className={onRowClick ? "cursor-pointer hover:bg-slate-50 transition-colors" : ""}
                                onClick={() => onRowClick && onRowClick(row)}
                            >
                                {columns.map((column, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {column.render
                                            ? column.render(row)
                                            : (row[column.key as keyof T] as React.ReactNode)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>

            </Table>
        </div>
    );
};
