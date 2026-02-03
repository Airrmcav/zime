"use client";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { CatalogoType } from "@/types/catalogo";
import { ArrowRight, Loader2, Shield, Zap, Package } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { useGetCatalogos } from "@/api/useGetCatalogos";

const ChooseCatalogo = () => {
  const { result, loading, error }: ResponseType = useGetCatalogos();
  const router = useRouter();

  // Función para obtener el ícono apropiado según el tipo de catálogo
  const getCatalogoIcon = (catalogoName: string) => {
    const name = catalogoName.toLowerCase();
    if (
      name.includes("protección") ||
      name.includes("epp") ||
      name.includes("seguridad")
    ) {
      return <Shield className="w-6 h-6" />;
    }
    if (
      name.includes("eléctrico") ||
      name.includes("electricidad") ||
      name.includes("cables")
    ) {
      return <Zap className="w-6 h-6" />;
    }
    return <Package className="w-6 h-6" />;
  };

  const isElectricCatalogo = (catalogo: any) => {
    if (!catalogo || !catalogo.nameCatalogo) return false;
    const name = catalogo.nameCatalogo.toLowerCase();
    const desc = catalogo.descriptionCatalogo?.toLowerCase() || "";
    return (
      name.includes("eléctrico") ||
      name.includes("electricidad") ||
      desc.includes("eléctrico")
    );
  };

  // Función para obtener colores según el tipo
  const getColorClasses = (catalogo: any, isElectric: boolean) => {
    const isElectricType = isElectric || isElectricCatalogo(catalogo);
    return {
      badge: isElectricType ? "bg-blue-600/10" : "bg-orange-600/10",
      badgeText: isElectricType ? "text-blue-800" : "text-orange-800",
      actionBtn: isElectricType ? "bg-blue-600" : "bg-orange-600",
      footer: isElectricType ? "text-blue-600" : "text-orange-600",
    };
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 pt-5">
      <div className="max-w-7xl py-1 mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-left mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-600/10 via-orange-600/10 to-blue-600/10 border border-blue-200/50 rounded-full mb-2 backdrop-blur-sm">
            <Shield className="w-5 h-5 text-orange-600 animate-pulse" />
            <span className="text-sm font-semibold bg-linear-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent uppercase tracking-wider">
              Catálogos Disponibles
            </span>
            <Zap className="w-5 h-5 text-blue-600 animate-pulse" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl lg:text-5xl font-black text-gray-900 mb-3 leading-tight">
            <span className="">Nuestros </span>
            <span className=" bg-gradient-to-r from-orange-600 via-blue-500 to-orange-600 bg-clip-text text-transparent animate-gradient">
              Catálogos
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-600 max-w-5xl leading-relaxed font-light">
            Explora nuestra selección de catálogos especializados para encontrar{" "}
            <span className="font-semibold text-orange-700">
              equipos de protección personal
            </span>{" "}
            y <span className="font-semibold text-blue-700">luminarias</span> de
            la más alta calidad.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-orange-200 rounded-full animate-spin"></div>
              <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="text-xl text-gray-700 font-medium mt-6">
              Cargando catálogos...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-32">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-12 max-w-lg mx-auto shadow-xl">
              <h3 className="text-xl font-bold text-red-800 mb-3">
                Error al cargar catálogos
              </h3>
              <p className="text-red-600 text-sm leading-relaxed">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}

        {/* Catalogos Section */}
        {!loading && result && (
          <div className="relative">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-2 h-12 bg-gradient-to-b from-orange-600 via-blue-600 to-orange-600 rounded-full"></div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {result.length} Catálogos Disponibles
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Explora nuestros catálogos para encontrar exactamente lo que
                    necesitas
                  </p>
                </div>
              </div>
            </div>

            {/* Catalogos Carousel */}
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {result.map((catalogo: any) => {
                  const isElectric = isElectricCatalogo(catalogo);
                  const colorClasses = getColorClasses(catalogo, isElectric);

                  return (
                    <CarouselItem
                      key={catalogo.id}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <Link
                        href={`/catalogo/${catalogo.slug}`}
                        className="block h-full"
                      >
                        <Card className="group h-full  bg-white/90 transition-all duration-500 transform hover:-translate-y-2 rounded-2xl overflow-hidden relative">
                          <CardContent className="p-0 h-full flex flex-col">
                            {/* Catalogo Icon Badge */}
                            <div className="absolute top-4 left-4 z-10">
                              <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
                                {getCatalogoIcon(catalogo.nameCatalogo)}
                              </div>
                            </div>
                            {/* Image Container */}
                            <div className="relative h-56 bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center overflow-hidden">
                              {catalogo.mainImage &&
                              catalogo.mainImage.length > 0 ? (
                                <img
                                  src={`${catalogo.mainImage[0].url}`}
                                  alt={catalogo.nameCatalogo || "Catálogo"}
                                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                />
                              ) : (
                                <div className="text-8xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                                  {isElectric ? "⚡" : "🛡️"}
                                </div>
                              )}
                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                            {/* Content */}
                            <div className="px-6 pt-6 flex flex-col flex-grow">
                              {/* Title */}
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {catalogo.nameCatalogo || "Catálogo"}
                              </h3>
                              {/* Description */}
                              <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow max-h-[60px]">
                                {catalogo.descriptionCatalogo ||
                                  "Explora nuestra selección de productos en este catálogo especializado."}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="bg-white shadow-lg border-0 hover:bg-gray-50" />
                <CarouselNext className="bg-white shadow-lg border-0 hover:bg-gray-50" />
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseCatalogo;
