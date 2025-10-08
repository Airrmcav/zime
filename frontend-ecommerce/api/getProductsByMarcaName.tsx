import { useFetchAPI, buildApiUrl } from './apiUtils';

/**
 * Hook para obtener productos por nombre exacto de marca
 * @param marcaName Nombre exacto de la marca (ej: PHILCO)
 * @returns Objeto con resultado, estado de carga y error
 */
export function useGetProductsByMarcaName(marcaName: string) {
  const url = marcaName ? buildApiUrl('products', {
    marcaProduct: {
      nameMarca: { $eq: marcaName }
    }
  }, '*') : '';

  const { 
    result, 
    loading, 
    error 
  } = useFetchAPI(url, [marcaName]);

  return {
    result: result || [],
    loading,
    error
  };
}