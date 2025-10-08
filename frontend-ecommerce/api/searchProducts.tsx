import { useState, useEffect } from 'react';
import { ProductType } from '@/types/product';
import { CategoryType } from '@/types/category';
import { buildApiUrl } from './apiUtils';

interface SearchResult {
  products: ProductType[];
  categories: CategoryType[];
}

// Función para normalizar texto (eliminar acentos, espacios extras y convertir a minúsculas)
export const normalizeText = (text: string): string => {
  return text
    .trim() // Eliminar espacios al inicio y final
    .toLowerCase() // Convertir a minúsculas
    .normalize('NFD') // Normalizar caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos y diacríticos
    .replace(/\s+/g, ' '); // Reemplazar múltiples espacios con uno solo
};

export function useSearchProducts(searchTerm: string) {
  const [result, setResult] = useState<SearchResult>({ products: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Si no hay término de búsqueda, no hacemos nada
    if (!searchTerm || searchTerm.trim() === '') {
      setResult({ products: [], categories: [] });
      setLoading(false);
      return;
    }

    // Normalizar el término de búsqueda para mejorar coincidencias
    const normalizedSearchTerm = normalizeText(searchTerm);
    
    // Construir URLs usando las funciones de utilidad
    const productsUrl = buildApiUrl('products', {
      productName: { $containsi: normalizedSearchTerm }
    });
    
    const productsDescUrl = buildApiUrl('products', {
      description: { $containsi: normalizedSearchTerm }
    });
    
    const categoriesUrl = buildApiUrl('categories', {
      categoryName: { $containsi: normalizedSearchTerm }
    });
    
    const categoriesDescUrl = buildApiUrl('categories', {
      description: { $containsi: normalizedSearchTerm }
    });
    
    // Usar el hook genérico para obtener productos
    const fetchData = async () => {
      setLoading(true);
      try {
        // Obtener productos por nombre
        const productsRes = await fetch(productsUrl);
        const productsJson = await productsRes.json();
        
        // Obtener productos por descripción
        const productsDescRes = await fetch(productsDescUrl);
        const productsDescJson = await productsDescRes.json();
        
        // Obtener categorías por nombre
        const categoriesRes = await fetch(categoriesUrl);
        const categoriesJson = await categoriesRes.json();
        
        // Obtener categorías por descripción
        const categoriesDescRes = await fetch(categoriesDescUrl);
        const categoriesDescJson = await categoriesDescRes.json();
        
        // Combinar resultados de productos (nombre y descripción)
        const allProducts = [...(productsJson.data || [])];
        
        // Añadir productos por descripción evitando duplicados
        if (productsDescJson.data && productsDescJson.data.length > 0) {
          productsDescJson.data.forEach((product: any) => {
            if (!allProducts.some((p: any) => p.id === product.id)) {
              allProducts.push(product);
            }
          });
        }
        
        // Combinar resultados de categorías (nombre y descripción)
        const allCategories = [...(categoriesJson.data || [])];
        
        // Añadir categorías por descripción evitando duplicados
        if (categoriesDescJson.data && categoriesDescJson.data.length > 0) {
          categoriesDescJson.data.forEach((category: any) => {
            if (!allCategories.some((c: any) => c.id === category.id)) {
              allCategories.push(category);
            }
          });
        }
        
        setResult({
          products: allProducts,
          categories: allCategories
        });
        setLoading(false);
      } catch (error: any) {
        console.error("Error searching:", error);
        setError(error);
        setLoading(false);
      }
    };
    
    // Debounce para evitar demasiadas solicitudes mientras el usuario escribe
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return { result, loading, error };
}