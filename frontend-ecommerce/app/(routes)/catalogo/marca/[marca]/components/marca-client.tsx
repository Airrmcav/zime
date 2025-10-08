"use client";

import { useGetProductsByBrand } from "@/api/getProductsByBrand";
import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

interface MarcaClientProps {
  marca: string;
}

export default function MarcaClient({ marca }: MarcaClientProps) {
  const { loading, result, error } = useGetProductsByBrand(marca);
  const [products, setProducts] = useState<ProductType[]>([]);
  const cart = useCart();
  const lovedProducts = useLovedProducts();
    const { addLoveItems } = useLovedProducts();
  const formattedMarca = marca.charAt(0).toUpperCase() + marca.slice(1).toLowerCase();

  useEffect(() => {
    if (result && Array.isArray(result)) {
      console.log(`Productos ${formattedMarca} recibidos:`, result);
      console.log("Estructura de datos completa:", JSON.stringify(result, null, 2));
      setProducts(result);
    }
  }, [result, formattedMarca]);

  const addToCart = (product: ProductType) => {
    cart.addItem(product);
  };
  const handleAddToFavorites = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    addLoveItems(product);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <Link
            href="/catalogo"
            className="inline-flex items-center text-white mb-6 hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Catálogo
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Productos {formattedMarca}</h1>
          <p className="text-orange-100 text-lg max-w-3xl">
            Descubre nuestra selección completa de productos {formattedMarca}. Calidad y rendimiento garantizado para profesionales y empresas.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto max-w-7xl py-12 px-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4 h-80 animate-pulse"></div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <Link href={`/producto/${product.slug || product.id}`}>
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${product.images[0].url || ''}`}
                        alt={product.productName || `Producto ${formattedMarca}`}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">Sin imagen</span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/producto/${product.slug || product.id}`}>
                    <h3 className="font-semibold text-gray-800 mb-2 hover:text-orange-600 transition-colors">
                      {product.productName || `Producto ${formattedMarca}`}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-3">
                    {product.category?.categoryName || "Categoría"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price || 0)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleAddToFavorites(e, product)}
                        className={`p-2 rounded-full
                            ? "bg-red-50 text-red-500"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No se encontraron productos</h3>
            <p className="text-gray-500 mt-2">
              No hay productos disponibles de {formattedMarca} en este momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}