import { useState, useEffect } from 'react';

export function useGetCategoryProduct(slug: string | string[])  {
   // Codificamos el slug de la categoría para URL
   const encodedSlug = encodeURIComponent(String(slug));
   const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${encodedSlug}`;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data);
                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }
        })();
    }, [url]);
    return { result, loading, error };
}