import { useState, useEffect } from 'react';
import { useFetchAPI, buildApiUrl } from './apiUtils';

export function useGetProductsByCatalog(catalog: string)  {
   // Manejar casos especiales de slugs
   let backendCatalog = catalog;
   if (catalog === 'epp') {
       backendCatalog = 'equipo-de-proteccion-personal';
   }
   
   // Construir URLs usando las funciones de utilidad
   const productsUrl = catalog ? buildApiUrl('products', {
     catalogo: { slug: { $eq: backendCatalog } }
   }) : '';
   
   const catalogInfoUrl = catalog ? buildApiUrl('catalogos', {
     slug: { $eq: backendCatalog }
   }) : '';
   
   // Usar el hook genérico para obtener productos
   const { 
     result: productsResult, 
     loading: productsLoading, 
     error: productsError 
   } = useFetchAPI(productsUrl, [catalog]);
   
   // Usar el hook genérico para obtener información del catálogo
   const { 
     result: catalogInfoResult, 
     loading: catalogInfoLoading, 
     error: catalogInfoError 
   } = useFetchAPI(catalogInfoUrl, [catalog]);
   
   // Combinar resultados
   const loading = productsLoading || catalogInfoLoading;
   const error = productsError || catalogInfoError;
   
   return {
      result: productsResult || [],
      catalogInfo: catalogInfoResult?.[0] || null,
      loading,
      error
    };
}