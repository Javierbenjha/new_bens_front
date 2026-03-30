import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, CreditCard, Building2 } from "lucide-react";
import { useSuppliers } from "../hooks/useSuppliers";
import type { CreateSupplierDto } from "../types/suppliers.type";
import { sileo } from "sileo";

const supplierSchema = z.object({
    documento: z.string().min(8, "El número de documento debe tener al menos 8 caracteres"),
    descripcion: z.string().min(2, "La descripción debe tener al menos 2 caracteres"),
    correo: z.string().email("Correo electrónico inválido"),
    telefono: z.string().optional(),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

interface AddSupplierFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export const AddSupplierForm = ({ onSuccess, onCancel }: AddSupplierFormProps) => {
    const { addSupplier } = useSuppliers();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SupplierFormValues>({
        resolver: zodResolver(supplierSchema),
        defaultValues: {
            documento: "",
            descripcion: "",
            correo: "",
            telefono: "",
        }
    });

    const onSubmit = async (data: SupplierFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await addSupplier(data as CreateSupplierDto);
            if (result) {
                sileo.success({ title: "Éxito", description: "Proveedor creado exitosamente" });
                onSuccess();
            } else {
                sileo.error({ title: "Error", description: "Error al crear el proveedor" });
            }
        } catch (error) {
            sileo.error({ title: "Error", description: "Ocurrió un error inesperado" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form id="add-supplier-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="space-y-2">
                <Label htmlFor="documento">Número de RUC / Documento</Label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        id="documento"
                        type="text"
                        placeholder="Ingrese el RUC o documento"
                        className="pl-10"
                        {...register("documento")}
                    />
                </div>
                {errors.documento && <p className="text-xs text-red-500 font-medium">{errors.documento.message}</p>}
            </div>


            <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción / Razón Social</Label>
                <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        id="descripcion"
                        placeholder="Nombre de la empresa"
                        className="pl-10"
                        {...register("descripcion")}
                    />
                </div>
                {errors.descripcion && <p className="text-xs text-red-500 font-medium">{errors.descripcion.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="correo">Correo Electrónico</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        id="correo"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        className="pl-10"
                        {...register("correo")}
                    />
                </div>
                {errors.correo && <p className="text-xs text-red-500 font-medium">{errors.correo.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono (Opcional)</Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        id="telefono"
                        placeholder="999 999 999"
                        className="pl-10"
                        {...register("telefono")}
                    />
                </div>
                {errors.telefono && <p className="text-xs text-red-500 font-medium">{errors.telefono.message}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Guardar Proveedor"}
                </Button>
            </div>
        </form>
    );
};
