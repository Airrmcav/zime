import { useFetchAPI, buildApiUrl } from '../apiUtils';

/**
 * Hook para obtener productos destacados de la marca TECNOLED
 * @returns Resultado de la consulta
 */
export function useGetFeaturedProductsLuminariasPhilco() {
  // Construimos los filtros específicos
  const filters: Record<string, any> = {
    isFeatured: true,
    marca: "TECNOLED"
  };
  
  // Construimos la URL con los filtros
  const url = buildApiUrl('products', filters, '*');
  
  // Usamos el hook genérico y añadimos console.log para depuración
  const result = useFetchAPI(url, []);
  
  // Depuración para ver qué está devolviendo la API
  // console.log('URL de la petición TECNOLED:', url);
  // console.log('Resultado TECNOLED:', result);
  
  return result;
}