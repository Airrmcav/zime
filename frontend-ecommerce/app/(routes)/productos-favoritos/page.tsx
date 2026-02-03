"use client";
import { useLovedProducts } from "@/hooks/use-loved-products";
import LovedItemsProduct from "./components/loved-item-products";
import {
  Shield,
  Zap,
  Star,
  Package,
  CheckCheckIcon,
  ShoppingCart,
  Activity,
  HardHat,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BsWhatsapp } from "react-icons/bs";

export default function Page() {
  const { lovedItems } = useLovedProducts();
  const router = useRouter();

  const handleWhatsAppQuote = () => {
    const productsList = lovedItems
      .map((item) => `- ${item.productName}`)
      .join("\n");
    const message = `Hola , me gustaría recibir una cotización de los siguientes productos:\n${productsList}\n\nVengo de la página ZIME.COM.MX`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/525510070205?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-2.5 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="bg-blue-600 p-2.5 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Productos Seleccionados
              </h1>
              <p className="text-gray-600 mt-1">
                EPP y Luminarias de calidad profesional
              </p>
            </div>
          </div>

          {/* WhatsApp CTA Banner - Nuevo */}
          {lovedItems.length > 0 && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <BsWhatsapp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      ¡Cotiza Fácil y Rápido!
                    </h3>
                    <p className="text-green-100">
                      Envía tu lista directamente por WhatsApp
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleWhatsAppQuote}
                  className="cursor-pointer bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Cotizar Ahora
                </button>
              </div>
            </div>
          )}

          {/* Stats Cards - Modificado para incluir WhatsApp */}
          {lovedItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">Productos</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {lovedItems.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <p className="text-lg font-semibold text-gray-900">
                      Disponible
                    </p>
                  </div>
                </div>
              </div>
              {/* Indicador de WhatsApp */}
              <div className="bg-green-50 rounded-lg p-4 shadow-sm border border-green-200">
                <div className="flex items-center gap-3">
                  <BsWhatsapp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-700">Cotización</p>
                    <p className="text-lg font-semibold text-green-800">
                      WhatsApp
                    </p>
                  </div>
                </div>
              </div>
              {/* Botón de acción principal
                            <button
                                onClick={handleWhatsAppQuote}
                                className="w-full flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-3 shadow-md transition-all duration-300 cursor-pointer group"
                            >
                                <BsWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <div className="text-left">
                                    <p className="text-sm opacity-90">Cotizar</p>
                                    <p className="text-base font-semibold">Ya!</p>
                                </div>
                            </button> */}
            </div>
          )}
        </div>

        {/* Main Content */}
        {lovedItems.length === 0 ? (
          // Empty State - Mejorado con mención de WhatsApp
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="text-center py-16 px-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HardHat className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tu lista está vacía
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-4">
                Explora nuestro catálogo de equipo de protección personal y
                luminarias para comenzar tu selección.
              </p>
              {/* Beneficio de WhatsApp */}
              <div className="bg-green-50 rounded-lg p-4 max-w-sm mx-auto mb-8">
                <div className="flex items-center gap-3 justify-center">
                  <BsWhatsapp className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    Cotización rápida por WhatsApp
                  </span>
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
                <button
                  onClick={() => router.push("/categoria/epp")}
                  className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl p-4 transition-colors group"
                >
                  <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium text-gray-900 mb-1">EPP</h4>
                  <p className="text-sm text-gray-600">Equipo de Protección</p>
                </button>
                <button
                  onClick={() => router.push("/categoria/luminarias")}
                  className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-4 transition-colors group"
                >
                  <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium text-gray-900 mb-1">Eléctrico</h4>
                  <p className="text-sm text-gray-600">
                    Material y Herramientas
                  </p>
                </button>
              </div>

              <button
                onClick={() => router.push("/categoria/todos")}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Ver Catálogo Completo
              </button>
            </div>
          </div>
        ) : (
          // Products List
          <div className="space-y-6">
            {/* Toolbar - Mejorado con recordatorio de WhatsApp */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-700 font-medium">
                      {lovedItems.length}{" "}
                      {lovedItems.length === 1 ? "producto" : "productos"}
                    </span>
                  </div>
                  {/* Recordatorio sutil */}
                  <div className="hidden sm:flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <BsWhatsapp className="w-3 h-3" />
                    <span>Lista para cotizar</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                    <CheckCheckIcon className="w-4 h-4 text-green-600" />
                    Vista Lista
                  </button>
                  {/* Botón secundario de WhatsApp */}
                  <button
                    onClick={handleWhatsAppQuote}
                    className="sm:hidden flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <BsWhatsapp className="w-4 h-4" />
                    Cotizar
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                {lovedItems.map((item) => (
                  <LovedItemsProduct key={item.id} product={item} />
                ))}
              </div>
            </div>

            {/* Floating WhatsApp Button - Nuevo */}
            <div className="fixed bottom-6 right-6 z-50 sm:hidden">
              <button
                onClick={handleWhatsAppQuote}
                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-bounce"
                aria-label="Cotizar por WhatsApp"
              >
                <BsWhatsapp className="w-6 h-6" />
              </button>
            </div>

            {/* Action Section - Mejorado */}
            <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-2xl p-8 text-white shadow-xl">
              <div className="text-center max-w-2xl mx-auto">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-4 rounded-full">
                    <BsWhatsapp className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  ¡Tu cotización está lista!
                </h3>
                <p className="text-green-100 mb-8">
                  Haz clic para enviar tu lista de productos directamente por
                  WhatsApp. Recibirás precios competitivos y asesoría
                  especializada en menos de 24 horas.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={handleWhatsAppQuote}
                    className="cursor-pointer bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-xl font-bold transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl hover:scale-105 text-lg"
                  >
                    <BsWhatsapp className="w-6 h-6 mr-3" />
                    Enviar por WhatsApp
                  </button>

                  <div className="flex items-center text-sm text-green-200">
                    <Activity className="w-4 h-4 mr-2 text-green-300" />
                    Respuesta garantizada en 24 horas
                  </div>
                </div>

                {/* Beneficios adicionales */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-center gap-2 text-green-200">
                    <CheckCheckIcon className="w-4 h-4" />
                    <span>Sin compromiso</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-200">
                    <Shield className="w-4 h-4" />
                    <span>Productos certificados</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-200">
                    <Star className="w-4 h-4" />
                    <span>Precios competitivos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Productos certificados con garantía y soporte técnico especializado
            •
            <span className="text-green-600 font-medium ml-1">
              Cotizaciones rápidas por WhatsApp
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
