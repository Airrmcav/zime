import { useGetFeaturedProducts as useGetFeaturedProductsGeneric } from '../useGetFeaturedProducts';

export function useGetFeaturedProducts() {
    // Reutilizamos el hook genérico pasando el slug del catálogo
    return useGetFeaturedProductsGeneric('productos-de-limpieza');
}