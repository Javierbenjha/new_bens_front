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
    children: React.ReactNode;
}

export const GenericModal = ({
    title,
    description,
    trigger,
    isOpen,
    onOpenChange,
    footer,
    children,
}: GenericModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
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

