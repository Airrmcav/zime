"use client"

import { useGetProductBySlug } from "@/api/getProductBySlug";
import { useParams } from "next/navigation"
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";

import InfoProduct from "./components/info-product";
import RelatedProducts from "./components/related-products";
import { ProductType } from "@/types/product";
import { renderCharacteristics } from "./components/renderCharacteristics";
import { FileText } from "lucide-react";

export default function Page() {
    const params = useParams();
    const productSlug = params?.productSlug;


    const category = params?.categorySlug || '';


    if (typeof productSlug === "undefined") {
        return <SkeletonProduct />
    }

    const { result, loading, error } = useGetProductBySlug(productSlug);

    console.log(result);

    if (result == null || loading) {
        return <SkeletonProduct />
    }

    // Hacer type assertion para asegurar que es ProductType
    const product = result[0] as ProductType;

    // Verificar que el producto existe y tiene las propiedades necesarias
    if (!product) {
        return <SkeletonProduct />
    }

    // Parsear las características si vienen como string JSON
    let parsedCharacteristics: any = {};
    try {
        if (product.characteristics) {
            parsedCharacteristics = typeof product.characteristics === 'string'
                ? JSON.parse(product.characteristics)
                : product.characteristics;
        }
    } catch (error) {
        console.error('Error parsing characteristics:', error);
        parsedCharacteristics = {};
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">

            <div className="max-w-7xl mx-auto py-10">
                <div className="grid sm:grid-cols-2">
                    <div>
                        <CarouselProduct
                            images={product.images && product.images.length > 0 ? product.images.map(img => ({
                                id: img.id,
                                url: img.url,
                                alternativeText: img.alternativeText ?? undefined,
                            })) : []}
                            productName={product.productName}
                            product={product}
                            catalogSlug={product.catalogo.slug}
                        />
                    </div>
                    <div className="sm:px-12">
                        <InfoProduct product={product}
                            catalogSlug={product.catalogo.slug} />
                    </div>
                </div>

                {/* Sección de Características */}
                <div className="mt-12 bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Header minimalista */}
                    <div className="border-b border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Especificaciones Técnicas
                            </h2>
                        </div>
                        <p className="text-gray-600 text-sm ml-13">
                            Información detallada del producto y certificaciones de calidad
                        </p>
                    </div>

                    {/* Sección de características */}
                    {parsedCharacteristics && Object.keys(parsedCharacteristics).length > 0 ? (
                        <div className="p-6">
                            {renderCharacteristics(parsedCharacteristics)}
                        </div>
                    ) : (
                        <div className="text-center p-12">
                            <p className="text-gray-500">Sin especificaciones disponibles</p>
                        </div>
                    )}
                </div>

                {/* Sección de Productos Relacionados */}
                <RelatedProducts
                    currentProduct={product}
                    catalogSlug={product.catalogo.slug}
                />
            </div>
        </div>
    )
}