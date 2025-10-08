"use client";

import { ProductType } from "@/types/product";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { Heart } from "lucide-react";

interface ProductListProps {
  products: ProductType[];
}

export default function ProductList({ products }: ProductListProps) {
  const cart = useCart();
  const lovedProducts = useLovedProducts();

  const handleAddToCart = (product: ProductType) => {
    cart.addItem(product);
  };

  const handleAddToFavorites = (product: ProductType) => {
    lovedProducts.addLoveItems(product);
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-lg text-gray-500">No hay productos disponibles en este catálogo</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <div className="relative aspect-square">
            <Link href={`/product/${product.slug}`}>
       
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${product.images[0].url}`}
                  alt={product.productName}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              
            </Link>
            <button
              onClick={() => handleAddToFavorites(product)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:scale-110 transition"
            >
              <Heart
                className={lovedProducts.lovedItems.some(item => item.id === product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}
                size={20}
              />
            </button>
          </div>
          <div className="p-4">
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-semibold text-lg truncate">{product.productName}</h3>
            </Link>
            <p className="text-gray-600 mt-1 text-sm truncate">{product.category?.categoryName || ''}</p>
            <div className="flex items-center justify-between mt-2">
              {/* <p className="font-bold">{formatPrice(product.price)}</p> */}
              <Button
                onClick={() => handleAddToCart(product)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Agregar
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}