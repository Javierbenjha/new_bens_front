import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/shared/PageHeader";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { GenericModal } from "@/components/shared/GenericModal";
import { HexColorPicker } from "react-colorful";
import { X, Plus, Image as ImageIcon, Upload, Trash2, RefreshCw } from "lucide-react";
import { sileo } from "sileo";

import { useCategories } from "../hooks/useCategories";
import { useBrands } from "../hooks/useBrands";
import { useProducts } from "../hooks/useProducts";
import { useSizes } from "../hooks/useSizes";

type ModalType = "categoria" | "marca" | "talla" | null;

export const ProductsDashboard = () => {
    // ── Categorías y Marcas ───────────────────────────────────
    const { categories, isLoadingCategories, addCategoryToAPI } = useCategories();
    const { brands, isLoadingBrands, addBrandToAPI } = useBrands();
    const { sizes, isLoadingSizes, addSizeToAPI } = useSizes();
    const { isSavingProduct, addProductToAPI } = useProducts();

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    // ── Campos del formulario ─────────────────────────────────
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [sku, setSku] = useState("");
    const [hasDiscount, setHasDiscount] = useState(false);
    const [discountValue, setDiscountValue] = useState("");

    const generateSku = () => {
        const randomNum = Math.floor(10000000 + Math.random() * 90000000);
        setSku(randomNum.toString());
    };

    // ── Modal "Añadir nueva" ──────────────────────────────────
    const [modalType, setModalType] = useState<ModalType>(null);
    const [newItemName, setNewItemName] = useState("");
    const [isSavingNewItem, setIsSavingNewItem] = useState(false);

    const openModal = (type: ModalType) => {
        setNewItemName("");
        setModalType(type);
    };

    const handleAddNew = async () => {
        if (!newItemName.trim()) return;
        setIsSavingNewItem(true);

        const label = newItemName.trim();

        if (modalType === "categoria") {
            const newCategory = await addCategoryToAPI(label);
            if (newCategory) {
                setSelectedCategory(newCategory.value);
                setModalType(null);
                sileo.success({ title: 'Éxito', description: 'Categoría guardada correctamente.' });
            } else {
                sileo.error({ title: 'Error', description: 'Hubo un error al guardar la categoría.' });
            }
        } else if (modalType === "marca") {
            const newBrand = await addBrandToAPI(label);
            if (newBrand) {
                setSelectedBrand(newBrand.value);
                setModalType(null);
                sileo.success({ title: 'Éxito', description: 'Marca guardada correctamente.' });
            } else {
                sileo.error({ title: 'Error', description: 'Hubo un error al guardar la marca.' });
            }
        } else if (modalType === "talla") {
            const newSize = await addSizeToAPI(label);
            if (newSize) {
                if (!selectedTallas.includes(newSize.label)) {
                    setSelectedTallas([...selectedTallas, newSize.label]);
                }
                setModalType(null);
                sileo.success({ title: 'Éxito', description: 'Talla guardada correctamente.' });
            } else {
                sileo.error({ title: 'Error', description: 'Hubo un error al guardar la talla.' });
            }
        }

        setIsSavingNewItem(false);
    };

    // ── Colores ───────────────────────────────────────────────
    const [currentColor, setCurrentColor] = useState("#6366f1");
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const addColor = () => {
        if (!selectedColors.includes(currentColor))
            setSelectedColors([...selectedColors, currentColor]);
    };
    const removeColor = (c: string) => setSelectedColors(selectedColors.filter((x) => x !== c));

    // ── Imágenes ──────────────────────────────────────────────
    const [imagenes, setImagenes] = useState<(string | null)[]>([null, null, null, null]);

    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImagenes = [...imagenes];
                newImagenes[index] = reader.result as string;
                setImagenes(newImagenes);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (index: number) => {
        const newImagenes = [...imagenes];
        newImagenes[index] = null;
        setImagenes(newImagenes);
    };


    // ── Tallas ────────────────────────────────────────────────
    const [selectedTallas, setSelectedTallas] = useState<string[]>([]);

    const removeTalla = (t: string) => setSelectedTallas(selectedTallas.filter((x) => x !== t));

    // ── Handler para los Selects ──────────────────────────────
    const handleSelectChange = (value: string, type: "categoria" | "marca" | "talla") => {
        if (value === "nueva") {
            openModal(type);
            return;
        }
        if (type === "categoria") setSelectedCategory(value);
        else if (type === "marca") setSelectedBrand(value);
        else if (type === "talla") {
            if (!selectedTallas.includes(value)) {
                setSelectedTallas([...selectedTallas, value]);
            }
        }
    };

    // ── Submit del producto ───────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre.trim() || !precio || !cantidad || !selectedCategory || !selectedBrand) {
            sileo.warning({ title: 'Completar datos', description: 'Por favor completa todos los campos obligatorios.' });
            return;
        }

        const newProduct = await addProductToAPI({
            nombre: nombre.trim(),
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad, 10),
            categoriaId: parseInt(selectedCategory, 10),
            marcaId: parseInt(selectedBrand, 10),
            color: selectedColors,
            tallas: selectedTallas,
            imagenes: imagenes.filter(img => img !== null) as string[],
            sku: sku.trim(),
            hasDiscount,
            discountValue: hasDiscount ? parseFloat(discountValue) || 0 : 0,
        });

        if (newProduct) {
            sileo.success({ title: 'Éxito', description: `Producto "${newProduct.nombre}" guardado exitosamente.` });
            setNombre("");
            setPrecio("");
            setCantidad("");
            setSelectedCategory("");
            setSelectedBrand("");
            setSelectedColors([]);
            setSelectedTallas([]);
            setImagenes([null, null, null, null]);
            setSku("");
            setHasDiscount(false);
            setDiscountValue("");
        } else {
            sileo.error({ title: 'Error', description: 'Hubo un error al guardar el producto. Revisa la consola.' });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="px-6 pt-1 pb-0 shrink-0">
                <PageHeader 
                    title="Nuevo Producto" 
                    description="Crea y organiza el catálogo de tu tienda."
                />
            </div>

            {/* ── Modal añadir categoría / marca / talla ── */}
            <GenericModal
                isOpen={modalType !== null}
                onOpenChange={(open) => !open && setModalType(null)}
                title={modalType === "categoria" ? "Nueva Categoría" : modalType === "marca" ? "Nueva Marca" : "Nueva Talla"}
                description={
                    modalType === "categoria"
                        ? "Escribe el nombre de la nueva categoría. Se añadirá al listado de opciones."
                        : modalType === "marca"
                            ? "Escribe el nombre de la nueva marca. Se añadirá al listado de opciones."
                            : "Escribe el nombre o número de la nueva talla (ej. XXL, 42). Se añadirá al listado."
                }
                footer={
                    <>
                        <Button variant="outline" onClick={() => setModalType(null)} disabled={isSavingNewItem}>Cancelar</Button>
                        <Button onClick={handleAddNew} disabled={!newItemName.trim() || isSavingNewItem}>
                            {isSavingNewItem ? "Guardando..." : "Añadir"}
                        </Button>
                    </>
                }
            >
                <div className="space-y-2">
                    <Label htmlFor="new-item">
                        {modalType === "categoria" ? "Nombre de la categoría" : modalType === "marca" ? "Nombre de la marca" : "Nombre de la talla"}
                    </Label>
                    <Input
                        id="new-item"
                        placeholder={modalType === "categoria" ? "Ej. Ropa Interior" : modalType === "marca" ? "Ej. Puma" : "Ej. XL"}
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddNew()}
                        autoFocus
                    />
                </div>
            </GenericModal>

            <form className="flex-1 flex flex-col min-h-0" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1 min-h-0">

                    {/* ── Columna izquierda: Información ────────── */}
                    <Card className="flex flex-col min-h-0">
                        <CardHeader className="shrink-0">
                            <CardTitle>Información del Producto</CardTitle>
                            <CardDescription>Campos principales del artículo.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre del Producto</Label>
                                    <Input
                                        id="name"
                                        placeholder="Ej. Terno de Lino Fino"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU (Código del Producto)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="sku"
                                            placeholder="Ej. 10361229"
                                            value={sku}
                                            onChange={(e) => setSku(e.target.value)}
                                        />
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            size="icon" 
                                            onClick={generateSku}
                                            title="Generar SKU automático"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4">
                                <div className="space-y-2">
                                    <Label>Categoría</Label>
                                    <Select value={selectedCategory} onValueChange={(v) => handleSelectChange(v, "categoria")} disabled={isLoadingCategories}>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder={isLoadingCategories ? "Cargando categorías..." : "Selecciona una..."} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                            ))}
                                            <SelectItem value="nueva" className="text-primary font-semibold border-t mt-1">
                                                + Añadir nueva...
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Marca</Label>
                                    <Select value={selectedBrand} onValueChange={(v) => handleSelectChange(v, "marca")} disabled={isLoadingBrands}>
                                        <SelectTrigger id="brand">
                                            <SelectValue placeholder={isLoadingBrands ? "Cargando marcas..." : "Selecciona una..."} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.map((b) => (
                                                <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                                            ))}
                                            <SelectItem value="nueva" className="text-primary font-semibold border-t mt-1">
                                                + Añadir nueva...
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Cantidad Inicial</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min="0"
                                        step="1"
                                        placeholder="Ej. 100"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Precio Base (Referencial)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="Ej. 99.99"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                        className="h-10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>¿Aplicar Descuento?</Label>
                                    <div className="flex items-center gap-3 h-10">
                                        <button
                                            type="button"
                                            onClick={() => setHasDiscount(!hasDiscount)}
                                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${hasDiscount ? "bg-primary" : "bg-slate-200"}`}
                                        >
                                            <span
                                                className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${hasDiscount ? "translate-x-6" : "translate-x-1"}`}
                                            />
                                        </button>
                                        
                                        <span className="text-sm text-slate-600 font-medium min-w-[70px]">
                                            {hasDiscount ? "Valor:" : "Inactivo"}
                                        </span>
                                        
                                        {hasDiscount && (
                                            <div className="flex-1 max-w-[120px] relative animate-in fade-in slide-in-from-left-2">
                                                <Input
                                                    id="discount"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    placeholder="%"
                                                    value={discountValue}
                                                    onChange={(e) => setDiscountValue(e.target.value)}
                                                    className="h-10 pr-7 text-sm"
                                                />
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">%</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción Detallada</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Detalla los materiales, estilo, corte y características de la prenda..."
                                    className="resize-none h-28 overflow-y-auto"
                                />
                            </div>

                            <div className="pt-6 border-t mt-2">
                                {/* Tallas */}
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold">Tallas Disponibles</Label>
                                    <p className="text-sm text-slate-500 mb-3 block">Tallas en las que se ofrece este producto.</p>
                                    {isLoadingSizes ? (
                                        <div className="flex items-center justify-center p-4">
                                            <p className="text-sm text-slate-500">Cargando tallas...</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {sizes.map((s) => {
                                                const isSelected = selectedTallas.includes(s.label);
                                                return (
                                                    <button
                                                        key={s.value}
                                                        type="button"
                                                        onClick={() => {
                                                            if (isSelected) {
                                                                removeTalla(s.label);
                                                            } else {
                                                                handleSelectChange(s.label, "talla");
                                                            }
                                                        }}
                                                        className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${isSelected
                                                            ? "bg-slate-900 text-white border-slate-900 shadow-md transform scale-105"
                                                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                                                            }`}
                                                    >
                                                        {s.label}
                                                    </button>
                                                );
                                            })}
                                            <button
                                                type="button"
                                                onClick={() => openModal("talla")}
                                                className="px-4 py-2 rounded-full border border-dashed border-slate-300 text-sm font-semibold text-slate-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center bg-slate-50"
                                            >
                                                <Plus className="w-4 h-4 mr-1" /> Nueva
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── Columna derecha: Colores ────── */}
                    <div className="flex flex-col gap-6 min-h-0">
                        {/* Paleta de Colores */}
                        <Card className="shrink-0">
                            <CardHeader className="shrink-0 pb-3">
                                <CardTitle>Paleta de Colores</CardTitle>
                                <CardDescription>Colores disponibles de la prenda.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center gap-2 shrink-0">
                                        <HexColorPicker color={currentColor} onChange={setCurrentColor} style={{ width: "140px", height: "120px" }} />
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded border border-slate-200 shadow-sm" style={{ backgroundColor: currentColor }} />
                                            <span className="text-xs font-mono text-slate-600">{currentColor.toUpperCase()}</span>
                                        </div>
                                        <Button type="button" size="sm" className="w-full" onClick={addColor}>
                                            <Plus className="w-3 h-3 mr-1" /> Añadir
                                        </Button>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-slate-500 mb-2">Seleccionados ({selectedColors.length})</p>
                                        {selectedColors.length === 0 ? (
                                            <div className="flex items-center justify-center h-16 rounded-md border-2 border-dashed border-slate-200"><p className="text-xs text-slate-400">Sin colores</p></div>
                                        ) : (
                                            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                                                {selectedColors.map((color) => (
                                                    <div key={color} className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5">
                                                        <div className="w-3.5 h-3.5 rounded-sm border border-slate-200 shrink-0" style={{ backgroundColor: color }} />
                                                        <span className="text-xs font-mono">{color.toUpperCase()}</span>
                                                        <button type="button" onClick={() => removeColor(color)} className="text-slate-400 hover:text-red-500 transition-colors"><X className="w-2.5 h-2.5" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Imágenes del Producto */}
                        <Card className="flex-1 min-h-0">
                            <CardHeader className="shrink-0 pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-primary" />
                                    Imágenes del Producto
                                </CardTitle>
                                <CardDescription>Sube hasta 4 imágenes para mostrar el producto.</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-6">
                                <div className="grid grid-cols-4 gap-3">
                                    {[0, 1, 2, 3].map((index) => (
                                        <div key={index} className="relative group aspect-square">
                                            {imagenes[index] ? (
                                                <div className="w-full h-full rounded-xl overflow-hidden border-2 border-slate-100 shadow-sm relative">
                                                    <img 
                                                        src={imagenes[index] as string} 
                                                        alt={`Producto ${index + 1}`} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button 
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <label className="w-full h-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-primary/50 transition-all cursor-pointer group/label">
                                                    <div className="p-2 rounded-full bg-white shadow-sm group-hover/label:scale-105 transition-transform">
                                                        <Upload className="w-4 h-4 text-slate-400 group-hover/label:text-primary" />
                                                    </div>
                                                    <span className="mt-1 text-[10px] font-medium text-slate-500 group-hover/label:text-primary">Subir</span>
                                                    <input 
                                                        type="file" 
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={(e) => handleImageChange(index, e)}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-3 pt-4 mt-2 border-t shrink-0">
                    <Button type="button" variant="outline" disabled={isSavingProduct}>Cancelar</Button>
                    <Button type="submit" disabled={isSavingProduct}>
                        {isSavingProduct ? "Guardando..." : "Guardar Producto"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
