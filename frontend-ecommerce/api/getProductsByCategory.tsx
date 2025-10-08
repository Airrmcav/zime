import { useFetchAPI, buildApiUrl } from './apiUtils';

export function useGetProductsByCategory(category: string) {
    // Construimos la URL con los filtros necesarios
    const url = category 
        ? buildApiUrl('products', { 
            category: { 
                categoryName: { $eq: category } 
            } 
          })
        : '';
    
    // Usamos el hook genérico pasando category como dependencia
    return useFetchAPI(url, [category]);
}