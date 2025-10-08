import { useFetchAPI, buildApiUrl } from '../apiUtils';

/**
 * Hook para obtener productos destacados de la marca PHILCO
 * @returns Resultado de la consulta
 */
export function useGetFeaturedProductsLuminariasPhilco() {
  // Construimos los filtros específicos
  const filters: Record<string, any> = {
    isFeatured: true,
    catalogo: {
      slug: { $eq: "material-electrico" }
    },
    marca: { $eq: "PHILCO" }
  };
  
  // Construimos la URL con los filtros
  const url = buildApiUrl('products', filters);
  
  // Usamos el hook genérico
  return useFetchAPI(url, []);
}