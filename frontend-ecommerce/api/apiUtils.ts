import { useState, useEffect } from 'react';

/**
 * Hook genérico para realizar peticiones a la API
 * @param url URL de la petición
 * @param dependencies Dependencias adicionales para el useEffect
 * @returns Objeto con resultado, estado de carga y error
 */
export function useFetchAPI(url: string, dependencies: any[] = []) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) {
      setResult(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(json.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, ...dependencies]);

  return { result, loading, error };
}

/**
 * Construye una URL para la API con filtros
 * @param endpoint Endpoint de la API
 * @param filters Objeto con los filtros a aplicar
 * @param populate Campos a popular
 * @returns URL completa
 */
export function buildApiUrl(endpoint: string, filters: Record<string, any> = {}, populate: string = '*', pageSize: number = 100) {
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${endpoint}`;  
  
  // Construir query params
  const queryParams = new URLSearchParams();
  
  // Añadir populate
  if (populate) {
    queryParams.append('populate', populate);
  }
  
  // Añadir parámetro de paginación para mostrar más resultados
  queryParams.append('pagination[pageSize]', String(pageSize));
  
  // Añadir filtros
  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      // Filtros complejos como [category][categoryName][$eq]
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (typeof subValue === 'object' && subValue !== null) {
          // Operadores como $eq, $ne, etc.
          Object.entries(subValue).forEach(([operator, opValue]) => {
            queryParams.append(`filters[${key}][${subKey}][${operator}]`, String(opValue));
          });
        } else {
          queryParams.append(`filters[${key}][${subKey}]`, String(subValue));
        }
      });
    } else if (value !== undefined && value !== null) {
      // Filtros simples
      queryParams.append(`filters[${key}][$eq]`, String(value));
    }
  });
  
  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}