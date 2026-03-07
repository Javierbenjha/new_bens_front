import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, CreditCard, User } from "lucide-react";
import { useCustomers } from "../hooks/useCustomers";
import type { CreateCustomerDto } from "../types/customers.type";
import { sileo } from "sileo";

const customerSchema = z.object({
    documento: z.number().min(1000000, "Documento debe tener al menos 7 dígitos"),
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    correo: z.string().email("Correo electrónico inválido"),
    telefono: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface AddCustomerFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export const AddCustomerForm = ({ onSuccess, onCancel }: AddCustomerFormProps) => {
    const { addCustomer } = useCustomers();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerFormValues>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            documento: 0,
            nombre: "",
            apellido: "",
            correo: "",
            telefono: "",
        }
    });

    const onSubmit = async (data: CustomerFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await addCustomer(data as CreateCustomerDto);
            if (result) {
                sileo.success({ title: "Éxito", description: "Cliente creado exitosamente" });
                onSuccess();
            } else {
                sileo.error({ title: "Error", description: "Error al crear el cliente" });
            }
        } catch (error) {
            sileo.error({ title: "Error", description: "Ocurrió un error inesperado" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form id="add-customer-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="space-y-2">
                <Label htmlFor="documento">Número de Documento / DNI</Label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        id="documento"
                        type="number"
                        placeholder="Ingrese el documento"
                        className="pl-10"
                        {...register("documento", { valueAsNumber: true })}
                    />
                </div>
                {errors.documento && <p className="text-xs text-red-500 font-medium">{errors.documento.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            id="nombre"
                            placeholder="Nombre"
                            className="pl-10"
                            {...register("nombre")}
                        />
                    </div>
                    {errors.nombre && <p className="text-xs text-red-500 font-medium">{errors.nombre.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                        id="apellido"
                        placeholder="Apellido"
                        {...register("apellido")}
                    />
                    {errors.apellido && <p className="text-xs text-red-500 font-medium">{errors.apellido.message}</p>}
                </div>
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
                    {isSubmitting ? "Guardando..." : "Guardar Cliente"}
                </Button>
            </div>
        </form>
    );
};
