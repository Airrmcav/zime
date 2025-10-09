'use client';
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";
import { ArrowRight, Loader2, Shield, Zap, Phone, Eye } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { useGetCategories } from "@/api/useGetCategories";

const ChooseCategory = () => {
    const { result, loading, error }: ResponseType = useGetCategories();
    const router = useRouter();

    // Función para obtener el ícono apropiado según el tipo de categoría
    const getCategoryIcon = (categoryName: string) => {
        const name = categoryName.toLowerCase();
        if (name.includes('protección') || name.includes('epp') || name.includes('seguridad')) {
            return <Shield className="w-6 h-6" />;
        }
        if (name.includes('eléctrico') || name.includes('electricidad') || name.includes('cables')) {
            return <Zap className="w-6 h-6" />;
        }
        return <Eye className="w-6 h-6" />;
    };

    // Función para determinar si es material eléctrico
    const isElectricCategory = (category: CategoryType) => {
        const name = category.categoryName.toLowerCase();
        const desc = category.descriptionCategory?.toLowerCase() || '';
        return name.includes('material electrico') || name.includes('material eléctrico') || 
               name.includes('eléctrico') || name.includes('electricidad') || name.includes('cables') ||
               desc.includes('material electrico') || desc.includes('material eléctrico');
    };

    // Función para obtener colores según el tipo
    const getColorClasses = (category: CategoryType, isElectric: boolean) => {
        return {
            badge: isElectric ? 'bg-blue-600/10 border-blue-200/50' : 'bg-orange-600/10 border-orange-200/50',
            badgeText: isElectric ? 'text-blue-800' : 'text-orange-800',
            badgeIcon: isElectric ? 'text-blue-600' : 'text-orange-600',
            title: isElectric ? 'group-hover:text-blue-600' : 'group-hover:text-orange-600',
            actionBtn: isElectric ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-600 hover:bg-orange-700',
            footer: isElectric ? 'text-blue-600' : 'text-orange-600',
            footerHover: isElectric ? 'group-hover:text-blue-600' : 'group-hover:text-orange-600',
            border: isElectric ? 'group-hover:border-blue-200' : 'group-hover:border-orange-200'
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 mt-5 pt-5">
            <div className="max-w-7xl py-1 mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-left mb-5">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/10 via-orange-600/10 to-blue-600/10 border border-blue-200/50 rounded-full mb-3 backdrop-blur-sm">
                        <Shield className="w-5 h-5 text-orange-600 animate-pulse" />
                        <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent uppercase tracking-wider">
                            EPP & Material Eléctrico
                        </span>
                        <Zap className="w-5 h-5 text-blue-600 animate-pulse" />
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl lg:text-5xl font-black text-gray-900 mb-3 leading-tight">
                        <span className="block">Protección y</span>
                        <span className="block bg-gradient-to-r from-orange-600 via-blue-500 to-orange-600 bg-clip-text text-transparent animate-gradient">
                            Equipos Eléctricos
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl lg:text-2xl text-gray-600 max-w-7xl  leading-relaxed font-light">
                        Descubre nuestra completa línea de{" "}
                        <span className="font-semibold text-orange-700">equipos de protección personal</span> y{" "}
                        <span className="font-semibold text-blue-700">material eléctrico especializado</span>.
                        Calidad certificada para profesionales.
                    </p>

                    {/* Stats */}
                    
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-orange-200 rounded-full animate-spin"></div>
                            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                        </div>
                        <p className="text-xl text-gray-700 font-medium mt-6">Cargando categorías...</p>
                        <p className="text-sm text-gray-500 mt-2">Preparando equipos de protección y material eléctrico</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-32">
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-12 max-w-lg mx-auto shadow-xl">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-red-800 mb-3">Error al cargar categorías</h3>
                            <p className="text-red-600 text-sm leading-relaxed">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                )}

                {/* Categories Section */}
                {!loading && result && (
                    <div className="relative">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-12 bg-gradient-to-b from-orange-600 via-blue-600 to-orange-600 rounded-full"></div>
                                <div>
                                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                        {result.length} Categorías Especializadas
                                    </h2>
                                    <p className="text-gray-600 text-lg">
                                        Explora por especialidad para encontrar exactamente lo que necesitas
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Hint */}
                            <div className="hidden lg:flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm">
                                <span className="text-sm font-medium text-gray-700">Navegar:</span>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                        <ArrowRight className="w-3 h-3" />
                                        <span>Flechas</span>
                                    </div>
                                    <span className="text-xs text-gray-400">o</span>
                                    <div className="px-2 py-1 bg-gray-100 rounded text-xs">Arrastrar</div>
                                </div>
                            </div>
                        </div>

                        {/* Categories Carousel */}
                        <Carousel className="w-full">
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {result.map((category: CategoryType) => (
                                    <CarouselItem 
                                        key={category.id} 
                                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                                    >
                                        <Link href={`/categoria/${category.slug}`} className="block h-full">
                                            <Card className="group h-full border-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl overflow-hidden relative">
                                                <CardContent className="p-0 h-full flex flex-col">
                                                    {/* Category Icon Badge */}
                                                    <div className="absolute top-4 left-4 z-10">
                                                        <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                                                            {getCategoryIcon(category.categoryName)}
                                                        </div>
                                                    </div>

                                                    {/* Action Button */}
                                                    <div className="absolute top-4 right-4 z-10">
                                                        <div className="bg-blue-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 hover:bg-blue-700">
                                                            <ArrowRight className="w-4 h-4" />
                                                        </div>
                                                    </div>

                                                    {/* Image Container */}
                                                    <div className="relative h-56 bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center overflow-hidden">
                                                        {category.mainImage && category.mainImage.url ? (
                                                            <img
                                                                src={`${category.mainImage.url}`}
                                                                alt={category.categoryName}
                                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                                            />
                                                        ) : (
                                                            <div className="text-8xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                                                                {category.categoryName.toLowerCase().includes('protección') ? '🛡️' : '⚡'}
                                                            </div>
                                                        )}
                                                        
                                                        {/* Overlay Gradient */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 p-6 flex flex-col">
                                                        {/* Category Name */}
                                                        <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                                                            {category.categoryName}
                                                        </h3>

                                                        {/* Description */}
                                                        {category.descriptionCategory && (
                                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                                                                {category.descriptionCategory}
                                                            </p>
                                                        )}

                                                        {/* Action Footer */}
                                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                                                                Ver Productos
                                                            </span>
                                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                                                        </div>
                                                    </div>

                                                    {/* Hover Border Effect */}
                                                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300"></div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {/* Navigation Arrows */}
                            <CarouselPrevious className="hidden md:flex -left-12 w-12 h-12 bg-white/90 backdrop-blur-sm shadow-xl border-2 border-orange-100 hover:bg-orange-50 hover:border-orange-300 text-gray-600 hover:text-orange-600 hover:scale-110 transition-all duration-300" />
                            <CarouselNext className="hidden md:flex -right-12 w-12 h-12 bg-white/90 backdrop-blur-sm shadow-xl border-2 border-blue-100 hover:bg-blue-50 hover:border-blue-300 text-gray-600 hover:text-blue-600 hover:scale-110 transition-all duration-300" />
                        </Carousel>
                    </div>
                )}

               
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default ChooseCategory;