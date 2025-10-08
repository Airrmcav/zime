import { useFetchAPI, buildApiUrl } from './apiUtils';

export function useGetProductBySlug(slug: string | string[]) {
    const stringSlug = String(slug);
    const url = stringSlug 
        ? buildApiUrl('products', { 
            slug: { $eq: stringSlug } 
          })
        : '';
    
    return useFetchAPI(url, [stringSlug]);
}