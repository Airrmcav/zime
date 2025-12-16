"use client";

import { useSearchParams } from "next/navigation";
import { useSearchProducts } from "@/api/searchProducts";
import { Loader2, Search, Package } from "lucide-react";
// Asumiendo que ProductCard es un componente de presentación
import ProductCard from "@/app/(routes)/catalogo/[slug]/components/product.card"; 
import { ProductType } from "@/types/product";

// --- Sub-Componentes para modularidad y legibilidad ---

/**
 * 1. Componente de Estado de Carga
 */
const LoadingState = () => (
  <div className="flex justify-center items-center py-16">
    <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
    <span className="text-xl text-gray-600">Buscando productos...</span>
  </div>
);

/**
 * 2. Componente de Productos no Encontrados
 */
const NoResultsState = ({ query }: { query: string }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50">
    <Package className="h-16 w-16 text-gray-400 mb-4" />
    <h2 className="text-2xl font-semibold text-gray-800">
      No se encontraron productos para "{query}"
    </h2>
    <p className="text-lg text-gray-500 mt-2">
      Intenta con otro término de búsqueda o revisa la ortografía.
    </p>
  </div>
);

/**
 * 3. Componente de Resultado Vacío (Sin búsqueda activa)
 */
const InitialState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <Search className="h-12 w-12 text-gray-400 mb-4" />
    <h2 className="text-xl font-medium text-gray-700">
      Ingresa un término para comenzar tu búsqueda
    </h2>
  </div>
);


// --- Componente Principal ---

export default function SearchPage() {
  const searchParams = useSearchParams();
  // Se obtiene el query. Si no existe, se usa una cadena vacía.
  const query = searchParams.get("q") || ""; 
  
  // Custom hook para la lógica de la API
  const { result, loading } = useSearchProducts(query); 
  
  // Aseguramos que 'products' sea un array para evitar errores de mapeo
  const products: ProductType[] = Array.isArray(result?.products) ? result.products : []; 

  // Determinar el estado para renderizar
  const hasProducts = products.length > 0;
  const isInitialLoad = !query && !loading; // El usuario aún no ha buscado nada

  // --- Renderizado del Layout ---

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      
      {/* 4. Encabezado de la Sección */}
      <header className="mb-8 border-b pb-4">
        <h1 className="flex items-center text-4xl font-bold text-gray-900">
          <Search className="w-8 h-8 mr-3 text-primary" />
          Resultados de búsqueda
        </h1>
        {query && (
          <p className="mt-2 text-xl text-gray-600">
            Mostrando {products.length} resultados para: **"{query}"**
          </p>
        )}
      </header>

      {/* 5. Contenido Dinámico */}
      <section>
        {loading ? (
          <LoadingState /> // Muestra el loader mientras carga
        ) : isInitialLoad ? (
          <InitialState /> // Muestra el estado inicial si no hay query
        ) : hasProducts ? (
          // Vista de resultados
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              // Usar 'id' o 'slug' como key es crucial
              <ProductCard key={product.id || product.slug} product={product} /> 
            ))}
          </div>
        ) : (
          // Vista de no resultados
          <NoResultsState query={query} /> 
        )}
      </section>
      
    </div>
  );
}