import { useFetchAPI, buildApiUrl } from '../apiUtils';

/**
 * Hook para obtener productos destacados de la marca LUCECO
 * @returns Resultado de la consulta
 */
export function useGetFeaturedProductsLuminarias() {
  // Construimos los filtros específicos
  const filters: Record<string, any> = {
    isFeatured: true,
    marca: "LUCECO"
  };
  
  // Construimos la URL con los filtros
  const url = buildApiUrl('products', filters, '*');
  
  // Usamos el hook genérico y añadimos console.log para depuración
  const result = useFetchAPI(url, []);
  
  // Depuración para ver qué está devolviendo la API
  // console.log('URL de la petición LUCECO:', url);
  // console.log('Resultado LUCECO:', result);
  
  return result;
}