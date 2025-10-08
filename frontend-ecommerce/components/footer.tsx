'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Shield, Zap, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useGetCatalogos } from '@/api/useGetCatalogos';
import { useGetCategories } from '@/api/useGetCategories';
import Link from 'next/link';
import { ResponseType } from '@/types/response';

// Componente para mostrar la lista de catálogos
const CatalogosFooterList = () => {
    const { result, loading, error }: ResponseType = useGetCatalogos();
    
    if (loading) return <div className="text-sm text-gray-500">Cargando catálogos...</div>;
    if (error) return <div className="text-sm text-red-500">Error al cargar catálogos</div>;
    
    return (
        <ul className="space-y-2 text-sm">
            {result && Array.isArray(result) && result.map((catalogo: any) => (
                <li key={catalogo.id}>
                    <Link 
                        href={`/catalogo/${catalogo.slug}`} 
                        className="text-gray-800 hover:text-orange-500 transition-colors"
                    >
                        {catalogo.nameCatalogo}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

// Componente para mostrar las categorías destacadas
const FeaturedCategoriesFooterList = () => {
    const { result, loading, error }: ResponseType = useGetCategories();
    
    if (loading) return <div className="text-sm text-gray-500">Cargando categorías...</div>;
    if (error) return <div className="text-sm text-red-500">Error al cargar categorías</div>;
    
    // Filtrar categorías con isFeatured = true
    const featuredCategories = result && Array.isArray(result) 
        ? result.filter((category: any) => category.isFeatured === true)
        : [];
    
    return (
        <ul className="space-y-2 text-sm">
            {featuredCategories.map((category: any) => (
                <li key={category.id}>
                    <Link 
                        href={`/categoria/${category.slug}`} 
                        className="text-gray-800 hover:text-orange-500 transition-colors"
                    >
                        {category.categoryName}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-gray-800">
            {/* Sección principal */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Logo y descripción */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg mr-3">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src="logo/logo.webp" alt="Logo ZIME" className='w-full h-24' />
                            </div>
                        </div>
                        <p className="text-gray-800 text-sm leading-relaxed">
                            Tu socio confiable en equipos de protección personal y material eléctrico de alta calidad.
                        </p>
                    </div>

                    {/* Catálogos */}
                    <div>
                        <h4 className="font-semibold mb-4 text-yellow-500">Catálogos</h4>
                        <CatalogosFooterList />
                    </div>

                    {/* Categorías Destacadas */}
                    <div>
                        <h4 className="font-semibold mb-4 text-yellow-500">Categorías Destacadas</h4>
                        <FeaturedCategoriesFooterList />
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="font-semibold mb-4 text-yellow-500">Contacto</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 text-orange-500 mr-2" />
                                <span className="text-gray-800">+52 55 6091 3395</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 text-orange-500 mr-2" />
                                <span className="text-gray-800">contacto@zime.com.mx</span>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                                <span className="text-gray-800">Av Sor Juana Ines de la Cruz s/n<br />Ricardo Flores Magon,<br /> 54607 Tepotzotlán, Méx.</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 text-orange-500 mr-2" />
                                <span className="text-gray-800">Lun - Vie: 8:00 - 18:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separador con degradado */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

                {/* Certificaciones y enlaces rápidos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h4 className="font-semibold mb-3 text-orange-500 text-sm">Certificaciones</h4>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-800">
                            <span className="bg-gray-300 px-3 py-1 rounded-full">ISO 9001</span>
                            <span className="bg-gray-300 px-3 py-1 rounded-full">ANSI/ISEA</span>
                            <span className="bg-gray-300 px-3 py-1 rounded-full">CE Mark</span>
                            <span className="bg-gray-300 px-3 py-1 rounded-full">STPS</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 text-orange-500 text-sm">Nuestros Servicios</h4>
                        <div className="flex gap-1 text-xs text-gray-800">
                            <p>• Asesoría Técnica especializada</p>
                            <p>• Capacitación en uso de equipos</p>
                            <p>• Mantenimiento preventivo y correctivo</p>
                            <p>• Soporte técnico 24/7</p>
                            <p>• Garantía extendida en productos seleccionados</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="bg-gray-950 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-2 md:mb-0">
                            <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                            <p className="text-gray-200 text-sm">
                                © 2024 ZIME. Todos los derechos reservados.
                            </p>
                        </div>
                        <div className="text-gray-200 text-xs">
                            Protegiendo vidas, impulsando el futuro
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;