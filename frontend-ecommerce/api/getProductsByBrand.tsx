import { useFetchAPI, buildApiUrl } from './apiUtils';

/**
 * Hook para obtener productos por marca
 * @param brand Nombre de la marca
 * @returns Objeto con resultado, estado de carga y error
 */
export function useGetProductsByBrand(brand: string) {
  const url = brand ? buildApiUrl('productos', {
    filters: {
      marcaProduct: {
        $containsi: brand
      }
    },
    sort: ['createdAt:desc'],
    pagination: {
      page: 1,
      pageSize: 100
    }
  }) : '';

  const { 
    result, 
    loading, 
    error 
  } = useFetchAPI(url, [brand]);

  return {
    result: result || [],
    loading,
    error
  };
}