"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Eye,
  Heart,
  Zap,
  Shield,
  Award,
  Lightbulb,
  Package,
  ShieldCheck,
  Briefcase,
  Droplet,
} from "lucide-react";
import Link from "next/link";

const CarouselText = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      type: "promotion",
      title: "Soluciones en Seguridad Industrial",
      subtitle: "Equipos de Protección Personal y Luminarias Industriales",
      description:
        "Somos expertos en seguridad industrial. Ofrecemos una amplia gama de equipos de protección personal (EPIs) y materiales eléctricos certificados para proteger a tus trabajadores y optimizar tus proyectos.",
      buttonText: "Conoce Nuestra Empresa",
      background: "from-yellow-500  to-blue-800",
      icon: <Award className="w-12 h-12 text-white" />,
      image: "carousel/2.png",
      badge: "SEGURIDAD INDUSTRIAL",
      badgeColor: "bg-red-500",
      catalogoSlug: "/nosotros",
    },
    {
      id: 2,
      type: "lighting",
      title:
        "Luminarias Industriales, Comerciales y Residenciales | Venta e Iluminación LED",
      subtitle: "Reflectores, Paneles y Lámparas",
      description:
        "Ilumina tus proyectos con nuestra línea de luminarias LED de alta eficiencia y durabilidad.",
      buttonText: "Ver Luminarias",
      background: "from-yellow-300 via-orange-300 to-blue-600",
      icon: <Lightbulb className="w-12 h-12 text-white" />,
      image: "carousel/3.png",
      badge: "DESTACADO",
      badgeColor: "bg-yellow-500",
      catalogoSlug: "/catalogo/luminarias",
    },
    {
      id: 3,
      type: "category",
      title: "Cajas de cartón",
      subtitle: "Resistencia y Versatilidad",
      description:
        "Encuentra cajas de cartón ideales para embalaje, almacenamiento y envíos. Diseñadas para proteger tus productos con calidad y durabilidad.",
      buttonText: "Explorar Cajas",
      background: "from-amber-700 via-yellow-800 to-amber-600",
      icon: <Package className="w-12 h-12 text-white" />,
      image: "carousel/4.png",
      badge: "PROMOCIÓN",
      badgeColor: "bg-amber-900",
      catalogoSlug: "/catalogo/cajas-de-carton",
    },
    {
      id: 4,
      type: "service",
      title: "Equipo de Protección Personal",
      subtitle: "Seguridad y confianza en cada trabajo",
      description:
        "Descubre cascos, guantes, chalecos, lentes y más. Todo lo que necesitas para proteger a tu equipo en cualquier entorno laboral.",
      buttonText: "Ver Productos",
      background: "from-blue-600 via-gray-700 to-green-600",
      icon: <ShieldCheck className="w-12 h-12 text-white" />,
      image: "carousel/5.png",
      badge: "SEGURIDAD",
      badgeColor: "bg-blue-800",
      catalogoSlug: "/catalogo/epp",
    },
    {
      id: 5,
      type: "service",
      title: "Equipo de oficina",
      subtitle: "Productividad y organización para tu empresa",
      description:
        "Encuentra escritorios, sillas, archiveros y todo lo necesario para mantener tu oficina cómoda y eficiente.",
      buttonText: "Ver Catálogo",
      background: "from-gray-100 via-blue-200 to-gray-300",
      icon: <Briefcase className="w-12 h-12 text-gray-800" />,
      image: "carousel/6.png",
      badge: "OFICINA",
      badgeColor: "bg-gray-700",
      catalogoSlug: "/catalogo/equipo-de-oficina",
    },
    {
      id: 6,
      type: "service",
      title: "Productos de Limpieza",
      subtitle: "Higiene y frescura para tu espacio",
      description:
        "Encuentra detergentes, desinfectantes, paños, escobas y todo lo necesario para mantener tus espacios limpios y saludables.",
      buttonText: "Ver Productos",
      background: "from-blue-200 via-green-200 to-white",
      icon: <Droplet className="w-12 h-12 text-blue-500" />,
      image: "carousel/8.png",
      badge: "LIMPIEZA",
      badgeColor: "bg-blue-500",
      catalogoSlug: "/catalogo/productos-de-limpieza",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className="relative w-full h-96 md:h-[600px] overflow-hidden bg-gray-900 shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === currentSlide
                ? "translate-x-0 opacity-100 scale-100"
                : index < currentSlide
                  ? "-translate-x-full opacity-0 scale-95"
                  : "translate-x-full opacity-0 scale-95"
            }`}
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.background}`}
            />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12" />
            </div>

            {/* Content Container */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Text Content */}
                  <div className="text-white space-y-4 md:space-y-6">
                    {/* Badge */}
                    <div className="flex items-center space-x-3">
                      {slide.icon}
                      <span
                        className={`${slide.badgeColor} px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider animate-pulse`}
                      >
                        {slide.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fadeInUp">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-yellow-100 animate-fadeInUp delay-100">
                      {slide.subtitle}
                    </h2>

                    {/* Description */}
                    <p className="text-sm md:text-base text-yellow-50 leading-relaxed animate-fadeInUp delay-200 max-w-md">
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-fadeInUp delay-300">
                      <Link
                        href={slide.catalogoSlug}
                        className="group bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                      >
                        <span>{slide.buttonText}</span>
                        <ShoppingCart className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>

                  {/* Image/Visual Content */}
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm transform rotate-3" />
                      <div className="relative bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-[500px] object-contain rounded-lg"
                        />
                        <div className="absolute -top-3 -right-3 bg-yellow-400 text-gray-800 p-2 rounded-full shadow-lg animate-bounce">
                          <Star className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default CarouselText;
