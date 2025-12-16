"use client"
import { useEffect, useState } from "react";
import { useSearchProducts } from "@/api/searchProducts";
import { Loader2, Search, Package } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import ProductCard from "@/app/(routes)/catalogo/[slug]/components/product.card";
import { ProductType } from "@/types/product";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  q: string;
  initialPage?: number;
};

export default function SearchClient({ q, initialPage = 1 }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { result, loading } = useSearchProducts(q);
  const products: ProductType[] = Array.isArray(result?.products) ? result.products : [];

  const [currentPage, setCurrentPage] = useState(initialPage);
  const productsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage));
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [q]);

  useEffect(() => {
    if (!pathname) return;
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("page", String(currentPage));
    router.replace(`${pathname}?${params.toString()}`);
  }, [currentPage, pathname, q, router]);

  const hasProducts = products.length > 0;
  const isInitialLoad = !q && !loading;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
        <span className="text-xl text-gray-600">Buscando productos...</span>
      </div>
    );
  }

  if (isInitialLoad) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Search className="h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-medium text-gray-700">Ingresa un término para comenzar tu búsqueda</h2>
      </div>
    );
  }

  if (!hasProducts) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50">
        <Package className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">No se encontraron productos para "{q}"</h2>
        <p className="text-lg text-gray-500 mt-2">Intenta con otro término de búsqueda o revisa la ortografía.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </>
  );
}

