import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { toast } from "sonner";
import {
    X,
    ShoppingCart,
    AlertCircle,
    CheckCircle,
    Shield,
    Zap,
    Package,
    Eye
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LovedItemProductProps {
    product: ProductType;
    className?: string;
}

const LovedItemsProduct = ({ product, className }: LovedItemProductProps) => {
    const { removeLovedItem } = useLovedProducts();
    const { addItem, items } = useCart();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const router = useRouter();

    // Verificar si el producto ya está en el carrito
    const isInCart = items.some(item => item.id === product.id);
    const cartItem = items.find(item => item.id === product.id);

    // Función para determinar si es material eléctrico basado en el slug del catálogo
    const isElectricalProduct = product.catalogo?.slug === 'material-electrico';

    // Función para obtener el icono y colores basado en el catálogo
    const getCategoryInfo = () => {
        if (isElectricalProduct) {
            return {
                icon: Zap,
                textColor: 'text-blue-600',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
                gradientFrom: 'from-blue-50',
                gradientTo: 'to-blue-100'
            };
        } else {
            // EPP o cualquier otro catálogo
            return {
                icon: Shield,
                textColor: 'text-orange-600',
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-200',
                gradientFrom: 'from-orange-50',
                gradientTo: 'to-orange-100'
            };
        }
    };

    const categoryInfo = getCategoryInfo();
    const CategoryIcon = categoryInfo.icon;

    const addToCheckout = async () => {
        // Si el producto no tiene precio, no permitir agregarlo al carrito
        if (!product.price || product.price <= 0) {
            toast.error("No se puede agregar al carrito", {
                description: `${product.productName} no tiene precio definido. Por favor, consulta con nosotros.`,
                duration: 3000,
                style: {
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626'
                }
            });
            return;
        }

        setIsAddingToCart(true);

        try {
            // Agregar el producto con cantidad 1 por defecto
            const productWithQuantity = { ...product, quantity: 1 };
            addItem(productWithQuantity);
            toast.success("¡Agregado al carrito!", {
                description: `${product.productName} se agregó a tu carrito`,
                duration: 2000,
            });
        } finally {
            setTimeout(() => setIsAddingToCart(false), 500);
        }
    };

    const handleRemoveFromFavorites = () => {
        removeLovedItem(product.id);
        toast.success("Removido de favoritos", {
            description: `${product.productName} fue removido de tu lista`,
            duration: 2000,
        });
    };

    // Determinar el estado de disponibilidad basado en active
    const getAvailabilityStatus = () => {
        if (product.active) {
            return { status: 'available', label: 'Disponible', icon: CheckCircle, color: 'text-green-700 bg-green-50 border-green-200' };
        } else {
            return { status: 'unavailable', label: 'No disponible', icon: AlertCircle, color: 'text-red-700 bg-red-50 border-red-200' };
        }
    };

    const availabilityInfo = getAvailabilityStatus();
    const AvailabilityIcon = availabilityInfo.icon;

    return (
        <div className={cn(
            "bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden",
            className
        )}>
            {/* Header con botón de eliminar */}
            <div className="flex justify-between items-start p-4 pb-0">
                <div className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium",
                    categoryInfo.bgColor,
                    categoryInfo.textColor,
                    categoryInfo.borderColor
                )}>
                    <CategoryIcon size={14} />
                    <span>{isElectricalProduct ? 'Material Eléctrico' : 'EPP'}</span>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFromFavorites}
                    className="cursor-pointer w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 border border-red-200 p-0 transition-all hover:scale-105"
                    title="Remover de favoritos"
                >
                    <X size={14} />
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 p-4">
                {/* Imagen del producto */}
                <div className="flex-shrink-0">
                    <div className={cn(
                        "w-full md:w-32 h-32 rounded-lg overflow-hidden border-2 transition-all group-hover:scale-105",
                        categoryInfo.borderColor,
                        `bg-gradient-to-br ${categoryInfo.gradientFrom} ${categoryInfo.gradientTo}`
                    )}>
                        {product.images?.[0]?.url ? (
                            <img
                                src={`${product.images[0].url}`}
                                alt={product.productName}
                                className="w-full h-full object-contain p-2"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <CategoryIcon size={28} className={categoryInfo.textColor} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Información del producto */}
                <div className="flex-1 space-y-3">
                    {/* Título */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                            {product.productName}
                        </h3>
                        {product.category?.categoryName && (
                            <p className="text-sm text-gray-500 mt-1">
                                {product.category.categoryName}
                            </p>
                        )}
                    </div>

                    {/* Precio y disponibilidad */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                            {/* Precio */}
                            {product.price && product.price > 0 ? (
                                <span className="text-xl font-bold text-gray-900">
                                    {formatPrice(product.price)}
                                </span>
                            ) : (
                                <span className={cn(
                                    "text-sm font-semibold px-3 py-1.5 rounded-lg border",
                                    categoryInfo.bgColor,
                                    categoryInfo.textColor,
                                    categoryInfo.borderColor
                                )}>
                                    Solicitar precio
                                </span>
                            )}

                            {/* Disponibilidad */}
                            <Badge
                                className={cn(
                                    "text-xs border",
                                    availabilityInfo.color
                                )}
                            >
                                <AvailabilityIcon size={12} className="mr-1" />
                                {availabilityInfo.label}
                            </Badge>
                        </div>

                        {/* Indicador de carrito */}
                        {isInCart && (
                            <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-lg border border-green-200">
                                <Package size={12} />
                                <span>En el carrito ({cartItem?.quantity || 1})</span>
                            </div>
                        )}
                    </div>

                    {/* Descripción */}
                    {product.description && product.description.trim() !== '' && (
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* Botones de acción */}
                <div className="flex-shrink-0 flex flex-col gap-2 w-full md:w-auto">
                    {/* Botón principal */}
                    <Button
                        onClick={addToCheckout}
                        disabled={!product.active || isAddingToCart}
                        className={cn(
                            "rounded-lg font-semibold transition-all h-10 w-full md:w-36 shadow-sm cursor-pointer",
                            isElectricalProduct
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-orange-500 hover:bg-orange-600",
                            isAddingToCart && "animate-pulse",
                            !product.active && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {isAddingToCart ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Agregando...
                            </>
                        ) : (
                            <>
                                <ShoppingCart size={16} className="mr-2" />
                                {!product.active
                                    ? "No disponible"
                                    : product.price && product.price > 0
                                        ? "Agregar"
                                        : "Consultar"
                                }
                            </>
                        )}
                    </Button>

                    {/* Botón secundario - Ver detalles */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg text-gray-600 hover:text-gray-700 hover:bg-gray-50 h-10 w-full md:w-36 text-xs cursor-pointer"
                        title="Ver detalles del producto"
                        onClick={() => router.push(`/${product.slug}`)}
                    >
                        <Eye size={16} className="mr-1" />
                        Ver detalles
                    </Button>
                </div>
            </div>

            {/* Footer con información adicional */}
            {(product.active && product.price && product.price > 0) && (
                <div className={cn(
                    "border-t bg-gradient-to-r px-4 py-2",
                    categoryInfo.gradientFrom,
                    categoryInfo.gradientTo
                )}>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">Listo para agregar al carrito</span>
                        <div className="flex items-center gap-4">
                            <span className={cn("font-medium", categoryInfo.textColor)}>
                                ✓ Disponible
                            </span>
                            <span className="text-gray-500">
                                Stock disponible
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LovedItemsProduct;