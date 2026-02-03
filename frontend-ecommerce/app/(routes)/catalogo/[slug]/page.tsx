"use client";
import { useGetProductsByCatalog } from "@/api/getProductsByCatalog";
import { useGetAllProducts } from "@/api/getAllProducts";
import { ResponseType } from "@/types/response";
import {
  useParams,
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "./components/product.card";
import { ProductType } from "@/types/product";
import { CatalogoType } from "@/types/catalogo";
import {
  ArrowLeft,
  Grid3X3,
  List,
  Package,
  Shield,
  Zap,
  Settings,
  HardHat,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import FilterCategory from "@/components/filters/filter-category";
import Pagination from "@/components/ui/pagination";

export default function Page() {
  const params = useParams();
  const { slug: catalogSlug } = params;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterArea, setFilterArea] = useState("");

  const {
    result: allProducts,
    loading: allProductsLoading,
    error: allProductsError,
  }: ResponseType = useGetAllProducts();
  const {
    result: catalogProducts = [],
    catalogInfo,
    loading: categoryLoading,
    error: categoryError,
  }: any = useGetProductsByCatalog(
    Array.isArray(catalogSlug) ? catalogSlug[0] : (catalogSlug ?? ""),
  );

  // Forzar valores por defecto para evitar errores
  const safeAllProducts = Array.isArray(allProducts) ? allProducts : [];
  const safeCatalogProducts = Array.isArray(catalogProducts)
    ? catalogProducts
    : [];

  // Verificar datos en consola para depuración
  // console.log("catalogProducts:", catalogProducts);
  // console.log("catalogInfo:", catalogInfo);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let loading = categoryLoading;
  let error = categoryError;

  // Obtener información del catálogo usando la estructura de CatalogoType
  const catalogoInfo = catalogInfo || {};

  // Valores por defecto para cuando catalogInfo es null
  const defaultCatalogName =
    catalogSlug === "todos"
      ? "Todos los Productos"
      : typeof catalogSlug === "string"
        ? catalogSlug.charAt(0).toUpperCase() + catalogSlug.slice(1)
        : "Catálogo";

  // Manejo especial para catálogos específicos
  let catalogName = "";
  let catalogDescription = "";

  if (catalogSlug === "epp") {
    catalogName = "Equipo de Protección Personal";
    catalogDescription =
      "Encuentra los mejores equipos de protección personal certificados bajo las normativas internacionales. Garantizamos la seguridad de tu personal con productos de la más alta calidad.";
  } else if (catalogSlug === "luminarias") {
    catalogName = "Luminarias";
    catalogDescription =
      "Descubre nuestra amplia gama de materiales eléctricos de alta calidad. Productos certificados que cumplen con los estándares más exigentes para tus instalaciones eléctricas.";
  } else {
    // Acceder directamente a los campos del catálogo para otros casos
    catalogName = catalogoInfo?.nameCatalogo || defaultCatalogName;
    catalogDescription =
      catalogoInfo?.descriptionCatalogo ||
      `Encuentra los mejores productos de ${defaultCatalogName} para tus necesidades industriales y de seguridad.`;
  }

  // Obtener la imagen del catálogo desde la estructura correcta
  const catalogImage = catalogoInfo?.attributes?.mainImage?.data || null;

  // Sincronizar página inicial desde query o sessionStorage
  useEffect(() => {
    // Leer page de la URL si existe
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const parsed = parseInt(pageParam, 10);
      if (!Number.isNaN(parsed) && parsed >= 1) {
        setCurrentPage(parsed);
        return;
      }
    }
    // Fallback: leer de sessionStorage con ambos posibles slugs
    const routeKey = `catalog-page-${Array.isArray(catalogSlug) ? catalogSlug[0] : catalogSlug}`;
    const specialKey =
      catalogSlug === "epp"
        ? "catalog-page-equipo-de-proteccion-personal"
        : undefined;
    const saved =
      sessionStorage.getItem(routeKey) ||
      (specialKey ? sessionStorage.getItem(specialKey) : null);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!Number.isNaN(parsed) && parsed >= 1) {
        setCurrentPage(parsed);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogSlug]);

  // Guardar cambios de página en sessionStorage y reflejar en la URL
  useEffect(() => {
    const routeSlug = Array.isArray(catalogSlug) ? catalogSlug[0] : catalogSlug;
    if (!routeSlug) return;
    const routeKey = `catalog-page-${routeSlug}`;
    sessionStorage.setItem(routeKey, String(currentPage));
    // Mapear alias especiales para coincidir con el slug del producto
    if (routeSlug === "epp") {
      sessionStorage.setItem(
        "catalog-page-equipo-de-proteccion-personal",
        String(currentPage),
      );
    }
    // Actualizar query param ?page= en la URL sin recargar
    if (pathname) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(currentPage));
      router.replace(`${pathname}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, catalogSlug]);

  // Calcular productos filtrados y visibles según paginación
  const safeFilteredProducts = Array.isArray(safeCatalogProducts)
    ? safeCatalogProducts.filter((product: ProductType) => {
        if (filterCategory && filterCategory !== "") {
          if (!product.category) return false;
          return (
            product.category.categoryName.toLowerCase() ===
            filterCategory.toLowerCase()
          );
        }
        return true;
      })
    : [];

  const totalPages =
    Math.ceil(safeFilteredProducts.length / productsPerPage) || 1;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = safeFilteredProducts.slice(startIndex, endIndex);

  // Depuración
  // console.log("catalogSlug:", catalogSlug);
  // console.log("catalogoInfo:", catalogoInfo);
  // console.log("catalogImage:", catalogImage);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      {!categoryLoading && (
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
                  <span className="block text-orange-400">{catalogName}</span>
                  <span className="block text-3xl text-white mt-2">
                    Productos de Calidad
                  </span>
                </h1>

                <div className="space-y-2">
                  <p
                    className={`text-md text-slate-300 max-w-2xl leading-relaxed ${!showFullDescription ? "line-clamp-4" : ""}`}
                  >
                    {catalogDescription}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="flex items-center gap-1 text-orange-300 hover:text-orange-400 transition-colors text-sm font-medium"
                  >
                    {showFullDescription ? (
                      <>
                        Ver menos <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Ver más <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">
                      {catalogSlug === "todos"
                        ? Array.isArray(safeAllProducts)
                          ? safeAllProducts.length
                          : 0
                        : Array.isArray(safeCatalogProducts)
                          ? safeCatalogProducts.length
                          : 0}
                      +
                    </div>
                    <div className="text-sm text-slate-400">Productos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      100%
                    </div>
                    <div className="text-sm text-slate-400">Certificado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">24h</div>
                    <div className="text-sm text-slate-400">Envío Express</div>
                  </div>
                </div>
              </div>

              {/* Imagen del catálogo */}
              <div className="flex items-center justify-center">
                {/* {catalogoInfo?.mainImage && catalogoInfo.mainImage.length > 0 ? ( */}
                <div className="relative w-full h-[25rem]">
                  <img
                    src={catalogoInfo.mainImage[0].url}
                    alt={catalogName}
                    className="w-full h-full object-contain object-center"
                    onError={(e) =>
                      console.error("Error loading image:", e.currentTarget.src)
                    }
                  />
                </div>
              </div>
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

      {/* Contenido principal */}
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
                  Inicio / Productos /{" "}
                  {catalogSlug === "todos" ? "Todos" : catalogName}
                </div>
              </div>

              {/* Alertas de seguridad */}
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-700 font-medium">
                  Productos con certificación obligatoria
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Panel de información de seguridad */}
            <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <HardHat className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-orange-900">
                  Info de Seguridad
                </h4>
              </div>
              <p className="text-sm text-orange-800 mb-3">
                Todos nuestros EPP están certificados según normativas
                internacionales.
              </p>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-xs text-orange-700 space-y-1">
                  <div>✓ Certificación CE</div>
                  <div>✓ Normas ANSI/ISEA</div>
                  <div>✓ Estándares OSHA</div>
                </div>
              </div>
            </div>
            <FilterCategory
              setFilterCategory={setFilterCategory}
              filterCategory={filterCategory}
              setFilterArea={setFilterArea}
              products={safeCatalogProducts}
              catalogSlug={
                Array.isArray(catalogSlug) ? catalogSlug[0] : catalogSlug
              }
              theme="orange"
            />
          </aside>

          {/* Área principal de productos */}
          <main className="lg:col-span-3 space-y-6">
            {/* Cabecera de resultados */}
            {!loading && (
              <div className="bg-white rounded-xl shadow-sm border p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="font-bold text-xl text-gray-900">
                        {Array.isArray(safeCatalogProducts)
                          ? safeCatalogProducts.length
                          : 0}{" "}
                        Productos Encontrados
                      </h2>
                      <p className="text-gray-600">
                        Mostrando resultados para tu búsqueda
                      </p>
                    </div>
                  </div>

                  {/* Controles de vista */}
                  <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`cursor-pointer p-2 rounded-md transition-all ${
                        viewMode === "grid"
                          ? "bg-white shadow-sm text-orange-600"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`cursor-pointer p-2 rounded-md transition-all ${
                        viewMode === "list"
                          ? "bg-white shadow-sm text-orange-600"
                          : "text-gray-600 hover:text-gray-800"
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

                {/* Filtros activos */}
                {filterCategory && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gray-500 font-medium">
                        Filtros activos:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {filterCategory && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                            Categoría: {filterCategory}
                            <button
                              onClick={() => setFilterCategory("")}
                              className="w-4 h-4 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center hover:bg-orange-300"
                            >
                              ×
                            </button>
                          </span>
                        )}
                      </div>
                      {filterCategory && (
                        <button
                          onClick={() => {
                            setFilterCategory("");
                          }}
                          className="ml-auto text-sm text-orange-600 hover:text-orange-800 hover:underline"
                        >
                          Quitar todos los filtros
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Grid de productos */}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                  : "space-y-4"
              }`}
            >
              {/* Loading */}
              {loading && <SkeletonSchema grid={6} />}

              {/* Productos */}
              {!loading &&
                Array.isArray(visibleProducts) &&
                visibleProducts.length > 0 &&
                visibleProducts.map((product: ProductType) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}

              {/* Mostrar mensaje cuando no hay productos que coincidan con el filtro */}
              {!loading &&
                filterCategory &&
                Array.isArray(safeCatalogProducts) &&
                safeCatalogProducts.filter(
                  (product) =>
                    product.category &&
                    product.category.categoryName.toLowerCase() ===
                      filterCategory.toLowerCase(),
                ).length === 0 && (
                  <div className="col-span-full">
                    <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                      <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No se encontraron productos
                      </h3>
                      <p className="text-gray-600 mb-6">
                        No hay productos que coincidan con el filtro
                        seleccionado.
                      </p>
                      <button
                        onClick={() => setFilterCategory("")}
                        className="inline-flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Quitar filtros
                      </button>
                    </div>
                  </div>
                )}

              {/* Estado vacío */}
              {!loading &&
                (!Array.isArray(safeFilteredProducts) ||
                  safeFilteredProducts.length === 0) && (
                  <div className="col-span-full">
                    <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                      <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Sin productos disponibles
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        No encontramos productos en este catálogo en este
                        momento.
                      </p>
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
                  {startIndex + 1}–
                  {Math.min(endIndex, safeFilteredProducts.length)} de{" "}
                  {safeFilteredProducts.length}
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
