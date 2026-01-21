"use client";
import {
  Shield,
  Zap,
  Award,
  CheckCircle,
  Lightbulb,
  Sun,
  Heart,
  Maximize2,
  ShoppingCart,
  XCircle,
} from "lucide-react";
import { useGetProductsByCategory } from "@/api/getProductsByCategory";
import { ResponseType } from "@/types/response";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IconButton from "@/components/icon-button";
import SkeletonSchema from "@/components/skeletonSchema";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import Accordeon from "./components/accordeon";

const PostesClient = () => {
  const router = useRouter();
  const { loading, result }: ResponseType = useGetProductsByCategory(
    "Bolardos y Postes Lumínicos",
  );
  const { addItem } = useCart();
  const { addLoveItems } = useLovedProducts();

  const handleCardClick = (product: ProductType) => {
    router.push(`/${product.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleAddToFavorites = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    addLoveItems(product);
  };

  const handleMaximize = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    handleCardClick(product);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-[400px] flex flex-col items-center justify-center bg-linear-to-br from-blue-500 via-blue-600 to-blue-800 text-white py-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                <Lightbulb className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Postes Y Estructuras para
              <span className="text-blue-200"> Alumbrado Público</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Soluciones integrales en infraestructura de iluminación: postes
              metálicos, luminarias LED, brazos galvanizados y sistemas solares
              para proyectos municipales, industriales y viales.
            </p>

            {/* Características */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-white/30 transition-all">
                <Shield className="w-6 h-6" />
                <span className="font-semibold text-sm">Acero Galvanizado</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-white/30 transition-all">
                <Zap className="w-6 h-6" />
                <span className="font-semibold text-sm">Iluminación LED</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-white/30 transition-all">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold text-sm">
                  Proyectos Llave en Mano
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-white/30 transition-all">
                <Sun className="w-6 h-6" />
                <span className="font-semibold text-sm">Energía Solar</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-white/30 transition-all">
                <Award className="w-6 h-6" />
                <span className="font-semibold text-sm">
                  Certificaciones IP66
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Postes y Bolardos para Alumbrado Exterior
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Postes metálicos, bolardos lumínicos y soluciones de iluminación
            exterior diseñadas para alumbrado público, vial, urbano e
            industrial, con altos estándares de calidad y durabilidad.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <SkeletonSchema grid={4} />
          </div>
        )}

        {result && result.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {result.map((product: ProductType) => {
              const {
                id,
                images,
                productName,
                category,
                description,
                active,
                price,
              } = product;
              const imageUrl = images?.[0]?.url;

              return (
                <div key={id} className="h-full">
                  <Card
                    className="group h-full hover:shadow-2xl shadow-none transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden py-0 rounded-none border border-gray-100 cursor-pointer"
                    onClick={() => handleCardClick(product)}
                  >
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-white h-48 flex items-center justify-center">
                        {imageUrl ? (
                          <img
                            src={`${imageUrl}`}
                            alt={productName}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-4xl">💡</span>
                          </div>
                        )}

                        {/* Availability Badge */}
                        <div className="absolute top-2 left-1">
                          <Badge
                            variant={active ? "default" : "secondary"}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${
                              active
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }`}
                          >
                            {active ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <XCircle className="w-3 h-3" />
                            )}
                            {active ? "En Stock" : "No Disponible"}
                          </Badge>
                        </div>

                        {/* Action Buttons */}
                        <div
                          onClick={(e) => handleAddToFavorites(e, product)}
                          className="absolute top-0 right-0 z-10"
                        >
                          <IconButton
                            onClick={() => {}}
                            icon={
                              <Heart className="w-4 h-4 text-gray-800 hover:text-red-500 transition-colors" />
                            }
                            className="p-2 bg-gray-200 transition-all duration-200 group-hover:opacity-100 rounded-none"
                            aria-label="Agregar a favoritos"
                            title="Agregar a favoritos"
                          />
                        </div>

                        <div
                          onClick={(e) => handleMaximize(e, product)}
                          className="absolute top-12 right-0 z-10"
                        >
                          <IconButton
                            onClick={() => {}}
                            icon={
                              <Maximize2 className="w-4 h-4 text-gray-800 hover:text-blue-500 transition-colors" />
                            }
                            className="p-2 bg-gray-200 transition-all duration-200 group-hover:opacity-100 rounded-none"
                            aria-label="Ver producto"
                            title="Ver producto"
                          />
                        </div>

                        {/* Category Badge */}
                        <div className="absolute bottom-0 left-1">
                          <Badge className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {category && category.categoryName
                              ? category.categoryName
                              : "Categoría"}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col min-h-[220px]">
                        <h3 className="font-normal text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[56px] flex items-start">
                          {productName}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
                          {description ||
                            "Poste lumínico de alta calidad diseñado para alumbrado público e industrial."}
                        </p>

                        {/* Price */}
                        {price && price > 0.0 && (
                          <div className="mb-4">
                            <span className="text-2xl font-bold text-blue-600">
                              $
                              {price.toLocaleString("es-MX", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                            <span className="text-xs ml-1 text-gray-400">
                              con IVA
                            </span>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-auto">
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className={`cursor-pointer flex-1 flex items-center justify-center gap-3 py-2.5 px-3 rounded-lg font-medium text-sm transition-all duration-200 z-10 relative ${
                              active
                                ? "bg-black hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!active}
                            aria-label={`Agregar ${productName} al carrito`}
                          >
                            Agregar al carrito <ShoppingCart />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        {result && result.length === 0 && (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No se encontraron productos en esta categoría
            </p>
          </div>
        )}
      </section>

      <Accordeon />
    </div>
  );
};

export default PostesClient;
