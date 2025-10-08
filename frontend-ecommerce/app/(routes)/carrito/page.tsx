"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/formatPrice";
import CartItem from "./components/cart-item";
import { ShoppingCart, HardHat, CreditCard, Trash2, ArrowRight, ShieldCheck, Truck, Zap, Shield } from "lucide-react";
import { useState } from "react";
import { loadStripe } from '@stripe/stripe-js'
import { makePaymentRequest } from "@/api/payment";


export default function Cart() {
    const { items, removeAll, getTotalPrice } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const totalPrice = getTotalPrice();
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRAPI_PUBLISHABLE_KEY || '')

    const buyStripe = async () => {
        try {
            const stripe = await stripePromise
            const res = await makePaymentRequest.post("/api/orders", {
                products: items
            })

            await stripe?.redirectToCheckout({
                sessionId: res.data.stripeSession.id
            })
            removeAll()
        } catch (error) {
            console.log(error)
        }
    }

    const totalItems = items.length;
    const hasElectricalItems = items.some(item => item.category?.slug === 'material-electrico');

    const handleRemoveAll = () => {
        if (items.length > 0) {
            removeAll();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="max-w-7xl px-0 py-8 mx-auto sm:px-6 lg:px-0">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-3 rounded-full ${hasElectricalItems ? 'bg-blue-100' : 'bg-orange-100'}`}>
                            {hasElectricalItems ?
                                <Zap className="w-6 h-6 text-blue-600" /> :
                                <HardHat className="w-6 h-6 text-orange-600" />
                            }
                        </div>
                        <h1 className={`text-4xl font-bold ${hasElectricalItems ? 'text-blue-900' : 'text-gray-900'}`}>
                            Carrito de Compras
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg flex items-center gap-2">
                        {hasElectricalItems && <Zap className="w-4 h-4 text-blue-500" />}
                        {totalItems > 0 ? `${totalItems} producto${totalItems > 1 ? 's' : ''} en tu carrito` : 'Tu carrito está vacío'}
                    </p>
                </div>

                {items.length === 0 ? (
                    /* Estado vacío mejorado */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-blue-200 rounded-full flex items-center justify-center mb-6">
                            <div className="flex items-center gap-2">
                                <HardHat className="w-12 h-12 text-orange-500" />
                                <Zap className="w-12 h-12 text-blue-500" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Tu carrito está vacío</h2>
                        <p className="text-gray-600 mb-8 max-w-md">
                            Descubre nuestro catálogo de equipos de protección personal y material eléctrico de alta calidad
                        </p>
                        <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 cursor-pointer"
                            onClick={() => window.history.back()}
                        >
                            <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                            Continuar Comprando
                        </Button>
                    </div>
                ) : (
                    /* Contenido principal */
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Lista de productos */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                        {hasElectricalItems ? (
                                            <>
                                                <Zap className="w-5 h-5 text-blue-500" />
                                                <span className="text-blue-700">Productos ({totalItems})</span>
                                            </>
                                        ) : (
                                            <>
                                                <Shield className="w-5 h-5 text-orange-500" />
                                                <span>Productos ({totalItems})</span>
                                            </>
                                        )}
                                    </h2>
                                    {items.length > 0 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleRemoveAll}
                                            className="cursor-pointer text-red-600 border-red-200 hover:text-white hover:bg-red-500 hover:border-red-300"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Vaciar carrito
                                        </Button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <CartItem key={item.id} product={item} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Resumen del pedido */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                        <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                                        Resumen del Pedido
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Detalles del precio */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-gray-600">
                                                <span>Subtotal ({totalItems} productos)</span>
                                                <span>{formatPrice(totalPrice)}</span>
                                            </div>
                                            <div className="flex justify-between text-green-600">
                                                <span className="flex items-center">
                                                    <Truck className="w-4 h-4 mr-1" />
                                                    Envío
                                                </span>
                                                <span className="font-medium">PENDIENTE</span>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Total */}
                                        <div className="flex justify-between text-xl font-bold text-gray-900">
                                            <span>Total</span>
                                            <span className={`${hasElectricalItems ? 'text-blue-600' : 'text-orange-600'}`}>
                                                {formatPrice(totalPrice)}
                                            </span>
                                        </div>

                                        {/* Botón de checkout */}
                                        <Button
                                            className={`w-full cursor-pointer ${hasElectricalItems ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700'} text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200`}
                                            onClick={buyStripe}
                                            disabled={isProcessing}
                                        >
                                            {isProcessing ? (
                                                <div className="flex items-center">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Procesando...
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <ShieldCheck className="w-5 h-5 mr-2" />
                                                    Proceder al Pago
                                                    <ArrowRight className="w-5 h-5 ml-2" />
                                                </div>
                                            )}
                                        </Button>

                                        {/* Garantías */}
                                        <div className="mt-6 space-y-3 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                                                <span>Pago 100% seguro</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Truck className="w-4 h-4 mr-2 text-blue-500" />
                                                <span>Envío especializado incluido</span>
                                            </div>

                                            <div className="flex items-center">
                                                <Shield className="w-4 h-4 mr-2 text-orange-500" />
                                                <span>Certificación de seguridad EPP</span>
                                            </div>

                                            <div className="flex items-center">
                                                <Zap className="w-4 h-4 mr-2 text-blue-500" />
                                                <span className="text-blue-700">Certificación eléctrica garantizada</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* Botón continuar comprando */}
                                <Button
                                    variant="outline"
                                    className="w-full mt-4 py-3 border-gray-300 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => window.history.back()}
                                >
                                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                                    Continuar Comprando
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}