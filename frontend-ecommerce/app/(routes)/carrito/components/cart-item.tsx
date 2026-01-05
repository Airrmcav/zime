import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X, HardHat, Plus, Minus, Zap, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CartItemProps {
    product: ProductType
    showHeaders?: boolean
}

const CartItem = (props: CartItemProps) => {
    const { product, showHeaders = false } = props
    const { removeItem, updateQuantity } = useCart();
    const router = useRouter();
    const [isRemoving, setIsRemoving] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Detectar si es material eléctrico
    const isElectrical = product.catalogo?.slug === 'luminarias';

    // Colores dinámicos según categoría
    const colors = {
        accent: isElectrical ? 'bg-blue-500' : 'bg-orange-500',
        text: isElectrical ? 'text-blue-600' : 'text-orange-600',
        bg: isElectrical ? 'bg-blue-50' : 'bg-orange-50',
        border: isElectrical ? 'border-blue-200' : 'border-orange-200',
        hover: isElectrical ? 'hover:bg-blue-50' : 'hover:bg-orange-50',
        gradient: isElectrical ? 'from-blue-500/5 to-blue-600/5' : 'from-orange-500/5 to-orange-600/5'
    };

    const handleRemove = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsRemoving(true);
        setTimeout(() => {
            removeItem(product.id);
        }, 200);
    };

    const handleViewProduct = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/${product.slug}`);
    };

    const totalItemPrice = (product.price ?? 0) * (product.quantity || 1);

    return (
        <>
            {/* Headers de tabla - solo mostrar una vez */}
            {showHeaders && (
                <div className="bg-gray-50 rounded-t-lg border border-b-0 border-gray-200 p-4 mb-0">
                    <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-gray-700">
                        <div className="col-span-12 md:col-span-6">Producto</div>
                        <div className="col-span-6 md:col-span-2 text-center">Precio</div>
                        <div className="col-span-6 md:col-span-2 text-center">Cantidad</div>
                        <div className="col-span-8 md:col-span-1 text-center">Total</div>
                        <div className="col-span-4 md:col-span-1 text-center">Acción</div>
                    </div>
                </div>
            )}

            {/* Item clickeable */}
            <li 
                className={cn(
                    "group relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300  cursor-pointer list-none",
                    isRemoving && "scale-95 opacity-50",
                    colors.hover,
                    showHeaders && "rounded-t-none border-t-0"
                )}
                onClick={handleViewProduct}
            >
                {/* Indicador de categoría */}
                <div className={cn("absolute top-0 left-0 w-1 h-full", colors.accent)}></div>
                
                {/* Contenido de tabla */}
                <div className="p-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                        
                        {/* Producto - Columna 1-6 */}
                        <div className="col-span-12 md:col-span-6 flex items-center space-x-4">
                            {/* Imagen/Icono */}
                            <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center border transition-colors", colors.border, `group-hover:${colors.bg}`)}>
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`}
                                        alt={product.productName}
                                        className="w-12 h-12 object-contain"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className={cn("w-12 h-12 flex items-center justify-center rounded-md", colors.bg)}>
                                        {isElectrical ? (
                                            <Zap className={cn("w-6 h-6", colors.text)} />
                                        ) : (
                                            <HardHat className={cn("w-6 h-6", colors.text)} />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Info del producto */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                                    {product.productName}
                                </h3>
                                <div className={cn("flex items-center space-x-1 text-sm", isElectrical && colors.text)}>
                                    {isElectrical ? (
                                        <Zap className="w-4 h-4" />
                                    ) : (
                                        <Shield className="w-4 h-4" />
                                    )}
                                    <span>{product.category?.categoryName}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Disponible</span>
                                </div>
                            </div>
                        </div>

                        {/* Precio unitario - Columna 7-8 */}
                        <div className="col-span-6 md:col-span-2 text-center">
                            <div className="text-xs text-gray-500 mb-1">Precio</div>
                            <div className="font-semibold text-gray-900">
                                {formatPrice(product.price ?? 0)}
                            </div>
                            <div className="text-xs text-gray-500">c/IVA</div>
                        </div>

                        {/* Cantidad - Columna 9 */}
                        <div className="col-span-6 md:col-span-2">
                            <div className="text-xs text-gray-500 mb-1 text-center">Cantidad</div>
                            <div 
                                className="flex items-center justify-center bg-gray-100 rounded-lg  border border-gray-200"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsUpdating(true);
                                        const newQuantity = Math.max(1, (product.quantity || 1) - 1);
                                        updateQuantity(product.id, newQuantity);
                                        setTimeout(() => setIsUpdating(false), 300);
                                    }}
                                    className="p-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                                    disabled={isUpdating}
                                >
                                    <Minus className="w-3 h-3" />
                                </button>

                                <input
                                    type="number"
                                    min="1"
                                    value={product.quantity || 1}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (isNaN(value) || value < 1) return;
                                        setIsUpdating(true);
                                        updateQuantity(product.id, value);
                                        setTimeout(() => setIsUpdating(false), 300);
                                    }}
                                    className="cursor-pointer w-10 text-center bg-white border-0 focus:ring-0 text-gray-700 text-sm"
                                    disabled={isUpdating}
                                    onClick={(e) => e.stopPropagation()}
                                />

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsUpdating(true);
                                        const newQuantity = (product.quantity || 1) + 1;
                                        updateQuantity(product.id, newQuantity);
                                        setTimeout(() => setIsUpdating(false), 300);
                                    }}
                                    className="cursor-pointer p-1 bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                                    disabled={isUpdating}
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        {/* Total - Columna 10-11 */}
                        <div className="col-span-8 md:col-span-1 text-center">
                            <div className="text-xs text-gray-500 mb-1">Total</div>
                            <div className={cn("font-bold text-lg", isElectrical ? 'text-blue-600' : 'text-orange-600')}>
                                {formatPrice(totalItemPrice)}
                            </div>
                        </div>

                        {/* Acciones - Columna 12 */}
                        <div className="absolute -top-3 -right-3">
                            {/* Botón eliminar */}
                            <button
                                onClick={handleRemove}
                                className="p-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 group/btn"
                                title="Eliminar del carrito"
                                disabled={isRemoving}
                            >
                                <X className={cn(
                                    "w-4 h-4 group-hover/btn:scale-110 transition-transform",
                                    isRemoving && "animate-spin"
                                )} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hover effect overlay */}
                <div className={cn("absolute inset-0 bg-gradient-to-r rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none", colors.gradient)}></div>
            </li>
        </>
    );
}

export default CartItem;