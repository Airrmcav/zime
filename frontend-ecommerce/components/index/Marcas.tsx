/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react';

const Marcas = () => {
    // Marcas de ejemplo con sus logos (URLs de ejemplo)
    const brands = [
        {
            name: "3M",
            logo: "https://logos-world.net/wp-content/uploads/2020/09/3M-Logo.png",
            alt: "3M Logo"
        },
        {
            name: "Honeywell",
            logo: "https://logos-world.net/wp-content/uploads/2020/11/Honeywell-Logo.png",
            alt: "Honeywell Logo"
        },
        {
            name: "MSA Safety",
            logo: "https://www.msasafety.com/globalassets/images/msa-logo.svg",
            alt: "MSA Safety Logo"
        },
        {
            name: "DuPont",
            logo: "https://logos-world.net/wp-content/uploads/2020/09/DuPont-Logo.png",
            alt: "DuPont Logo"
        },
        {
            name: "Ansell",
            logo: "https://www.ansell.com/-/media/ansell/logos/ansell-logo.svg",
            alt: "Ansell Logo"
        },
        {
            name: "Kimberly Clark",
            logo: "https://logos-world.net/wp-content/uploads/2020/09/Kimberly-Clark-Logo.png",
            alt: "Kimberly Clark Logo"
        },
        {
            name: "Uvex",
            logo: "https://www.uvex-safety.com/app/uploads/sites/14/2019/05/uvex-logo.svg",
            alt: "Uvex Logo"
        },
        {
            name: "Moldex",
            logo: "https://www.moldex.com/assets/img/moldex-logo.svg",
            alt: "Moldex Logo"
        }
    ];

    // Duplicamos las marcas para crear un efecto infinito
    const duplicatedBrands = [...brands, ...brands, ...brands];

    return (
        <div className="bg-white py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Título de la sección */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Nuestras <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Marcas</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Trabajamos con las marcas líderes mundiales en equipos de protección personal y material eléctrico
                    </p>
                </div>

                {/* Container del carousel */}
                <div className="relative">
                    {/* Gradientes de desvanecimiento en los bordes */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
                    
                    {/* Carousel wrapper */}
                    <div className="flex animate-scroll">
                        {duplicatedBrands.map((brand, index) => (
                            <div
                                key={`${brand.name}-${index}`}
                                className="flex-shrink-0 mx-8 group cursor-pointer"
                            >
                                <div className="w-32 h-20 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg">
                                    <img
                                        src={brand.logo}
                                        alt={brand.alt}
                                        className="max-w-24 max-h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                                        onError={(e) => {
                                            // Fallback en caso de error al cargar imagen
                                            (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 100 40"><rect width="100" height="40" fill="%23f3f4f6"/><text x="50" y="25" font-family="Arial" font-size="12" text-anchor="middle" fill="%236b7280">${brand.name}</text></svg>`;
                                        }}
                                    />
                                </div>
                                {/* Nombre de la marca (opcional, aparece en hover) */}
                                <p className="text-center text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {brand.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Estadísticas de marcas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                        <p className="text-gray-700">Marcas Certificadas</p>
                    </div>
                    <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-200">
                        <div className="text-3xl font-bold text-yellow-600 mb-2">15</div>
                        <p className="text-gray-700">Años de Experiencia</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="text-3xl font-bold text-orange-600 mb-2">1000+</div>
                        <p className="text-gray-700">Productos Disponibles</p>
                    </div>
                </div>
            </div>

            {/* CSS personalizado para la animación */}
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }

                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }

                /* Alternativa más rápida */
                @keyframes scrollFast {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }

                .animate-scroll-fast {
                    animation: scrollFast 15s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Marcas;