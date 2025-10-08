import { useFetchAPI, buildApiUrl } from './apiUtils';

export function useGetAllProducts() {
    const url = buildApiUrl('products');
    return useFetchAPI(url);
}