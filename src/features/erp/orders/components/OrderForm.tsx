import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2, ShoppingCart, User, FileText, CreditCard, Package } from "lucide-react";
import { EstadoPedido, type CreateOrderDto, type OrderDetail, type MedioPago, type TipoDocumento } from "../types/orders.type";
import type { Customer } from "@/features/erp/customers/types/customers.type";
import type { Item } from "@/features/erp/items/types/items.type";
import { getCustomers } from "@/features/erp/customers/services/customers.service";
import { getItems } from "@/features/erp/items/services/items.service";
import { getMediosPago, getTiposDocumento } from "../services/orders.service";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderDetailForm {
    productoId: number;
    productoNombre: string;
    cantidad: number;
    precioUnitario: number;
    descuentoLinea: number;
}

interface OrderFormValues {
    clienteId: number;
    medioPagoId: number;
    tipoDocumentoId: number;
    direccionEnvio: string;
    fechaEntrega: string;
    observaciones: string;
}

interface OrderFormProps {
    onSuccess: (dto: CreateOrderDto) => Promise<void>;
    onCancel: () => void;
}

const IGV_RATE = 0.18;

const fmt = (n: number) => `S/ ${n.toFixed(2)}`;

// ─── Section Title ────────────────────────────────────────────────────────────
const SectionTitle = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
    <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-indigo-600" />
        </div>
        <h3 className="text-sm font-semibold text-slate-700">{label}</h3>
        <div className="flex-1 h-px bg-slate-100" />
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const OrderForm = ({ onSuccess, onCancel }: OrderFormProps) => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [mediosPago, setMediosPago] = useState<MedioPago[]>([]);
    const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [detalles, setDetalles] = useState<OrderDetailForm[]>([]);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<OrderFormValues>({
        defaultValues: {
            direccionEnvio: "",
            fechaEntrega: "",
            observaciones: "",
        },
    });

    useEffect(() => {
        const load = async () => {
            try {
                const [c, i, m, t] = await Promise.all([
                    getCustomers(), 
                    getItems(),
                    getMediosPago(),
                    getTiposDocumento()
                ]);
                setCustomers(c);
                setItems(i);
                setMediosPago(m);
                setTiposDocumento(t);
                
                // Set initial values for dynamic selects if data exists
                if (m.length > 0) setValue("medioPagoId", m[0].id);
                if (t.length > 0) setValue("tipoDocumentoId", t[0].id);
                
            } catch (e) {
                console.error("Error loading data:", e);
            } finally {
                setLoadingData(false);
            }
        };
        load();
    }, [setValue]);

    // ── Line management ──────────────────────────────────────────────────────
    const addLine = () => {
        if (items.length === 0) return;
        const first = items[0];
        setDetalles(prev => [...prev, {
            productoId: first.id,
            productoNombre: first.nombre,
            cantidad: 1,
            precioUnitario: first.precio,
            descuentoLinea: 0,
        }]);
    };

    const removeLine = (idx: number) =>
        setDetalles(prev => prev.filter((_, i) => i !== idx));

    const updateLine = (idx: number, field: keyof OrderDetailForm, value: string | number) => {
        setDetalles(prev => prev.map((d, i) => {
            if (i !== idx) return d;
            if (field === "productoId") {
                const item = items.find(it => it.id === Number(value));
                return {
                    ...d,
                    productoId: Number(value),
                    productoNombre: item?.nombre ?? "",
                    precioUnitario: item?.precio ?? 0,
                };
            }
            return { ...d, [field]: Number(value) };
        }));
    };

    // ── Calculations ─────────────────────────────────────────────────────────
    const calcLine = useCallback((d: OrderDetailForm) => {
        const base = d.cantidad * d.precioUnitario;
        const desc = base * (d.descuentoLinea / 100);
        const neto = base - desc;
        const igv = neto * IGV_RATE;
        return { base, desc, neto, igv, total: neto + igv };
    }, []);

    const totals = detalles.reduce(
        (acc, d) => {
            const c = calcLine(d);
            return {
                subtotal: acc.subtotal + c.neto,
                impuesto: acc.impuesto + c.igv,
                descuento: acc.descuento + c.desc,
                total: acc.total + c.total,
            };
        },
        { subtotal: 0, impuesto: 0, descuento: 0, total: 0 }
    );

    // ── Submit ────────────────────────────────────────────────────────────────
    const onSubmit = async (values: OrderFormValues) => {
        if (detalles.length === 0) return;
        setIsSubmitting(true);
        try {
            const dto: CreateOrderDto = {
                clienteId: Number(values.clienteId),
                medioPagoId: Number(values.medioPagoId),
                tipoDocumentoId: Number(values.tipoDocumentoId),
                direccionEnvio: values.direccionEnvio || undefined,
                fechaEntrega: values.fechaEntrega || undefined,
                observaciones: values.observaciones || undefined,
                subtotal: totals.subtotal,
                impuesto: totals.impuesto,
                descuento: totals.descuento,
                descuentoCupon: 0,
                total: totals.total,
                estado: EstadoPedido.PENDIENTE,
                detalles: detalles.map((d): Omit<OrderDetail, 'id' | 'pedidoId' | 'productoNombre'> => {
                    const c = calcLine(d);
                    return {
                        productoId: d.productoId,
                        cantidad: d.cantidad,
                        precioUnitario: d.precioUnitario,
                        descuento: c.desc,
                        subtotal: c.neto,
                    };
                }),
            };
            await onSuccess(dto);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Loading state ─────────────────────────────────────────────────────────
    if (loadingData) {
        return (
            <div className="py-16 flex flex-col items-center gap-3 text-slate-400">
                <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Cargando datos...</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* ── CLIENTE ─────────────────────────────────────────────────── */}
            <div>
                <SectionTitle icon={User} label="Datos del Cliente" />
                <Label htmlFor="clienteId" className="text-xs text-slate-600 mb-1.5 block">
                    Cliente <span className="text-rose-500">*</span>
                </Label>
                <select
                    id="clienteId"
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register("clienteId", { required: true, valueAsNumber: true })}
                >
                    <option value="">— Seleccionar cliente —</option>
                    {customers.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.nombre} {c.apellido} — Doc: {c.documento}
                        </option>
                    ))}
                </select>
                {errors.clienteId && (
                    <p className="text-xs text-rose-500 mt-1">Selecciona un cliente</p>
                )}
            </div>

            {/* ── PAGO Y COMPROBANTE ───────────────────────────────────────── */}
            <div>
                <SectionTitle icon={CreditCard} label="Pago y Comprobante" />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="medioPagoId" className="text-xs text-slate-600 mb-1.5 block">
                            Método de Pago
                        </Label>
                        <Select
                            onValueChange={v => setValue("medioPagoId", Number(v))}
                            defaultValue={mediosPago[0]?.id.toString()}
                        >
                            <SelectTrigger id="medioPagoId" className="h-9 text-sm">
                                <SelectValue placeholder="Seleccionar pago" />
                            </SelectTrigger>
                            <SelectContent>
                                {mediosPago.map(m => (
                                    <SelectItem key={m.id} value={m.id.toString()}>{m.nombre}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="tipoDocumentoId" className="text-xs text-slate-600 mb-1.5 block">
                            Tipo de Comprobante
                        </Label>
                        <Select
                            onValueChange={v => setValue("tipoDocumentoId", Number(v))}
                            defaultValue={tiposDocumento[0]?.id.toString()}
                        >
                            <SelectTrigger id="tipoDocumentoId" className="h-9 text-sm">
                                <SelectValue placeholder="Seleccionar documento" />
                            </SelectTrigger>
                            <SelectContent>
                                {tiposDocumento.map(t => (
                                    <SelectItem key={t.id} value={t.id.toString()}>{t.nombre} ({t.abreviatura})</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* ── ENTREGA ──────────────────────────────────────────────────── */}
            <div>
                <SectionTitle icon={Package} label="Entrega" />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="fechaEntrega" className="text-xs text-slate-600 mb-1.5 block">
                            Fecha de Entrega
                        </Label>
                        <Input
                            id="fechaEntrega"
                            type="date"
                            className="h-9 text-sm"
                            min={new Date().toISOString().split("T")[0]}
                            {...register("fechaEntrega")}
                        />
                    </div>
                    <div>
                        <Label htmlFor="direccionEnvio" className="text-xs text-slate-600 mb-1.5 block">
                            Dirección de Envío
                        </Label>
                        <Input
                            id="direccionEnvio"
                            placeholder="Av. Principal 123..."
                            className="h-9 text-sm"
                            {...register("direccionEnvio")}
                        />
                    </div>
                </div>
            </div>

            {/* ── PRODUCTOS ────────────────────────────────────────────────── */}
            <div>
                <SectionTitle icon={ShoppingCart} label="Productos del Pedido" />

                {detalles.length > 0 && (
                    <div className="grid grid-cols-[2fr_68px_96px_74px_76px_32px] gap-2 mb-2 px-1">
                        {["Producto", "Cant.", "P. Unit.", "Desc%", "Subtotal", ""].map((h, i) => (
                            <span key={i} className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{h}</span>
                        ))}
                    </div>
                )}

                <div className="space-y-2">
                    {detalles.map((d, idx) => {
                        const c = calcLine(d);
                        return (
                            <div
                                key={idx}
                                className="grid grid-cols-[2fr_68px_96px_74px_76px_32px] gap-2 items-center bg-slate-50 rounded-lg px-2 py-2 border border-slate-100 hover:border-indigo-100 transition-colors"
                            >
                                {/* Producto */}
                                <select
                                    className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 truncate"
                                    value={d.productoId}
                                    onChange={e => updateLine(idx, "productoId", e.target.value)}
                                >
                                    {items.map(it => (
                                        <option key={it.id} value={it.id}>{it.nombre}</option>
                                    ))}
                                </select>

                                {/* Cantidad */}
                                <input
                                    type="number"
                                    min={1}
                                    value={d.cantidad}
                                    onChange={e => updateLine(idx, "cantidad", e.target.value)}
                                    className="h-8 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                {/* Precio unitario */}
                                <input
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    value={d.precioUnitario}
                                    onChange={e => updateLine(idx, "precioUnitario", e.target.value)}
                                    className="h-8 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                {/* Descuento % */}
                                <div className="relative">
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={d.descuentoLinea}
                                        onChange={e => updateLine(idx, "descuentoLinea", e.target.value)}
                                        className="h-8 w-full rounded-md border border-slate-200 bg-white pl-2 pr-5 text-xs text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">%</span>
                                </div>

                                {/* Subtotal línea */}
                                <span className="text-xs font-semibold text-indigo-700 text-right tabular-nums pr-1">
                                    {fmt(c.neto)}
                                </span>

                                {/* Eliminar */}
                                <button
                                    type="button"
                                    onClick={() => removeLine(idx)}
                                    className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={addLine}
                    disabled={items.length === 0}
                    className="mt-3 flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    <PlusCircle className="w-4 h-4" />
                    Agregar producto
                </button>

                {detalles.length === 0 && (
                    <div className="mt-2 p-4 border-2 border-dashed border-slate-200 rounded-lg text-center">
                        <p className="text-xs text-slate-400">
                            No hay productos en el pedido. Usa el botón de arriba para agregar.
                        </p>
                    </div>
                )}
            </div>

            {/* ── TOTALES ──────────────────────────────────────────────────── */}
            {detalles.length > 0 && (
                <div className="bg-linear-to-br from-indigo-50 to-slate-50 rounded-xl p-4 border border-indigo-100">
                    <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between text-slate-600">
                            <span>Subtotal (sin IGV)</span>
                            <span className="tabular-nums font-medium">{fmt(totals.subtotal)}</span>
                        </div>
                        {totals.descuento > 0 && (
                            <div className="flex justify-between text-emerald-600">
                                <span>Descuento</span>
                                <span className="tabular-nums">− {fmt(totals.descuento)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-slate-600">
                            <span>IGV (18%)</span>
                            <span className="tabular-nums">{fmt(totals.impuesto)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base text-slate-900 pt-2 border-t border-indigo-100 mt-1">
                            <span>Total</span>
                            <span className="text-indigo-700 tabular-nums">{fmt(totals.total)}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* ── OBSERVACIONES ────────────────────────────────────────────── */}
            <div>
                <SectionTitle icon={FileText} label="Observaciones" />
                <Textarea
                    id="observaciones"
                    placeholder="Notas adicionales sobre el pedido..."
                    className="text-sm resize-none"
                    rows={2}
                    {...register("observaciones")}
                />
            </div>

            {/* ── ACCIONES ─────────────────────────────────────────────────── */}
            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="h-9 px-5 text-sm"
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting || detalles.length === 0}
                    className="h-9 px-6 text-sm bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200"
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Guardando…
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4" />
                            Crear Pedido
                        </span>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default OrderForm;
