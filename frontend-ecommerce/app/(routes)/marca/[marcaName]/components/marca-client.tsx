"use client";

import { useGetProductsByMarcaName } from "@/api/getProductsByMarcaName";
import { ProductType } from "@/types/product";
import { useEffect, useState, memo } from "react";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  CheckCircle,
  Maximize2,
  XCircle,
  Shield,
  Zap,
  Lightbulb,
  Award,
  Star,
  TrendingUp,
  Package,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge";
import IconButton from "@/components/icon-button";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


interface MarcaClientProps {
  marcaName: string;
}

// Definimos el componente
function MarcaClientBase({ marcaName }: MarcaClientProps) {
  const { loading, result, error } = useGetProductsByMarcaName(marcaName);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<ProductType[]>([]);
  const productsPerPage = 12;
  const cart = useCart();
  const router = useRouter();
  const lovedProducts = useLovedProducts();
  const { addLoveItems } = useLovedProducts();

  // Usamos useEffect con una mejor gestión de dependencias
  useEffect(() => {
    if (result && Array.isArray(result)) {
      console.log(`Productos recibidos:`, result);
      setProducts(result as ProductType[]);
    }
  }, [result]);

  // Efecto para manejar la paginación
  useEffect(() => {
    if (products.length > 0) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      setDisplayedProducts(products.slice(startIndex, endIndex));
    }
  }, [currentPage, products]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addToCart = (product: ProductType) => {
    cart.addItem(product);
  };

  const handleCardClick = (product: ProductType) => {
    if (product.slug === "productos-destacados") {
      router.push(`/productos-destacados`);
    } else {
      router.push(`/${product.slug}`);
    }
  };

  const toggleLoved = (product: ProductType) => {
    lovedProducts.toggleLoveItem(product);
  };

  const handleAddToFavorites = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    addLoveItems(product);
  };

  const handleMaximize = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    handleCardClick(product);
  };

  const handleAddToCart = (e: React.MouseEvent, product: ProductType) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.active) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Header Mejorado */}
      <div className="relative bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 overflow-hidden">
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 py-12 px-4">
          <Link
            href="/luminarias"
            className="inline-flex items-center text-white mb-8 hover:translate-x-1 transition-transform duration-200 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Luminarias
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <Lightbulb className="w-10 h-10 text-white" />
                <h1 className="text-5xl font-bold text-white">
                  Productos {marcaName}
                </h1>
              </div>

              <p className="text-amber-50 text-lg max-w-3xl mb-6 leading-relaxed">
                {result && Array.isArray(result) && result.length > 0 &&
                  (result[0] as ProductType).marcaProduct?.descriptionMarca ||
                  `Descubre nuestra selección completa de productos ${marcaName}. Calidad y rendimiento garantizado para profesionales y empresas.`}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-3 border border-white/30">
                  <div className="flex items-center gap-2 text-white">
                    <Package className="w-5 h-5" />
                    <span className="font-bold text-2xl">{products.length}</span>
                    <span className="text-amber-50">Productos</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-3 border border-white/30">
                  <div className="flex items-center gap-2 text-white">
                    <Award className="w-5 h-5" />
                    <span className="font-bold text-2xl">100%</span>
                    <span className="text-amber-50">Calidad</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-3 border border-white/30">
                  <div className="flex items-center gap-2 text-white">
                    <Zap className="w-5 h-5" />
                    <span className="font-bold text-2xl">LED</span>
                    <span className="text-amber-50">Tecnología</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo de la marca */}
            {result && Array.isArray(result) && result.length > 0 &&
              (result[0] as ProductType).marcaProduct?.mainImage && (
                <div className="w-full lg:w-1/3 flex justify-center">
                  <div className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-white/50 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${(result[0] as ProductType).marcaProduct?.mainImage?.url || ''}`}
                      alt={`Logo ${marcaName}`}
                      className="max-h-48 w-full object-contain"
                    />
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Barra de características */}
      <div className="bg-white border-y border-gray-200 py-4">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Shield className="w-4 h-4 text-amber-500" />
              <span className="font-medium">Garantía Oficial</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="font-medium">Ahorro Energético</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="font-medium">Calidad Certificada</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="font-medium">Mejor Precio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto max-w-7xl py-16 px-4 ">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(products.length || 4)].map((_, i) => (
              <div key={i} className="bg-transparent p-4 h-[480px] animate-pulse"></div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-blue-500" />
                  Catálogo Completo
                </h2>
                <p className="text-gray-600 mt-2">
                  Explora {result && Array.isArray(result) ? result.length : products.length} productos disponibles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group h-full hover:shadow-2xl shadow-md transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden "
                >
                  <Link href={`/${product.slug || product.id}`}>
                    <div className="relative">
                      {/* Image */}
                      <div className="aspect-square relative overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={`${product.images[0].url || ''}`}
                            alt={product.productName || `Producto ${marcaName}`}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                            <Lightbulb className="w-16 h-16 text-blue-300 mb-2" />
                            <span className="text-gray-400">Sin imagen</span>
                          </div>
                        )}
                      </div>

                      <div
                        onClick={(e) => handleAddToFavorites(e, product)}
                        className="absolute top-0 right-0 z-10"
                      >
                        <IconButton
                          onClick={() => { }}
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
                          onClick={() => { }}
                          icon={<Maximize2 className="w-4 h-4 text-gray-800 hover:text-blue-500 transition-colors" />}
                          className="p-2 bg-gray-200 transition-all duration-200 group-hover:opacity-100 rounded-none"
                          aria-label="Ver producto"
                          title="Ver producto"
                        />
                      </div>

                      {/* Badges */}
                      <div className="absolute top-2 left-2">
                        <Badge
                          className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${product.active
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                            }`}
                        >
                          {product.active ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {product.active ? "En Stock" : "No Disponible"}
                        </Badge>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute bottom-2 left-2">
                        <Badge
                          className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                        >
                          <Shield className="w-3 h-3" />
                          {product?.category?.categoryName || "Categoría"}
                        </Badge>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col min-h-[220px]">
                    <Link href={`/producto/${product.slug || product.id}`}>
                      <h2 className="font-bold text-lg mb-2 line-clamp-2 transition-colors duration-200 min-h-[56px] flex items-start text-blue-600 hover:text-blue-700">
                        {product.productName || `Producto ${marcaName}`}
                      </h2>
                    </Link>

                    <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
                      {product.description || "Producto de alta calidad diseñado para proporcionar resultados precisos y confiables."}
                    </p>

                    {/* Price */}
                    {product.price && product.price > 0.00 && (
                      <div className="mb-4">
                        <span className={`text-2xl font-bold  text-orange-500 ? 'text-blue-600' : 'text-blue-600'
                      }`}>
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">MXN</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (product.active) {
                            addToCart(product);
                          }
                        }}
                        className={`cursor-pointer flex-1 flex items-center justify-center gap-3 py-2.5 px-3 rounded-lg font-medium text-sm transition-all duration-200 z-10 relative ${product.active
                          ? "bg-black hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        disabled={!product.active}
                        aria-label={`Agregar ${product.productName} al carrito`}
                      >
                        Agregar al carrito <ShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles de paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                {/* Botón anterior */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`cursor-pointer p-2 rounded-lg transition-all duration-200 ${currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 shadow-sm hover:shadow-md'
                    }`}
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Números de página */}
                <div className="flex items-center gap-1">
                  {(() => {
                    const pages = [];
                    const showPages = 5; // Número de páginas a mostrar
                    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
                    let endPage = Math.min(totalPages, startPage + showPages - 1);

                    // Ajustar si estamos cerca del final
                    if (endPage - startPage < showPages - 1) {
                      startPage = Math.max(1, endPage - showPages + 1);
                    }

                    // Primera página
                    if (startPage > 1) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => {
                            setCurrentPage(1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="cursor-pointer min-w-[40px] h-10 px-3 rounded-lg bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                        >
                          1
                        </button>
                      );

                      if (startPage > 2) {
                        pages.push(
                          <span key="dots-start" className="px-2 text-gray-400">
                            •••
                          </span>
                        );
                      }
                    }

                    // Páginas del rango
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => {
                            setCurrentPage(i);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`cursor-pointer min-w-[40px] h-10 px-3 rounded-lg transition-all duration-200 font-medium ${currentPage === i
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-110'
                            : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 shadow-sm hover:shadow-md'
                            }`}
                        >
                          {i}
                        </button>
                      );
                    }

                    // Última página
                    if (endPage < totalPages) {
                      if (endPage < totalPages - 1) {
                        pages.push(
                          <span key="dots-end" className="px-2 text-gray-400">
                            •••
                          </span>
                        );
                      }

                      pages.push(
                        <button
                          key={totalPages}
                          onClick={() => {
                            setCurrentPage(totalPages);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="cursor-pointer min-w-[40px] h-10 px-3 rounded-lg bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                        >
                          {totalPages}
                        </button>
                      );
                    }

                    return pages;
                  })()}
                </div>

                {/* Botón siguiente */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`cursor-pointer p-2 rounded-lg transition-all duration-200 ${currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 shadow-sm hover:shadow-md'
                    }`}
                  aria-label="Página siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-100 rounded-full mb-6">
              <Lightbulb className="w-12 h-12 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              No hay productos disponibles de {marcaName} en este momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Exportamos el componente con memo para evitar renderizados innecesarios
export default memo(MarcaClientBase);