import { useFetchAPI, buildApiUrl } from '../apiUtils';

/**
 * Hook para obtener productos destacados de la marca LUMIANCE
 * @returns Resultado de la consulta
 */
export function useGetFeaturedProductsLuminariasLumiance() {
  // Construimos los filtros específicos
  const filters: Record<string, any> = {
    isFeatured: true,
    marca: "LUMIANCE"
  };
  
  // Construimos la URL con los filtros
  const url = buildApiUrl('products', filters, '*');
  
  // Usamos el hook genérico y añadimos console.log para depuración
  const result = useFetchAPI(url, []);
  
  // Depuración para ver qué está devolviendo la API
  // console.log('URL de la petición LUMIANCE:', url);
  // console.log('Resultado LUMIANCE:', result);
  
  return result;
}