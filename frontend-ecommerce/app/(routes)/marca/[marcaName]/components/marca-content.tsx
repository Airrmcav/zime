"use client";

import { useGetProductsByMarcaName } from "@/api/getProductsByMarcaName";
import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Heart, CheckCircle, XCircle, Shield, Zap } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { Badge } from "@/components/ui/badge";

interface MarcaContentProps {
  marcaName: string;
}

export default function MarcaContent({ marcaName }: MarcaContentProps) {
  const { loading, result, error } = useGetProductsByMarcaName(marcaName);
  const [products, setProducts] = useState<ProductType[]>([]);
  const cart = useCart();
  const lovedProducts = useLovedProducts();

  useEffect(() => {
    if (result && Array.isArray(result)) {
      console.log(`Productos ${marcaName} recibidos:`, result);
      setProducts(result as ProductType[]);
    }
  }, [result, marcaName]);

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

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <Link
            href="/luminarias"
            className="inline-flex items-center text-white mb-6 hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Luminarias
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-4">Productos {marcaName}</h1>
              <p className="text-blue-100 text-lg max-w-3xl">
                {result && Array.isArray(result) && result.length > 0 &&
                  (result[0] as ProductType).marcaProduct?.descriptionMarca ||
                  `Descubre nuestra selección completa de productos ${marcaName}. Calidad y rendimiento garantizado para profesionales y empresas.`}
              </p>
            </div>
            {result && Array.isArray(result) && result.length > 0 &&
              (result[0] as ProductType).marcaProduct?.mainImage && (
                <div className="w-full md:w-1/3 flex justify-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${(result[0] as ProductType).marcaProduct?.mainImage?.url || ''}`}
                    alt={`Logo ${marcaName}`}
                    className="max-h-48 object-contain bg-white p-4 rounded-lg shadow-lg"
                  />
                </div>
              )}
          </div>
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
              <div key={product.id} className="group h-full hover:shadow-2xl shadow-md transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden rounded-xl border border-gray-100">
                <Link href={`/producto/${product.slug || product.id}`}>
                  <div className="relative">
                    {/* Image */}
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${product.images[0].url || ''}`}
                          alt={product.productName || `Producto ${marcaName}`}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400">Sin imagen</span>
                        </div>
                      )}
                    </div>

                    {/* Status Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.active ? (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          En Stock
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="h-3 w-3 mr-1" />
                          Agotado
                        </Badge>
                      )}
                      {product.catalogo && (
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                          {product.catalogo.slug === 'material-electrico' ? (
                            <Zap className="h-3 w-3 mr-1" />
                          ) : (
                            <Shield className="h-3 w-3 mr-1" />
                          )}
                          {product.catalogo.nameCatalogo}
                        </Badge>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleLoved(product);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <Heart
                        className={`h-5 w-5 ${lovedProducts.isItemLoved(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                          }`}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.productName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description || `Producto de alta calidad de ${marcaName}`}
                    </p>
                    <div className="flex items-center justify-between">
                      {product.price && product.price > 0.00 && (
                        <div className="mb-4">
                          <span className={`text-2xl font-bold  ? 'text-blue-600' : 'text-blue-600'
                            }`}>
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">MXN</span>
                        </div>
                      )}
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={!product.active}
                        className={`p-2 rounded-full ${product.active
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700">No se encontraron productos</h2>
            <p className="text-gray-500 mt-2">
              No hay productos disponibles para la marca {marcaName} en este momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}