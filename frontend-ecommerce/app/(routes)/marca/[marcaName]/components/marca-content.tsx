"use client";

import { useGetProductsByMarcaName } from "@/api/getProductsByMarcaName";
import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";
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
  Filter as FilterIcon,
  X,
  Lightbulb,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { Badge } from "@/components/ui/badge";
import IconButton from "@/components/icon-button";
import { useRouter } from "next/navigation";
import FilterCategory from "@/components/filters/filter-category";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MarcaContentProps {
  marcaName: string;
}

export default function MarcaContent({ marcaName }: MarcaContentProps) {
  const { loading, result, error } = useGetProductsByMarcaName(marcaName);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<ProductType[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const cart = useCart();
  const router = useRouter();
  const lovedProducts = useLovedProducts();
  const { addLoveItems } = useLovedProducts();

  useEffect(() => {
    if (result && Array.isArray(result)) {
      console.log(`Productos ${marcaName} recibidos:`, result);
      // Solo actualizar si realmente hay cambios
      setProducts((prevProducts) => {
        // Si el número de productos es diferente, actualizar
        if (prevProducts.length !== result.length) {
          return result as ProductType[];
        }
        // Si tienen la misma longitud pero diferente contenido, actualizar
        const hasChanged = result.some(
          (product: any, index) => prevProducts[index]?.id !== product.id,
        );
        if (hasChanged) {
          return result as ProductType[];
        }
        // Si no hay cambios, mantener el estado anterior
        return prevProducts;
      });
    }
  }, [result, marcaName]);

  // Apply filters whenever filter state changes
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (filterCategory) {
      filtered = filtered.filter((product) => {
        return product.category?.categoryName === filterCategory;
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filterCategory, products]);

  // Pagination effect
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
    }
  }, [currentPage, filteredProducts]);

  const addToCart = (product: ProductType) => {
    cart.addItem(product);
  };

  const toggleLoved = (product: ProductType) => {
    lovedProducts.toggleLoveItem(product);
  };

  const handleAddToCart = (e: React.MouseEvent, product: ProductType) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.active) {
      addToCart(product);
    }
  };

  const handleCardClick = (product: ProductType) => {
    if (product.slug === "productos-destacados") {
      router.push(`/productos-destacados`);
    } else {
      router.push(`/${product.slug}`);
    }
  };

  const handleAddToFavorites = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    addLoveItems(product);
  };

  const handleMaximize = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    handleCardClick(product);
  };

  const clearFilters = () => {
    setFilterCategory("");
  };

  const hasActiveFilters = filterCategory;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-500 to-blue-600 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link
            href="/luminarias"
            className="inline-flex items-center text-white mb-6 hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Luminarias
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-4">
                Productos {marcaName}
              </h1>
              <p className="text-blue-100 text-lg max-w-3xl">
                {(result &&
                  Array.isArray(result) &&
                  result.length > 0 &&
                  (result[0] as ProductType).marcaProduct?.descriptionMarca) ||
                  `Descubre nuestra selección completa de productos ${marcaName}. Calidad y rendimiento garantizado para profesionales y empresas.`}
              </p>
            </div>
            {result &&
              Array.isArray(result) &&
              result.length > 0 &&
              (result[0] as ProductType).marcaProduct?.mainImage && (
                <div className="w-full md:w-1/3 flex justify-center">
                  <img
                    src={`${(result[0] as ProductType).marcaProduct?.mainImage?.url || ""}`}
                    alt={`Logo ${marcaName}`}
                    className="max-h-48 object-contain bg-white p-4 rounded-lg shadow-lg"
                  />
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Main Content with Filters */}
      <div className="container mx-auto max-w-7xl py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-3 space-y-4">
              {/* Filter Header */}
              <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <FilterIcon className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Filtros</h2>
                </div>
                <p className="text-blue-100 text-sm">
                  Refina tu búsqueda según tus necesidades
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 w-full cursor-pointer bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Limpiar filtros
                  </button>
                )}
              </div>

              {/* Filter Components */}
              <FilterCategory
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                theme="blue"
                products={products}
              />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FilterIcon className="w-5 h-5" />
              {showMobileFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
              {hasActiveFilters && (
                <Badge className="ml-2 bg-white text-blue-600">1</Badge>
              )}
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          {showMobileFilters && (
            <div className="lg:hidden mb-6 space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Limpiar filtros
                  </button>
                )}
                <FilterCategory
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  theme="blue"
                  products={products}
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Counter */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {loading ? (
                  "Cargando productos..."
                ) : (
                  <>
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1 ? "Producto" : "Productos"}
                    {hasActiveFilters && (
                      <span className="text-blue-600"> (Filtrados)</span>
                    )}
                  </>
                )}
              </h3>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded-lg p-4 h-80 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : displayedProducts && displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {displayedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group h-full hover:shadow-2xl shadow-md transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden"
                    >
                      <Link href={`/${product.slug || product.id}`}>
                        <div className="relative">
                          {/* Image */}
                          <div className="aspect-square relative overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={`${product.images[0].url || ""}`}
                                alt={
                                  product.productName || `Producto ${marcaName}`
                                }
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-amber-50 to-orange-50">
                                <Lightbulb className="w-16 h-16 text-blue-300 mb-2" />
                                <span className="text-gray-400">
                                  Sin imagen
                                </span>
                              </div>
                            )}
                          </div>

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

                          {/* Badges */}
                          <div className="absolute top-2 left-2">
                            <Badge
                              className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${
                                product.active
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
                            <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
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
                          {product.description ||
                            "Producto de alta calidad diseñado para proporcionar resultados precisos y confiables."}
                        </p>

                        {/* Price */}
                        {product.price && product.price > 0.0 && (
                          <div className="mb-4">
                            <span
                              className={`text-2xl font-bold  text-orange-500 ? 'text-blue-600' : 'text-blue-600'
                        }`}
                            >
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">
                              MXN
                            </span>
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
                            className={`cursor-pointer flex-1 flex items-center justify-center gap-3 py-2.5 px-3 rounded-lg font-medium text-sm transition-all duration-200 z-10 relative ${
                              product.active
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
                      className={`cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md"
                      }`}
                      aria-label="Página anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Números de página */}
                    <div className="flex items-center gap-1">
                      {(() => {
                        const pages = [];
                        const showPages = 5;
                        let startPage = Math.max(
                          1,
                          currentPage - Math.floor(showPages / 2),
                        );
                        let endPage = Math.min(
                          totalPages,
                          startPage + showPages - 1,
                        );

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
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="cursor-pointer min-w-[40px] h-10 px-3 rounded-lg bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                            >
                              1
                            </button>,
                          );

                          if (startPage > 2) {
                            pages.push(
                              <span
                                key="dots-start"
                                className="px-2 text-gray-400"
                              >
                                •••
                              </span>,
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
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`cursor-pointer min-w-[40px] h-10 px-3 rounded-lg transition-all duration-200 font-medium ${
                                currentPage === i
                                  ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-110"
                                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md"
                              }`}
                            >
                              {i}
                            </button>,
                          );
                        }

                        // Última página
                        if (endPage < totalPages) {
                          if (endPage < totalPages - 1) {
                            pages.push(
                              <span
                                key="dots-end"
                                className="px-2 text-gray-400"
                              >
                                •••
                              </span>,
                            );
                          }

                          pages.push(
                            <button
                              key={totalPages}
                              onClick={() => {
                                setCurrentPage(totalPages);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="cursor-pointer min-w-[40px] h-10 px-3 rounded-lg bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                            >
                              {totalPages}
                            </button>,
                          );
                        }

                        return pages;
                      })()}
                    </div>

                    {/* Botón siguiente */}
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md"
                      }`}
                      aria-label="Página siguiente"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-gray-200 rounded-2xl flex items-center justify-center">
                    <FilterIcon className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-700">
                  No se encontraron productos
                </h2>
                <p className="text-gray-500 mt-2">
                  {hasActiveFilters
                    ? "Intenta ajustar los filtros para ver más resultados"
                    : `No hay productos disponibles para la marca ${marcaName} en este momento.`}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
