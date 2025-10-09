import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ChevronUp, ChevronDown, Shield } from "lucide-react";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { ProductType } from "@/types/product";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Star, Heart, ShoppingCart, Maximize2, ShieldCheck, MoveRight } from "lucide-react";


interface CarouselProductProps {
    images: {
        id: number;
        url: string;
        alternativeText?: string;
    }[];
    productName?: string;
    catalogSlug?: string; 
    product: ProductType;
}


const CarouselProduct = (props: CarouselProductProps) => {
    const { images, productName, catalogSlug, product } = props;
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
    const { addLoveItems } = useLovedProducts();

    // Configuración según el tipo de catálogo
    const isElectrical = catalogSlug === 'material-electrico';
    const colorConfig = {
        primary: isElectrical ? 'blue' : 'orange',
        bgColor: isElectrical ? 'bg-blue-500' : 'bg-orange-500',
        ringColor: isElectrical ? 'ring-blue-500' : 'ring-orange-500',
        hoverRingColor: isElectrical ? 'hover:ring-blue-300' : 'hover:ring-orange-300',
        gradientFrom: isElectrical ? 'from-blue-50' : 'from-orange-50',
        gradientTo: isElectrical ? 'to-sky-50' : 'to-amber-50',
        borderColor: isElectrical ? 'border-blue-100' : 'border-orange-100',
        dotColor: isElectrical ? 'bg-blue-500' : 'bg-orange-500',
        productType: isElectrical ? 'Material Eléctrico' : 'Equipo de protección Certificado',
        badgeText: isElectrical ? 'Material Certificado' : 'Equipo de protección Certificado'
    };

    // console.log("CarouselProduct images", images);

    // Número de miniaturas visibles a la vez (para desktop)
    const visibleThumbnails = 6; // Aumentamos para mostrar más en horizontal
    const canScrollLeft = thumbnailStartIndex > 0;
    const canScrollRight = thumbnailStartIndex + visibleThumbnails < images.length;

    const scrollThumbnailsLeft = () => {
        if (canScrollLeft) {
            setThumbnailStartIndex(thumbnailStartIndex - 1);
        }
    };

    const scrollThumbnailsRight = () => {
        if (canScrollRight) {
            setThumbnailStartIndex(thumbnailStartIndex + 1);
        }
    };

    // Asegurar que la imagen seleccionada esté visible
    const ensureSelectedThumbnailVisible = (index: number) => {
        if (index < thumbnailStartIndex) {
            setThumbnailStartIndex(index);
        } else if (index >= thumbnailStartIndex + visibleThumbnails) {
            setThumbnailStartIndex(Math.max(0, index - visibleThumbnails + 1));
        }
    };

    const handleImageSelect = (index: number) => {
        setSelectedImageIndex(index);
        ensureSelectedThumbnailVisible(index);
    };

    const handlePrevImage = () => {
        const newIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
        handleImageSelect(newIndex);
    };

    const handleNextImage = () => {
        const newIndex = selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
        handleImageSelect(newIndex);
    };

    if (!images || images.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 sm:h-96 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-200 mx-4 sm:mx-0">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <p className="text-gray-500">Sin imágenes disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:sticky top-35 z-10 lg:top-35 px-4 sm:px-0">
            <div className="w-full max-w-7xl mx-auto">
                {/* Main Image Display */}
                <div className="relative group max-w-[355px] sm:max-w-none mx-auto">
                    <div className="relative overflow-hidden bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg aspect-square max-w-full">
                        <div className="flex items-center justify-center w-full h-full">
                            <img
                                src={`${images[selectedImageIndex]?.url}`}
                                alt={images[selectedImageIndex]?.alternativeText || `${productName} - Imagen ${selectedImageIndex + 1}`}
                                className={`w-full h-full object-contain p-2 sm:p-4 transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in hover:scale-105'
                                    }`}
                                onClick={() => setIsZoomed(!isZoomed)}
                                loading="lazy"
                            />
                        </div>

                        {/* Zoom Icon Indicator - Siempre visible */}
                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 transition-opacity duration-300 justify-center">
                            <Button
                                variant="outline"
                                onClick={() => addLoveItems(product)}
                                className="px-4 mb-2 py-3 border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 rounded-lg group cursor-pointer"
                            >
                                <Heart className="w-5 h-5 group-hover:fill-red-400 group-hover:text-red-400 transition-all" />
                            </Button>
                            
                        </div>
                        {/* Zoom Icon Indicator - Siempre visible */}
                        <div className="absolute bottom-15 right-15 transition-opacity duration-300 justify-center">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-lg flex justify-center absolute top-0">
                                <ZoomIn className={`w-5 h-5 sm:w-5 sm:h-5 ${isElectrical ? 'text-blue-600' : 'text-orange-600'}`} />
                            </div>
                        </div>

                        {/* Image Counter */}
                        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
                            <div className="bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                {selectedImageIndex + 1} / {images.length}
                            </div>
                        </div>

                        {/* Navigation Arrows for Main Image - Siempre visibles */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    aria-label="Imagen anterior"
                                    className="cursor-pointer absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200"
                                >
                                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" aria-hidden="true" />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    aria-label="Imagen siguiente"
                                    className="cursor-pointer absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200"
                                >
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" aria-hidden="true" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Equipment Badge - Dinámico con icono */}
                    <div className={`absolute top-3 left-3 sm:top-6 sm:left-6 ${colorConfig.bgColor} text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-1 sm:gap-2`}>
                        {!isElectrical && <Shield className="w-3 h-3 sm:w-4 sm:h-4" />}
                        {isElectrical && <span className="text-xs sm:text-sm">⚡</span>}
                        {colorConfig.badgeText}
                    </div>
                </div>

                {/* Desktop Thumbnails - Horizontal below main image */}
                {images.length > 1 && (
                    <div className="mt-4 sm:mt-6">
                        <div className="flex items-center justify-center gap-2 sm:gap-4">
                            {/* Scroll Left Button - Desktop */}
                            <button
                                onClick={scrollThumbnailsLeft}
                                disabled={!canScrollLeft}
                                aria-label="Ver miniaturas anteriores"
                                className={`hidden md:flex p-1.5 sm:p-2 rounded-lg transition-all duration-200 cursor-pointer ${canScrollLeft
                                        ? 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md text-gray-700'
                                        : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                            </button>

                            {/* Thumbnails Container - Desktop */}
                            <div className="hidden md:flex gap-2 sm:gap-3 overflow-hidden p-1 sm:p-2" role="list" aria-label="Miniaturas de imágenes del producto">
                                {images.slice(thumbnailStartIndex, thumbnailStartIndex + visibleThumbnails).map((image, relativeIndex) => {
                                    const actualIndex = thumbnailStartIndex + relativeIndex;
                                    return (
                                        <button
                                            key={image.id}
                                            onClick={() => handleImageSelect(actualIndex)}
                                            aria-label={`Ver imagen ${actualIndex + 1}${image.alternativeText ? `: ${image.alternativeText}` : ''}`}
                                            aria-current={selectedImageIndex === actualIndex ? "true" : "false"}
                                            className={`relative group transition-all duration-300 ${selectedImageIndex === actualIndex
                                                    ? `${colorConfig.ringColor} ring-2 ring-offset-2`
                                                    : `${colorConfig.hoverRingColor} hover:ring-2 hover:ring-offset-1`
                                                }`}
                                            role="listitem"
                                        >
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
                                                <img
                                                    src={`${image.url}`}
                                                    alt={image.alternativeText || `Miniatura ${actualIndex + 1}`}
                                                    className="w-full h-full object-contain p-0.5 sm:p-1 group-hover:scale-110 transition-transform duration-200 cursor-pointer"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Active indicator */}
                                            {selectedImageIndex === actualIndex && (
                                                <div className={`absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 ${colorConfig.bgColor} rounded-full flex items-center justify-center`}>
                                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                                </div>
                                            )}

                                            {/* Image number overlay */}
                                            <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 bg-black/70 text-white text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded">
                                                {actualIndex + 1}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Scroll Right Button - Desktop */}
                            <button
                                onClick={scrollThumbnailsRight}
                                disabled={!canScrollRight}
                                aria-label="Ver más miniaturas"
                                className={`hidden md:flex p-1.5 sm:p-2 rounded-lg transition-all duration-200 cursor-pointer${canScrollRight
                                        ? 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md text-gray-700'
                                        : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Thumbnail Counter - Desktop */}
                        <div className="hidden md:block mt-3 text-center">
                            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                                {images.length} fotos
                            </div>
                        </div>

                        {/* Mobile Thumbnails - Horizontal scroll */}
                        <div className="md:hidden space-y-3">
                            <h4 className="text-base sm:text-lg font-semibold text-gray-800 text-center">Galería de imágenes</h4>
                            <div className="flex gap-2 justify-start overflow-x-auto pb-2 px-1">
                                {images.map((image, index) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`relative flex-shrink-0 group transition-all duration-300 ${selectedImageIndex === index
                                                ? `${colorConfig.ringColor} ring-2 sm:ring-4 ring-offset-1 sm:ring-offset-2`
                                                : `${colorConfig.hoverRingColor} hover:ring-2 hover:ring-offset-1`
                                            }`}
                                    >
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
                                            <img
                                                src={`${image.url}`}
                                                alt={image.alternativeText || `Miniatura ${index + 1}`}
                                                className="w-full h-full object-contain p-0.5 sm:p-1 group-hover:scale-110 transition-transform duration-200"
                                            />
                                        </div>

                                        {/* Active indicator */}
                                        {selectedImageIndex === index && (
                                            <div className={`absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 ${colorConfig.bgColor} rounded-full flex items-center justify-center`}>
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                            </div>
                                        )}

                                        {/* Image number overlay */}
                                        <div className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded">
                                            {index + 1}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Certification Info */}
                <div className={`mt-4 sm:mt-6 bg-gradient-to-r ${colorConfig.gradientFrom} ${colorConfig.gradientTo} rounded-xl sm:rounded-2xl p-3 sm:p-4 border ${colorConfig.borderColor} hidden sm:block`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm gap-2 sm:gap-0">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-700 font-medium">
                                {isElectrical ? 'Certificación eléctrica vigente' : 'Certificación vigente'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 ${colorConfig.dotColor} rounded-full`}></div>
                            <span className="text-gray-700">
                                {isElectrical ? 'Calidad garantizada' : 'Garantía incluida'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarouselProduct;