"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/types/product';
import { useCart } from '@/hooks/use-cart';
import { useLovedProducts } from '@/hooks/use-loved-products';
import { formatPrice } from '@/lib/formatPrice';
import { CheckCircle, XCircle, Heart, ShoppingCart, Maximize2, Zap, Shield, Sparkles } from 'lucide-react';
import IconButton from '@/components/icon-button';
import { Badge } from '@/components/ui/badge';

interface RelatedProductsProps {
  currentProduct: ProductType;
  catalogSlug: string;
}

export default function RelatedProducts({ currentProduct, catalogSlug }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addItem } = useCart();
  const { addLoveItems } = useLovedProducts();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const encodedCatalog = encodeURIComponent(catalogSlug);
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[catalogo][slug][$eq]=${encodedCatalog}&pagination[limit]=4`;

        const res = await fetch(url);
        const json = await res.json();

        const filtered = json.data
          .filter((product: ProductType) => product.id !== currentProduct.id)
          .slice(0, 4);

        setRelatedProducts(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching related products:', error);
        setLoading(false);
      }
    };

    if (currentProduct && catalogSlug) {
      fetchRelatedProducts();
    }
  }, [currentProduct, catalogSlug]);

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

  if (loading) {
    return <RelatedProductsSkeleton />;
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 bg-transparent  overflow-hidden">
      <div className="border-b border-gray-200 pb-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Productos Relacionados
          </h2>
        </div>
        <p className="text-gray-600 text-sm ml-13">
          Otros productos que podrían interesarte
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="relative p-0 transition-all cursor-pointer"
              onClick={() => handleCardClick(product)}
            >
              <div className="w-full">
                <div className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 py-1 px-0">
                  <div className="group h-full border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden">
                    <div className="p-0 h-full flex flex-col">
                      <div className="relative overflow-hidden bg-white h-52 flex items-center justify-center">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={`${product.images[0].url}`}
                            alt={product.images[0].alternativeText || product.productName}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-4xl">🏥</span>
                          </div>
                        )}

                        {/* Availability Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant={product.active ? "default" : "secondary"}
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

                        {/* Favorite Button */}
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

                        {/* Maximize Button */}
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

                        {/* Category Badge */}
                        <div className="absolute bottom-3 left-3">
                          <Badge className={`${product.catalogo.slug === "material-electrico" 
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-orange-600 hover:bg-orange-700'
                            } text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5`}>
                            {product.catalogo.slug === "material-electrico" ? (
                              <Zap className="w-3 h-3" />
                            ) : (
                              <Shield className="w-3 h-3" />
                            )}
                            {product?.category?.categoryName || "Categoría"}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col min-h-[220px]">
                        <h2 className={`font-bold text-lg mb-2 line-clamp-2 transition-colors duration-200 min-h-[56px] flex items-start ${product.catalogo.slug === "material-electrico"
                            ? 'text-blue-600'
                            : 'text-orange-600'
                          }`}>
                          {product.productName}
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
                          {product.description || "Equipo médico de alta calidad diseñado para proporcionar resultados precisos y confiables en entornos clínicos profesionales."}
                        </p>

                        {/* Price */}
                        {product.price && product.price > 0.00 && (
                          <div className="mb-4">
                            <span className="text-2xl font-bold text-blue-600">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">MXN</span>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-auto">
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente de esqueleto para mostrar durante la carga
function RelatedProductsSkeleton() {
  return (
    <div className="mt-12 bg-white rounded-3xl shadow-lg border border-slate-200/50 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 p-8 text-white">
        <div className="h-8 w-64 bg-white/20 rounded-md animate-pulse"></div>
        <div className="h-4 w-48 bg-white/10 rounded-md animate-pulse mt-2"></div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-52 bg-slate-100 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-slate-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 bg-slate-100 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 bg-slate-100 rounded-md animate-pulse mb-4 w-3/4"></div>
                <div className="h-8 bg-slate-200 rounded-md animate-pulse mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}