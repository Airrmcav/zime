import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import {
    Heart,
    ShoppingCart,
    CheckCircle,
    XCircle,
    Share2,
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Shield,
    CreditCard,
    Plus,
    Minus,
    Zap,
    X,
    Star
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { useState } from "react";

export type InfoProductProps = {
    product: ProductType;
    catalogSlug?: string;
}

const InfoProduct = (props: InfoProductProps) => {
    const { product, catalogSlug } = props;
    const { addItem, items } = useCart();
    const { addLoveItems } = useLovedProducts();
    const [quantity, setQuantity] = useState(1);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    // Configuración según el tipo de catálogo
    const isElectrical = catalogSlug === 'luminarias';
    const colorConfig = {
        primary: isElectrical ? 'blue' : 'orange',
        // Botones principales
        primaryButton: isElectrical ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700',
        secondaryButton: isElectrical ? 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700' : 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700',
        // Badges de disponibilidad
        availableBadge: isElectrical ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-green-100 text-green-800 border-green-300',
        unavailableBadge: 'bg-red-100 text-red-800 border-red-300',
        // Pago seguro
        paymentButton: isElectrical ? 'text-blue-500' : 'text-orange-500',
        // Características
        characteristicBg: isElectrical ? 'bg-blue-50' : 'bg-orange-50',
        characteristicIcon: isElectrical ? 'text-blue-600' : 'text-green-600',
        // Iconos y textos
        productIcon: isElectrical ? Zap : Shield,
        productType: isElectrical ? 'Material Eléctrico' : 'Equipo de protección',
        // paymentText: isElectrical ? 'Compra Segura' : 'Pago Seguro',
        availableText: isElectrical ? 'En Stock' : 'En Stock, envío inmediato',
        buttonText: isElectrical ? 'Agregar al Carrito' : 'Agregar al Carrito'
    };

    // console.log(items);

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };

    const handleAddToCart = () => {
        const productWithQuantity = { ...product, quantity };
        addItem(productWithQuantity);
    };

    const ProductIcon = colorConfig.productIcon;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white">
            {/* Header con tipo de producto */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <ProductIcon className={`w-5 h-5 ${isElectrical ? 'text-blue-600' : 'text-orange-600'}`} />
                    <span className={`text-sm font-medium ${isElectrical ? 'text-blue-600' : 'text-orange-600'}`}>
                        {colorConfig.productType}
                    </span>
                </div>

                {/* Badge de Producto Destacado */}
                {product.isFeatured && (
                    <Badge className="bg-yellow-500 text-white border-yellow-500 px-3 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        Producto Destacado
                    </Badge>
                )}
            </div>

            {/* Nombre del Producto */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.productName}
            </h1>

            {/* Descripción */}
            <div className="mb-6">
                {/* <h3 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h3> */}
                <p className="text-gray-700 leading-relaxed line-clamp-4">
                    {product.description}
                </p>
            </div>



            {/* Categoría y Disponibilidad */}
            <div className="space-y-3 mb-6">
                {/* Disponibilidad */}
                <div className="">
                    <Badge
                        className={`${product.active
                            ? colorConfig.availableBadge
                            : colorConfig.unavailableBadge
                            } px-4 py-2 text-base font-medium border`}
                    >
                        {product.active ? (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {colorConfig.availableText}
                            </>
                        ) : (
                            <>
                                <XCircle className="w-4 h-4 mr-2" />
                                No Disponible
                            </>
                        )}
                    </Badge>
                </div>
            </div>
            <Separator className="my-6" />
            {/* Precio */}
            <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                    {product.price ? formatPrice(product.price) : "Consultar precio"}
                </span>
                <span className="text-gray-600 ml-2">
                    {isElectrical ? 'IVA incluido' : 'IVA incluido'}
                </span>
            </div>

            {/* Botones de Agregar al Carrito, Favoritos y Compartir */}
            <div className="flex gap-2 mb-6 max-w-[350px] sm:max-w-none">
                <Button
                    className={`flex-1 cursor-pointer ${colorConfig.primaryButton} text-white py-7 px-6 text-lg font-normal rounded-lg`}
                    disabled={!product.active || !product.price || product.price <= 0}
                    onClick={handleAddToCart}
                    title={!product.price || product.price <= 0 ? "Este producto no tiene precio definido" : "Agregar al carrito"}
                >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {!product.price || product.price <= 0 ? "Consultar precio" : colorConfig.buttonText}
                </Button>


                {/* <Button
                    variant="outline"
                    onClick={() => setIsShareModalOpen(true)}
                    className="px-4 py-3 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-lg group cursor-pointer"
                >
                    <Share2 className="w-5 h-5 group-hover:text-blue-400 transition-all" />
                </Button> */}
            </div>


            <Separator className="my-6" />

            {/* Botón Pago Seguro */}
            <div className="mb-8">
                <p
                    className={`bg-transparent text-gray-500 shadow-none pb-2 px-0 text-lg font-medium rounded-lg flex items-center gap-3`}

                >
                    Formas de pago
                </p>

                {/* Tarjetas Aceptadas */}
                <div className="mt-1 text-left">
                    <div className="flex justify-start items-center gap-3 flex-wrap">
                        <div className="px-6 py-1 bg-blue-100 rounded flex items-center">
                            <FontAwesomeIcon icon={faCcVisa} className="w-20 h-20 text-blue-800" />
                        </div>
                        <div className="px-6 py-1 bg-red-100 rounded flex items-center">
                            <FontAwesomeIcon icon={faCcMastercard} className="w-20 h-20 text-red-800" />
                        </div>
                        <div className="px-6 py-1 bg-blue-100 rounded flex items-center">
                            <FontAwesomeIcon icon={faCcAmex} className="w-6 h-6 text-blue-800" />
                        </div>
                        <div className="px-6 py-1 bg-green-100 rounded flex items-center">
                            <FontAwesomeIcon icon={faCcPaypal} className="w-6 h-6 text-green-800" />
                        </div>
                    </div>
                </div>
                <Separator className="my-6" />

                <div className="my-4">
                    <a
                        href={`https://wa.me/5215560913395?text=Hola,%20me%20interesa%20cotizar%20este%20producto:%20${encodeURIComponent(product.productName)}.%20¿Podrías%20ayudarme%20con%20más%20información%20y%20precios?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-6 py-4 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group inline-flex"
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-lg">Cotizar este producto</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>


            {/* Información de garantía/certificación */}
            <div className={`mb-6 p-4 ${isElectrical ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} rounded-lg border`}>
                <div className="flex items-center gap-2 mb-2">
                    <ProductIcon className={`w-5 h-5 ${isElectrical ? 'text-blue-600' : 'text-orange-600'}`} />
                    <span className={`font-semibold ${isElectrical ? 'text-blue-800' : 'text-orange-800'}`}>
                        {isElectrical ? 'Certificación Eléctrica' : 'Certificación EPP'}
                    </span>
                </div>
                <p className={`text-sm ${isElectrical ? 'text-blue-700' : 'text-orange-700'}`}>
                    {isElectrical
                        ? 'Producto certificado que cumple con normas eléctricas internacionales.'
                        : 'Equipo de Protección Personal certificado que cumple con normativas de seguridad.'
                    }
                </p>
            </div>


            {/* Características */}
            {Array.isArray(product.characteristics) && product.characteristics.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {isElectrical ? 'Especificaciones Técnicas' : 'Características'}
                    </h3>
                    <div className="space-y-3">
                        {product.characteristics.map((characteristic: string, index: number) => (
                            <div
                                key={index}
                                className={`flex items-start gap-3 p-3 ${colorConfig.characteristicBg} rounded-lg`}
                            >
                                <CheckCircle className={`w-5 h-5 ${colorConfig.characteristicIcon} mt-0.5 flex-shrink-0`} />
                                <span className="text-gray-700">
                                    {characteristic}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default InfoProduct;