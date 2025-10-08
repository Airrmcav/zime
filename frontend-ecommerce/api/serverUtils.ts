/**
 * Versión para servidor de las utilidades de API
 */

/**
 * Construye una URL para la API con filtros (igual que en apiUtils.ts)
 */
export function buildApiUrl(endpoint: string, filters: Record<string, any> = {}, populate: string = '*') {
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${endpoint}`;
  
  // Construir query params
  const queryParams = new URLSearchParams();
  
  // Añadir populate
  if (populate) {
    queryParams.append('populate', populate);
  }
  
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

/**
 * Función para realizar peticiones a la API desde el servidor
 */
export async function fetchAPIServer(url: string) {
  if (!url) {
    return { data: null, error: null };
  }

  try {
    const res = await fetch(url);
    const json = await res.json();
    return { data: json.data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}