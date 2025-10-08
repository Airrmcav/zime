import { ResultFilterTypes } from '@/types/filters';
import { useEffect, useState } from 'react';

export function useGetProductField() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/content-type-builder/content-types/api::product.product`;
    const [result, setResult] = useState<ResultFilterTypes | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                // Crear un objeto de resultado con la estructura esperada
                const mockResult: ResultFilterTypes = {
                    schema: {
                        attributes: {
                            area: {
                                enum: []
                            },
                            catalogo: {
                                enum: []
                            }
                        }
                    }
                };
                
                // Obtener los valores de área desde la API
                const areaRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/areas`);
                const areaJson = await areaRes.json();
                console.log('Respuesta completa de API áreas:', areaJson);
                
                if (areaJson && areaJson.data && mockResult.schema?.attributes?.area) {
                    // Crear un array de valores de área para el enum
                    const areaEnum = areaJson.data.map((area: any) => {
                        console.log('Área individual:', area);
                        return area.attributes ? area.attributes.nameArea : area.nameArea;
                    }).filter(Boolean);
                    // Añadir el enum al resultado
                    mockResult.schema.attributes.area.enum = areaEnum;
                    console.log('Datos de áreas procesados:', areaEnum);
                }
                
                // Obtener los valores de catálogo desde la API
                const catalogoRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalogos`);
                const catalogoJson = await catalogoRes.json();
                console.log('Respuesta completa de API catálogos:', catalogoJson);
                
                if (catalogoJson && catalogoJson.data && mockResult.schema?.attributes?.catalogo) {
                    // Crear un array de valores de catálogo para el enum
                    const catalogoEnum = catalogoJson.data.map((catalogo: any) => {
                        console.log('Catálogo individual:', catalogo);
                        return catalogo.attributes ? catalogo.attributes.nameCatalogo : catalogo.nameCatalogo;
                    }).filter(Boolean);
                    // Añadir el enum al resultado
                    mockResult.schema.attributes.catalogo.enum = catalogoEnum;
                    console.log('Datos de catálogos procesados:', catalogoEnum);
                }
                
                setResult(mockResult);
                setLoading(false);
                
                console.log('Datos finales de áreas:', mockResult.schema?.attributes?.area?.enum);
                console.log('Datos finales de catálogos:', mockResult.schema?.attributes?.catalogo?.enum);
                
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                    console.error('Error en useGetProductField:', err.message);
                } else {
                    setError('An unknown error occurred');
                    console.error('Error desconocido en useGetProductField');
                }
                setLoading(false);
            }
        })();
    }, [url]);

    return { result, loading, error };
}