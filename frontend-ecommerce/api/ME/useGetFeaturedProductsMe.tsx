import { useGetFeaturedProducts as useGetFeaturedProductsBase } from "../useGetFeaturedProducts";

export function useGetFeaturedProductsMe() {
  // Reutilizamos el hook genérico pasando el slug del catálogo
  return useGetFeaturedProductsBase("luminarias");
}

// Exportamos también con el nombre que espera el componente
export const useGetFeaturedProducts = useGetFeaturedProductsMe;
