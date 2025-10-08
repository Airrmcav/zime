import { useFetchAPI, buildApiUrl } from './apiUtils';

/**
 * Hook para obtener productos destacados por catálogo
 * @param catalogSlug Slug del catálogo (opcional)
 * @returns Resultado de la consulta
 */
export function useGetFeaturedProducts(catalogSlug?: string) {
  // Construimos los filtros base
  const filters: Record<string, any> = {
    isFeatured: true
  };
  
  // Si se proporciona un catálogo, añadimos el filtro
  if (catalogSlug) {
    filters.catalogo = {
      slug: { $eq: catalogSlug }
    };
  }
  
  // Construimos la URL con los filtros
  const url = buildApiUrl('products', filters);
  
  // Usamos el hook genérico
  return useFetchAPI(url, [catalogSlug]);
}