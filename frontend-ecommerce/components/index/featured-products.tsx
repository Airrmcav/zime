'use client'

import { useGetFeaturedProducts } from "@/api/EPP/useGetFeaturedProductsEpp";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import SkeletonSchema from "../skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle, XCircle, Star, Heart, ShoppingCart, Maximize2, ShieldCheck, MoveRight } from "lucide-react";
import IconButton from "../icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

const FeaturedProducts = () => {
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();
  const { addItem, items } = useCart();
  const { addLoveItems } = useLovedProducts();

  const handleCardClick = (product: ProductType) => {
    if (product.slug === "productos-destacados") {
      router.push(`/productos-destacados`);
    } else {
      router.push(`/${product.slug}`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation(); // Evita que se dispare el click de la card
    addItem(product);
  };

  const handleAddToFavorites = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation(); // Evita que se dispare el click de la card
    addLoveItems(product);
  };

  const handleMaximize = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation(); // Evita que se dispare el click de la card
    handleCardClick(product);
  };

  return (
    <div className="max-w-7xl my-5 mx-auto sm:py-0 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="text-left mb-6 lg:mb-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-400 rounded-full mb-4">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">
              Productos Destacados Protección Personal
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Equipo de Protección Personal
          </h1>
          <p className="text-lg text-gray-600">
            Encuentra cascos, guantes, chalecos, lentes y más, diseñados para
            garantizar tu seguridad en todo momento.
          </p>
        </div>
        <div className="flex justify-center w-full lg:w-auto">
          <button className="bg-orange-400 flex gap-2 text-white px-6 py-3 rounded-2xl font-medium hover:bg-orange-500 transition">
            Ver más productos
            <MoveRight />
          </button>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {loading && (
              <SkeletonSchema grid={4} />
            )}
            {result !== null && (
              result.map((product: ProductType) => {
                const { id, images, productName, category, description, active, price } = product;
                const imageUrl = images?.[0]?.url;

                return (
                  <CarouselItem key={id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 py-10">
                    <div className="h-full">
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
                                <span className="text-4xl">🏥</span>
                              </div>
                            )}

                            {/* Availability Badge */}
                            <div className="absolute top-2 left-1">
                              <Badge
                                variant={active ? "default" : "secondary"}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${active
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

                            {/* Botones de acción que no interfieren con el click de la card */}
                            <div 
                              onClick={(e) => handleAddToFavorites(e, product)}
                              className="absolute top-0 right-0 z-10"
                            >
                              <IconButton 
                                onClick={() => {}} 
                                icon={<Heart className="w-4 h-4 text-gray-800 hover:text-red-500 transition-colors" />} 
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
                                icon={<Maximize2 className="w-4 h-4 text-gray-800 hover:text-blue-500 transition-colors" />} 
                                className="p-2 bg-gray-200 transition-all duration-200 group-hover:opacity-100 rounded-none" 
                                aria-label="Ver producto" 
                                title="Ver producto" 
                              />
                            </div>

                            {/* Category Badge */}
                            <div className="absolute bottom-0 left-1">
                              <Badge className="bg-orange-600  text-white px-3 py-1 rounded-full text-xs font-medium">
                                {category && category.categoryName ? category.categoryName : "Categoría"}
                              </Badge>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 flex-1 flex flex-col min-h-[220px]">
                            <h2 className="font-normal text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[56px] flex items-start">
                              {productName}
                            </h2>

                            <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
                              {description || "Equipo médico de alta calidad diseñado para proporcionar resultados precisos y confiables en entornos clínicos profesionales."}
                            </p>

                            {/* Price */}
                            {price && price > 0.00 && (
                              <div className="mb-4">
                                <span className="text-2xl font-bold text-orange-600">
                                  ${price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </span>
                                <span className="text-xs ml-1 text-gray-400">con IVA</span>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-2 mt-auto">
                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className={`cursor-pointer flex-1 flex items-center justify-center gap-3 py-2.5 px-3 rounded-lg font-medium text-sm transition-all duration-200 z-10 relative ${active
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
                  </CarouselItem>
                )
              })
            )}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="cursor-pointer hidden md:flex -left-12 bg-white shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600" />
          <CarouselNext className="cursor-pointer hidden md:flex -right-12 bg-white shadow-lg border-2 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600" />
        </Carousel>
      </div>
    </div>
  )
}

export default FeaturedProducts;