"use client"
import { useGetCategoryProduct } from "@/api/getCategoryProduct"
import { useGetProductsByArea } from "@/api/getProductsByArea"
import { useGetProductsByCategory } from "@/api/getProductsByCategory"
import { useGetProductsByCatalog } from "@/api/getProductsByCatalog"
import { useGetAllProducts } from "@/api/getAllProducts"
import { useGetCategoryInfo } from "@/api/getCategoryInfo"
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams, useRouter } from "next/navigation";
import FiltersControlsCategory from "./components/filters-controls-area";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "./components/product.card";
import { ProductType } from "@/types/product";
import { ArrowLeft, Filter, Grid3X3, List, Package, Shield, Zap, Settings, HardHat, Cable, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import FilterCategory from "./components/filter-category";
import FilterArea from "./components/filter-area";
import FilterCatalog from "./components/filter-catalog";
import Pagination from "@/components/ui/pagination";

export default function Page() {
    const params = useParams();
    const { categorySlug } = params;
    // Normalizar a string para evitar union type string | string[]
    const categorySlugStr: string = Array.isArray(categorySlug) ? (categorySlug[0] ?? '') : (categorySlug ?? '');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const { result: allProducts, loading: allProductsLoading, error: allProductsError }: ResponseType = useGetAllProducts();
    const { result: categoryProducts, loading: categoryLoading, error: categoryError }: ResponseType = useGetCategoryProduct(categorySlugStr);
    const { categoryInfo, loading: categoryInfoLoading, error: categoryInfoError } = useGetCategoryInfo(categorySlugStr);
    const [filterArea, setFilterArea] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterCatalog, setFilterCatalog] = useState('');
    const { result: areaProducts, loading: areaLoading, error: areaError }: ResponseType = useGetProductsByArea(filterArea);
    const { result: categoryFilterProducts, loading: categoryFilterLoading, error: categoryFilterError }: ResponseType = useGetProductsByCategory(filterCategory);
    // Usar el slug del catálogo para obtener productos
    const { result: catalogProducts, loading: catalogLoading, error: catalogError }: ResponseType = useGetProductsByCatalog(filterCatalog);

    const router = useRouter();

    let loading = categoryLoading;
    let error = categoryError;
    let filteredProducts = categoryProducts;

    // Si el slug es 'todos', 'epp' o 'material-electrico', usar todos los productos
    if (categorySlug === 'todos' || categorySlug === 'epp' || categorySlug === 'material-electrico') {
        loading = allProductsLoading;
        error = allProductsError;
        filteredProducts = allProducts;
        
        // Si es EPP, filtrar solo productos de EPP
        if (categorySlug === 'epp') {
            filteredProducts = allProducts ? allProducts.filter((product: ProductType) => 
                product.catalogo?.slug === 'equipo-de-proteccion-personal'
            ) : [];
        }
        
        // Si es Material Eléctrico, filtrar solo productos de material eléctrico
        if (categorySlug === 'material-electrico') {
            filteredProducts = allProducts ? allProducts.filter((product: ProductType) => 
                product.catalogo?.slug === 'material-electrico'
            ) : [];
        }

        // Aplicar filtros si están activos
        if (filterCatalog !== '') {
            // Prioridad al filtro de catálogo
            loading = catalogLoading;
            error = catalogError;
            filteredProducts = catalogProducts;
            
            // Aplicar filtros adicionales si están activos
            if (filterArea !== '') {
                filteredProducts = filteredProducts ? filteredProducts.filter((product: ProductType) => {
                    // Verificar si product.area existe antes de convertirlo a slug
                    if (!product.area) return false;
                    // Convertir el área del producto a slug para comparar con filterArea
                    const productAreaSlug = product.area
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
                        .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
                        .replace(/\s+/g, '-') // Reemplazar espacios con guiones
                        .replace(/-+/g, '-'); // Evitar guiones múltiples
                    return productAreaSlug === filterArea;
                }) : [];
            }
            if (filterCategory !== '') {
                filteredProducts = filteredProducts ? filteredProducts.filter((product: ProductType) => 
                    product.category.categoryName === filterCategory
                ) : [];
            }
        } else if (filterArea !== '' && filterCategory === '') {
            loading = areaLoading;
            error = areaError;
            filteredProducts = areaProducts;
        } else if (filterArea === '' && filterCategory !== '') {
            loading = categoryFilterLoading;
            error = categoryFilterError;
            filteredProducts = categoryFilterProducts;
        } else if (filterArea !== '' && filterCategory !== '') {
            loading = categoryFilterLoading || areaLoading;
            error = categoryFilterError || areaError;
            if (categoryFilterProducts && areaProducts) {
                filteredProducts = categoryFilterProducts.filter((product: ProductType) => {
                    // Verificar si product.area existe antes de convertirlo a slug
                    if (!product.area) return false;
                    // Convertir el área del producto a slug para comparar con filterArea
                    const productAreaSlug = product.area.toLowerCase().replace(/\s+/g, '-');
                    return productAreaSlug === filterArea;
                });
            } else {
                filteredProducts = categoryFilterProducts;
            }
        }
    } else {
        // Lógica original para otras categorías
        if (filterCatalog !== '') {
            // Prioridad al filtro de catálogo
            loading = catalogLoading;
            error = catalogError;
            filteredProducts = catalogProducts;
            
            // Aplicar filtros adicionales si están activos
            if (filterArea !== '') {
                filteredProducts = filteredProducts ? filteredProducts.filter((product: ProductType) => {
                    // Verificar si product.area existe antes de convertirlo a slug
                    if (!product.area) return false;
                    // Convertir el área del producto a slug para comparar con filterArea
                    const productAreaSlug = product.area.toLowerCase().replace(/\s+/g, '-');
                    return productAreaSlug === filterArea;
                }) : [];
            }
            if (filterCategory !== '') {
                filteredProducts = filteredProducts ? filteredProducts.filter((product: ProductType) => 
                    product.category.categoryName === filterCategory
                ) : [];
            }
        } else if (filterArea !== '' && filterCategory === '') {
            loading = areaLoading;
            error = areaError;
            filteredProducts = areaProducts;
        } else if (filterArea === '' && filterCategory !== '') {
            loading = categoryFilterLoading;
            error = categoryFilterError;
            filteredProducts = categoryFilterProducts;
        } else if (filterArea !== '' && filterCategory !== '') {
            loading = categoryFilterLoading || areaLoading;
            error = categoryFilterError || areaError;
            if (categoryFilterProducts && areaProducts) {
                filteredProducts = categoryFilterProducts.filter((product: ProductType) => {
                    // Verificar si product.area existe antes de comparar
                    if (!product.area) return false;
                    // Aquí debemos usar el slug también para ser consistentes
                    const productAreaSlug = product.area
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
                        .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
                        .replace(/\s+/g, '-') // Reemplazar espacios con guiones
                        .replace(/-+/g, '-'); // Evitar guiones múltiples
                    return productAreaSlug === filterArea;
                });
            } else {
                filteredProducts = categoryFilterProducts;
            }
        }
    }

    // Resetear paginación al cambiar filtros o categoría
    useEffect(() => {
        setCurrentPage(1);
    }, [filterArea, filterCategory, filterCatalog, categorySlug]);

    // Productos visibles según paginación
    const safeFilteredProducts = Array.isArray(filteredProducts) ? filteredProducts : [];
    const totalPages = Math.ceil(safeFilteredProducts.length / productsPerPage) || 1;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const visibleProducts = safeFilteredProducts.slice(startIndex, endIndex);

    // Función para crear slugs consistente con la del navbar
    const createSlug = (text: string) => {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    // Obtener el nombre de la categoría basado en el slug
    let categoryName = categorySlug === 'todos' ? 'Todos los Productos' : '';
    
    // Si no es 'todos', intentar encontrar el nombre de la categoría
    if (categorySlug !== 'todos') {
        // Si tenemos productos de categoría, usar el nombre de la categoría del primer producto
        if (categoryProducts && categoryProducts.length > 0 && categoryProducts[0]?.category?.categoryName) {
            categoryName = categoryProducts[0].category.categoryName;
        } else {
            // Casos especiales para EPP y Material Eléctrico
            if (categorySlug === 'epp') {
                categoryName = 'EPP';
            } else if (categorySlug === 'material-electrico') {
                categoryName = 'Material Eléctrico';
            }
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Banner - Nueva estructura tipo hero */}
            {!loading && (
                <section className="bg-gradient-to-r from-slate-900 via-orange-900 to-slate-900 text-white relative overflow-hidden">
                    {/* Patrón de fondo */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_transparent_50%,_rgba(255,255,255,0.1)_100%)]"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_transparent_50%,_rgba(255,255,255,0.05)_100%)]"></div>
                    </div>
                    
                    <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Contenido principal */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex -space-x-2">
                                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white">
                                            <Zap className="w-5 h-5 text-slate-900" />
                                        </div>
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                            <Settings className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <span className="bg-orange-500/20 px-3 py-1 rounded-full text-sm font-medium text-orange-200 border border-orange-500/30">
                                        Productos Industriales
                                    </span>
                                </div>

                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                    {categorySlug === 'todos' ? (
                                        <>
                                            <span className="block text-orange-400">EPP & Material</span>
                                            <span className="block">Eléctrico</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="block text-3xl text-orange-400">
                                                {categoryName}
                                            </span>
                                            <span className="block text-5xl">Para tu Seguridad</span>
                                        </>
                                    )}
                                </h1>

                                <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                                    {categorySlug === 'todos' ? (
                                        <>Equipamiento profesional de seguridad y componentes eléctricos. Cumplimos con las normativas más estrictas para proteger a tu equipo de trabajo.</>
                                    ) : (
                                        <>
                                            {categoryInfo?.descriptionCategory || `Encuentra los mejores productos de ${(categoryName || categoryName).toLowerCase()} con certificaciones internacionales y garantía de calidad.`}
                                        </>
                                    )}
                                </p>

                                {/* Estadísticas */}
                                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-700">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-400">
                                            {Array.isArray(safeFilteredProducts) ? safeFilteredProducts.length : 0}+
                                        </div>
                                        <div className="text-sm text-slate-400">Productos</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-400">100%</div>
                                        <div className="text-sm text-slate-400">Certificado</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-400">24h</div>
                                        <div className="text-sm text-slate-400">Envío Express</div>
                                    </div>
                                </div>
                            </div>

                             {/* Imagen de categoría o panel de características */}
                             {categoryInfo?.mainImage?.url ? (
                                 <div className="relative rounded-2xl overflow-hidden">
                                     <img 
                                        src={categoryInfo.mainImage.url} 
                                        alt={categoryInfo?.categoryName || categoryName}
                                        className="w-full h-80 lg:h-96 object-contain"
                                     />
                                     
                                 </div>
                             ) : (
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <h3 className="font-semibold text-xl mb-4 text-orange-300">¿Por qué elegir nuestros productos?</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Shield className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">Certificación Internacional</h4>
                                                <p className="text-sm text-slate-300">Todos nuestros EPP cumplen normativas CE, ANSI y OSHA</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Zap className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">Material Eléctrico Premium</h4>
                                                <p className="text-sm text-slate-300">Componentes de marcas reconocidas con garantía extendida</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Package className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">Stock Inmediato</h4>
                                                <p className="text-sm text-slate-300">Entrega rápida desde nuestros almacenes regionales</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Loading state for header */}
            {loading && (
                <section className="bg-slate-900 text-white">
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="h-12 bg-slate-700 rounded-lg animate-pulse"></div>
                                <div className="h-16 bg-slate-700 rounded-lg animate-pulse"></div>
                                <div className="h-24 bg-slate-700 rounded-lg animate-pulse"></div>
                            </div>
                            <div className="h-64 bg-slate-700 rounded-2xl animate-pulse"></div>
                        </div>
                    </div>
                </section>
            )}

            {/* Contenido principal - Nueva estructura */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Barra de navegación rápida */}
                <nav className="mb-8">
                    <div className="bg-white rounded-xl shadow-sm border p-4">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => router.back()}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div className="text-sm text-gray-500">
                                    Inicio / Productos / {categorySlug === 'todos' ? 'Todos' : categoryName}
                                </div>
                            </div>
                            
                            {/* Alertas de seguridad */}
                            <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                                <AlertTriangle className="w-4 h-4 text-orange-600" />
                                <span className="text-sm text-orange-700 font-medium">Productos con certificación obligatoria</span>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Layout principal con estructura de dashboard */}
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Sidebar rediseñado */}
                    <aside className="lg:col-span-1 space-y-6">
                        {/* Panel de filtros principal */}
                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                            <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4">
                                <h3 className="font-semibold text-white flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    Filtros de Búsqueda
                                </h3>
                            </div>
                            <div className="p-4 space-y-4">
                                <FilterCatalog
                                    setFilterCatalog={setFilterCatalog}
                                    filterCatalog={filterCatalog}
                                    setFilterArea={setFilterArea}
                                    setFilterCategory={setFilterCategory}
                                />
                                {/* <FilterArea
                                    setFilterArea={setFilterArea}
                                    filterArea={filterArea}
                                    setFilterCategory={setFilterCategory}
                                /> */}
                                <Separator />
                                <FilterCategory
                                    setFilterCategory={setFilterCategory}
                                    filterCategory={filterCategory}
                                    setFilterArea={setFilterArea}
                                />
                            </div>
                        </div>

                        {/* Panel de información de seguridad */}
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                            <div className="flex items-center gap-2 mb-3">
                                <HardHat className="w-5 h-5 text-orange-600" />
                                <h4 className="font-semibold text-orange-900">Info de Seguridad</h4>
                            </div>
                            <p className="text-sm text-orange-800 mb-3">
                                Todos nuestros EPP están certificados según normativas internacionales.
                            </p>
                            <div className="bg-white/60 rounded-lg p-3">
                                <div className="text-xs text-orange-700 space-y-1">
                                    <div>✓ Certificación CE</div>
                                    <div>✓ Normas ANSI/ISEA</div>
                                    <div>✓ Estándares OSHA</div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Área principal de productos */}
                    <main className="lg:col-span-3 space-y-6">
                        {/* Panel de filtros activos mejorado */}
                        {(filterArea !== '' || filterCategory !== '' || filterCatalog !== '') && (
                            <div className="bg-white rounded-xl shadow-sm border p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                            <Filter className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Filtros Aplicados</h3>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {filterCatalog !== '' && (
                                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                                        Catálogo: {filterCatalog}
                                                        <button onClick={() => setFilterCatalog('')} className="hover:text-green-900">×</button>
                                                    </span>
                                                )}
                                                {filterArea !== '' && (
                                                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                                        Área: {filterArea}
                                                        <button onClick={() => setFilterArea('')} className="hover:text-orange-900">×</button>
                                                    </span>
                                                )}
                                                {filterCategory !== '' && (
                                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                                        Categoría: {filterCategory}
                                                        <button onClick={() => setFilterCategory('')} className="hover:text-blue-900">×</button>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setFilterArea('');
                                            setFilterCategory('');
                                            setFilterCatalog('');
                                        }}
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Limpiar Todo
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Cabecera de resultados con vista mejorada */}
                        {filteredProducts !== null && !loading && (
                            <div className="bg-white rounded-xl shadow-sm border p-4">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                                            <Package className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-xl text-gray-900">
                                                {Array.isArray(filteredProducts) ? filteredProducts.length : 0} Productos Encontrados
                                            </h2>
                                            <p className="text-gray-600">
                                                Mostrando resultados para tu búsqueda
                                            </p>
                                        </div>
                                    </div>

                                    {/* Controles de vista estilizados */}
                                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`cursor-pointer p-2 rounded-md transition-all ${viewMode === 'grid'
                                                ? 'bg-white shadow-sm text-orange-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                        >
                                            <Grid3X3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`cursor-pointer p-2 rounded-md transition-all ${viewMode === 'list'
                                                ? 'bg-white shadow-sm text-orange-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                        {safeFilteredProducts.length > 0 && totalPages > 1 && (
                                            <div className="ml-3">
                                                <Pagination
                                                    currentPage={currentPage}
                                                    totalPages={totalPages}
                                                    onPageChange={setCurrentPage}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Grid de productos */}
                        <div className={`${viewMode === 'grid'
                            ? 'grid gap-4 md:grid-cols-2 xl:grid-cols-3'
                            : 'space-y-4'
                        }`}>
                            {/* Loading */}
                            {loading && <SkeletonSchema grid={6} />}

                            {/* Productos */}
                            {visibleProducts !== null && !loading && Array.isArray(visibleProducts) && 
                                visibleProducts.map((product: ProductType) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        viewMode={viewMode}
                                    />
                                ))
                            }

                            {/* Estado vacío mejorado */}
                            {filteredProducts !== null && !loading && filteredProducts.length === 0 && (
                                <div className="col-span-full">
                                    <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                                        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                            <Package className="w-12 h-12 text-gray-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            Sin productos disponibles
                                        </h3>
                                        <p className="text-gray-600 max-w-md mx-auto mb-6">
                                            No encontramos productos que coincidan con tus filtros actuales. 
                                            Prueba ajustando los criterios de búsqueda.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setFilterArea('');
                                                setFilterCategory('');
                                            }}
                                            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Ver Todos los Productos
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Estado de error */}
                            {error && (
                                <div className="col-span-full">
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                                        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                                            <AlertTriangle className="w-8 h-8 text-red-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-red-900 mb-2">
                                            Error al cargar productos
                                        </h3>
                                        <p className="text-red-700">{error}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {!loading && safeFilteredProducts.length > 0 && totalPages > 1 && (
                            <div className="mt-6 flex items-center justify-center gap-4">
                                <span className="text-sm text-gray-600">
                                    {startIndex + 1}–{Math.min(endIndex, safeFilteredProducts.length)} de {safeFilteredProducts.length}
                                </span>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}