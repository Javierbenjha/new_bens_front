import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface GenericModalProps {
    title: string;
    description?: string;
    trigger?: React.ReactNode;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    footer?: React.ReactNode; // Botones de acción opcionales al pie del modal
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children: React.ReactNode;
}

const sizeClass = {
    sm: 'sm:max-w-[400px]',
    md: 'sm:max-w-[560px]',
    lg: 'sm:max-w-[720px]',
    xl: 'sm:max-w-[900px]',
};

export const GenericModal = ({
    title,
    description,
    trigger,
    isOpen,
    onOpenChange,
    footer,
    size = 'sm',
    children,
}: GenericModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className={`${sizeClass[size]} max-h-[90vh] overflow-y-auto`}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="py-4">{children}</div>
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
};

