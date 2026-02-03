import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types/product";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  Star,
  Heart,
  ShoppingCart,
  Maximize2,
  Zap,
  Shield,
} from "lucide-react";
import IconButton from "@/components/icon-button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

type ProductCardProps = {
  product: ProductType;
  viewMode?: "grid" | "list";
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const router = useRouter();
  const { addItem, items } = useCart();
  const { addLoveItems } = useLovedProducts();

  const isMaterialElectrico =
    product.catalogo.slug === "luminarias" ||
    product?.catalogo?.slug === "luminarias" ||
    product?.category?.categoryName?.toLowerCase().includes("eléctrico") ||
    product?.category?.categoryName?.toLowerCase().includes("electrico");

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

  const handleMaximize = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    handleCardClick(product);
  };

  return (
    <div
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
                    alt={
                      product.images[0].alternativeText || product.productName
                    }
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

                <div className="absolute bottom-3 left-3">
                  <Badge
                    className={`${
                      isMaterialElectrico
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-orange-600 hover:bg-orange-700"
                    } text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5`}
                  >
                    {isMaterialElectrico ? (
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
                <h2
                  className={`font-bold text-lg mb-2 line-clamp-2  transition-colors duration-200 min-h-[56px] flex items-start ${
                    isMaterialElectrico ? "text-blue-600" : "text-orange-600"
                  }`}
                >
                  {product.productName}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
                  {product.description ||
                    "Equipo médico de alta calidad diseñado para proporcionar resultados precisos y confiables en entornos clínicos profesionales."}
                </p>

                {/* Price */}
                {product.price && product.price > 0.0 && (
                  <div className="mb-4">
                    <span
                      className={`text-2xl font-bold ${
                        isMaterialElectrico ? "text-blue-600" : "text-blue-600"
                      }`}
                    >
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">MXN</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
