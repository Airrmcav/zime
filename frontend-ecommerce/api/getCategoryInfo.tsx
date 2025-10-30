import { useFetchAPI, buildApiUrl } from './apiUtils';
import { CategoryType } from '@/types/category';

export function useGetCategoryInfo(categorySlug: string): {
  categoryInfo: CategoryType | null;
  loading: boolean;
  error: string;
} {
   // Manejar casos especiales de slugs
   let backendCategorySlug = categorySlug;
   
   // Construir URL para obtener información de la categoría
   const categoryInfoUrl = categorySlug ? buildApiUrl('categories', {
     slug: { $eq: backendCategorySlug }
   }) : '';
   
   // Usar el hook genérico para obtener información de la categoría
   const { 
     result: categoryInfoResult, 
     loading: categoryInfoLoading, 
     error: categoryInfoError 
   } = useFetchAPI(categoryInfoUrl, [categorySlug]);

   const categoryArray = categoryInfoResult as CategoryType[] | null;
   const categoryInfo = Array.isArray(categoryArray) ? categoryArray[0] : null;
   
   return {
      categoryInfo,
      loading: Boolean(categoryInfoLoading),
      error: (categoryInfoError as string) || ''
    };
}