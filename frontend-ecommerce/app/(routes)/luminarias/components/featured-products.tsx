"use client";

import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types/product";
import { CheckCircle, XCircle, Star, Heart, ShoppingCart, Maximize2, Zap, Shield } from "lucide-react";
import IconButton from "@/components/icon-button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

type FeaturedProductProps = {
  products: ProductType[];
};

const FeaturedProducts = ({ products = [] }: FeaturedProductProps) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { addLoveItems } = useLovedProducts();

  // Detectar si es material eléctrico
  const isMaterialElectrico = (product: ProductType) => {
    return product.catalogo?.slug === "material-electrico" ||
      product?.category?.categoryName?.toLowerCase().includes("eléctrico") ||
      product?.category?.categoryName?.toLowerCase().includes("electrico");
  };

  const handleCardClick = (product: ProductType) => {
    if (product.slug === "productos-destacados") {
      router.push(`/productos-destacados`);
    } else {
      router.push(`/${product.slug}`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleAddToFavorites = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    addLoveItems(product);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group">
          <div
            className="h-full bg-white  overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCardClick(product)}
          >
            <div className="h-full flex flex-col">
              {/* Image and Badges */}
              <div className="relative overflow-hidden bg-white h-64">
                {/* Image */}
                {product.images && product.images[0] ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`}
                    alt={product.productName}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}

                {/* Action Icons */}
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <div onClick={(e) => {
                    e.stopPropagation();
                    addLoveItems(product);
                  }}>
                    <IconButton
                      onClick={() => {}}
                      icon={<Heart className="w-4 h-4" />}
                      className="bg-white shadow-sm hover:bg-red-50 hover:text-red-500"
                    />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <IconButton
                      onClick={() => {}}
                      icon={<Maximize2 className="w-4 h-4" />}
                      className="bg-white shadow-sm hover:bg-blue-50 hover:text-blue-500"
                    />
                  </div>
                </div>

                {/* Availability Badge */}
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
                    className={`${isMaterialElectrico(product)
                      ? "bg-blue-600"
                      : "bg-orange-600"
                      } text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5`}
                  >
                    {isMaterialElectrico(product) ? (
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
                <h2 className={`font-bold text-lg mb-2 line-clamp-2 transition-colors duration-200 min-h-[56px] flex items-start ${isMaterialElectrico(product) ? 'text-blue-600' : 'text-orange-600'}`}>
                  {product.productName}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
                  {product.description || "Equipo médico de alta calidad diseñado para proporcionar resultados precisos y confiables en entornos clínicos profesionales."}
                </p>

                {/* Price */}
                {product.price && product.price > 0.00 && (
                  <div className="mb-4">
                    <span className={`text-2xl font-bold ${isMaterialElectrico(product) ? 'text-blue-600' : 'text-blue-600'}`}>
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
      ))}
    </div>
  );
};

export default FeaturedProducts;