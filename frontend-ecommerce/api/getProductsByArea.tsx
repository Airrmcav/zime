import { useFetchAPI, buildApiUrl } from './apiUtils';

export function useGetProductsByArea(areaSlug: string) {
    const url = areaSlug 
        ? buildApiUrl('products', { 
            area: { 
                slug: { $eq: areaSlug } 
            } 
          })
        : '';
    
    return useFetchAPI(url, [areaSlug]);
}