"use client";

import { Lightbulb, Zap, Star, Award, CheckCircle, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeaturedProducts from "./featured-products";
import { useGetFeaturedProductsLuminarias } from "@/api/luminarias/useGetFeaturedProductsLuminarias";
import { useGetFeaturedProductsLuminariasPhilco } from "@/api/luminarias/useGetFeaturedProductsLuminariasPhilco";
import { useGetFeaturedProductsLuminariasTecnoled } from "@/api/luminarias/useGetFeaturedProductsLuminariasTecnoled";
import { useGetFeaturedProductsLuminariasSupraAube } from "@/api/luminarias/useGetFeaturedProductsLuminariasSupraAube";
import { ResponseType } from "@/types/response";
import { useRouter } from "next/navigation";
import { useGetFeaturedProductsLuminariasLumiance } from "@/api/luminarias/useGetFeaturedProductsLuminariasLumiance";

import { useGetFeaturedProductsLuminariasLEDVANCE } from "@/api/luminarias/useGetFeaturedProductsLuminariasLEDVANCE";

const LuminariasClient = () => {
    const router = useRouter();

    // Obtenemos los productos destacados de luminarias LUCECO
    const { loading, result }: ResponseType = useGetFeaturedProductsLuminarias();

    // Obtenemos los productos destacados de luminarias PHILCO
    const { loading: loadingPhilco, result: resultPhilco }: ResponseType = useGetFeaturedProductsLuminariasPhilco();

    // Obtenemos los productos destacados de luminarias TECNOLED
    const { loading: loadingTecnoled, result: resultTecnoled }: ResponseType = useGetFeaturedProductsLuminariasTecnoled();

    // Obtenemos los productos destacados de luminarias SUPRA/AUBE
    const { loading: loadingSupraAube, result: resultSupraAube }: ResponseType = useGetFeaturedProductsLuminariasSupraAube();

    // Obtenemos los productos destacados de luminarias LUMIANCE
    const { loading: loadingLumiance, result: resultLumiance }: ResponseType = useGetFeaturedProductsLuminariasLumiance();

    // Obtenemos los productos destacados de luminarias LEDVANCE
    const { loading: loadingLEDVANCE, result: resultLEDVANCE }: ResponseType = useGetFeaturedProductsLuminariasLEDVANCE();


    const marcas = [
        { name: "LUCECO", logo: "luminarias/luceco.png", specialty: "Comercial" },
        { name: "PHILCO", logo: "luminarias/philco.png", specialty: "Residencial" },
        { name: "TECNOLED", logo: "luminarias/tecnoled.png", specialty: "LED Tech" },
        { name: "SUPRA", logo: "luminarias/supra.png", specialty: "Profesional" },
        { name: "LEDVANCE", logo: "luminarias/ledvance.png", specialty: "Smart LED" },
        { name: "LUMIANCE", logo: "luminarias/lumiance.png", specialty: "Smart LED" }
    ];


    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="min-h-[600px] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white py-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center">
                        <div className="flex justify-center mb-1">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                                <Lightbulb className="w-9 h-9 text-white" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-5xl font-bold mb-1 leading-tight">
                            Ilumina tu
                            <span className="text-yellow-200"> Futuro</span>
                        </h1>
                        <p className="md:text-xl text-orange-100 mb-3 max-w-4xl mx-auto leading-relaxed">
                            Somos proveedores oficiales de las marcas más reconocidas en iluminación LED.
                            Calidad, eficiencia y tecnología de vanguardia para todos tus proyectos.
                        </p>
                        <div className="flex justify-center items-center gap-3 mt-3 mb-5">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Award className="w-5 h-5" />
                                <span className="font-semibold">Proveedores Oficiales</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Shield className="w-5 h-5" />
                                <span className="font-semibold">Garantía Completa</span>
                            </div>
                        </div>

                        {/* Marcas */}
                        <div className="mt-1">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-7xl mx-auto">
                                {marcas.map((marca, index) => (
                                    <button
                                    onClick={() => router.push(`/marca/${marca.name}`)}
                                        key={index}
                                        className="group bg-white backdrop-blur-md rounded-2xl p-1 flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
                                    >
                                        <img
                                            src={marca.logo}
                                            alt={marca.name}
                                            className="h-12 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-orange-200 mt-3 opacity-75 text-center">
                                ⚡ Cada marca con garantía de fábrica y soporte técnico especializado
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección LUCECO */}
            <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="luceco-heading">
                <div className="max-w-7xl mx-auto">
                    {/* Header de sección */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
                            <Zap className="w-4 h-4 text-blue-600" aria-hidden="true" />
                            <span className="text-sm font-medium text-blue-600">Material Eléctrico Profesional</span>
                        </div>
                        <h2 id="luceco-heading" className="text-4xl font-bold text-gray-900 mb-3">
                            Material Eléctrico <span className="text-blue-600">LUCECO</span> - Iluminación LED y Equipos Eléctricos
                        </h2>
                        <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
                            LUCECO es líder en soluciones de iluminación LED y material eléctrico profesional.
                            Ofrecemos <strong>productos LUCECO</strong> de alta eficiencia energética:
                            luminarias industriales, focos LED, paneles solares y material eléctrico certificado
                            para instalaciones comerciales y residenciales en México.
                        </p>

                        {/* Keywords adicionales para SEO */}
                        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">Iluminación LED</span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">Focos Ahorradores</span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">Luminarias Industriales</span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">Paneles LED</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="mb-6 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="relative w-8 h-8">
                                    <div className="absolute inset-0 rounded-full border-2 border-yellow-300 border-t-transparent animate-spin"></div>
                                </div>
                                <span className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                                    Cargando productos Destacados
                                </span>
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.0s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.15s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.3s]"></span>
                            </div>
                        </div>
                    ) : null}
                    <FeaturedProducts products={result || []} />

                    {/* OPCIÓN 1: Botón después de los productos - MÁS RECOMENDADO */}
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => router.push('/marca/LUCECO')}
                            className="cursor-pointer group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Ver todos los productos LUCECO
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Texto SEO adicional */}
                    <div className="mt-12 text-center max-w-4xl mx-auto">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            LUCECO es líder en material eléctrico y soluciones de iluminación LED en México.
                            Ofrecemos productos certificados con garantía, ideales para proyectos residenciales,
                            comerciales e industriales. Envíos a toda la República Mexicana.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección PHILCO */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="philco-heading">
                <div className="max-w-7xl mx-auto">
                    {/* Header de sección */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-4">
                            <Shield className="w-4 h-4 text-orange-600" aria-hidden="true" />
                            <span className="text-sm font-medium text-orange-600">Equipamiento Profesional Industrial</span>
                        </div>
                        <h2 id="philco-heading" className="text-4xl font-bold text-gray-900 mb-3">
                            Herramientas <span className="text-orange-600">PHILCO</span> - Equipos Profesionales e Industriales
                        </h2>
                        <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
                            Encuentra las mejores <strong>herramientas PHILCO</strong>: equipos industriales,
                            herramientas eléctricas, equipamiento profesional y soluciones para talleres.
                            Durabilidad y rendimiento garantizado para profesionales y empresas en toda la República Mexicana.
                        </p>

                        {/* Keywords adicionales para SEO */}
                        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
                            <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full">Herramientas Eléctricas</span>
                            <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full">Equipos Industriales</span>
                            <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full">Maquinaria Profesional</span>
                            <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full">Herramientas de Taller</span>
                        </div>
                    </div>

                    {loadingPhilco ? (
                        <div className="mb-6 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="relative w-8 h-8">
                                    <div className="absolute inset-0 rounded-full border-2 border-yellow-300 border-t-transparent animate-spin"></div>
                                </div>
                                <span className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                                    Cargando productos Destacados
                                </span>
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.0s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.15s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.3s]"></span>
                            </div>
                        </div>
                    ) : null}
                    <FeaturedProducts products={resultPhilco || []} />

                    {/* Botón después de los productos */}
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => router.push('/marca/PHILCO')}
                            className="cursor-pointer group inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Ver todos los productos PHILCO
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Texto SEO adicional */}
                    <div className="mt-12 text-center max-w-4xl mx-auto">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            PHILCO ofrece equipamiento profesional de grado industrial para talleres,
                            fábricas y proyectos de construcción. Herramientas de alta calidad con
                            garantía de fábrica y servicio post-venta. Distribuidor autorizado en México.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección TECNOLED */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50" aria-labelledby="tecnoled-heading">
                <div className="max-w-7xl mx-auto">
                    {/* Header de sección */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-4">
                            <Zap className="w-4 h-4 text-green-600" aria-hidden="true" />
                            <span className="text-sm font-medium text-green-600">Tecnología LED Avanzada</span>
                        </div>
                        <h2 id="tecnoled-heading" className="text-4xl font-bold text-gray-900 mb-3">
                            Iluminación <span className="text-green-600">TECNOLED</span> - Soluciones LED de Alta Eficiencia
                        </h2>
                        <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
                            Descubre la innovación en <strong>iluminación TECNOLED</strong>: productos LED de última generación,
                            eficientes energéticamente y con tecnología de vanguardia para aplicaciones residenciales,
                            comerciales e industriales en toda la República Mexicana.
                        </p>

                        {/* Keywords adicionales para SEO */}
                        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">Tecnología LED</span>
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">Ahorro Energético</span>
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">Iluminación Inteligente</span>
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">Soluciones Sustentables</span>
                        </div>
                    </div>

                    {loadingTecnoled ? (
                        <div className="mb-6 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="relative w-8 h-8">
                                    <div className="absolute inset-0 rounded-full border-2 border-yellow-300 border-t-transparent animate-spin"></div>
                                </div>
                                <span className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                                    Cargando productos Destacados
                                </span>
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.0s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.15s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.3s]"></span>
                            </div>
                        </div>
                    ) : null}
                    <FeaturedProducts products={resultTecnoled || []} />

                    {/* Botón después de los productos */}
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => router.push('/marca/TECNOLED')}
                            className="cursor-pointer group inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Ver todos los productos TECNOLED
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Texto SEO adicional */}
                    <div className="mt-12 text-center max-w-4xl mx-auto">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            TECNOLED ofrece soluciones de iluminación LED de alta eficiencia para proyectos
                            residenciales, comerciales e industriales. Productos con garantía y certificación
                            que combinan innovación, ahorro energético y respeto al medio ambiente.
                            Distribuidor autorizado en México.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección SUPRA/AUBE */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="supraaube-heading">
                <div className="max-w-7xl mx-auto">
                    {/* Header de sección */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-4">
                            <Star className="w-4 h-4 text-purple-600" aria-hidden="true" />
                            <span className="text-sm font-medium text-purple-600">Iluminación Profesional</span>
                        </div>
                        <h2 id="supraaube-heading" className="text-4xl font-bold text-gray-900 mb-3">
                            Soluciones <span className="text-purple-600">SUPRA/AUBE</span> - Iluminación de Alta Calidad
                        </h2>
                        <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
                            Descubre la excelencia en <strong>iluminación SUPRA/AUBE</strong>: productos de alta calidad,
                            diseño superior y rendimiento excepcional para aplicaciones residenciales,
                            comerciales e industriales en toda la República Mexicana.
                        </p>

                        {/* Keywords adicionales para SEO */}
                        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">Iluminación Profesional</span>
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">Diseño Superior</span>
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">Alta Durabilidad</span>
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">Eficiencia Energética</span>
                        </div>
                    </div>

                    {loadingSupraAube ? (
                        <div className="mb-6 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="relative w-8 h-8">
                                    <div className="absolute inset-0 rounded-full border-2 border-yellow-300 border-t-transparent animate-spin"></div>
                                </div>
                                <span className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                                    Cargando productos Destacados
                                </span>
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.0s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.15s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.3s]"></span>
                            </div>
                        </div>
                    ) : null}
                    <FeaturedProducts products={resultSupraAube || []} />

                    {/* Botón después de los productos */}
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => router.push('/marca/SUPRA-AUBE')}
                            className="cursor-pointer group inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Ver todos los productos SUPRA/AUBE
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Texto SEO adicional */}
                    <div className="mt-12 text-center max-w-4xl mx-auto">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            SUPRA/AUBE ofrece soluciones de iluminación de alta calidad para proyectos
                            residenciales, comerciales e industriales. Productos con garantía y certificación
                            que combinan diseño, durabilidad y eficiencia.
                            Distribuidor autorizado en México.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección LUMIANCE */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50" aria-labelledby="lumiance-heading">
                <div className="max-w-7xl mx-auto">
                    {/* Header de sección */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
                            <Star className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                            <span className="text-sm font-medium text-indigo-600">Iluminación Arquitectónica Premium</span>
                        </div>
                        <h2 id="lumiance-heading" className="text-4xl font-bold text-gray-900 mb-3">
                            Iluminación <span className="text-indigo-600">Lumiance</span> - Diseño y Precisión Lumínica
                        </h2>
                        <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
                            Experimenta la sofisticación con <strong>iluminación Lumiance</strong>: soluciones arquitectónicas premium,
                            control lumínico preciso y diseño europeo para espacios comerciales, oficinas y proyectos
                            de alto valor estético en toda la República Mexicana.
                        </p>

                        {/* Keywords adicionales para SEO */}
                        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">Iluminación Arquitectónica</span>
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">Control Lumínico</span>
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">Diseño Premium</span>
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">Iluminación Comercial</span>
                        </div>
                    </div>

                    {loadingLumiance ? (
                        <div className="mb-6 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="relative w-8 h-8">
                                    <div className="absolute inset-0 rounded-full border-2 border-yellow-300 border-t-transparent animate-spin"></div>
                                </div>
                                <span className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                                    Cargando productos Destacados
                                </span>
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.0s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.15s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.3s]"></span>
                            </div>
                        </div>
                    ) : null}
                    <FeaturedProducts products={resultLumiance || []} />

                    {/* Botón después de los productos */}
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => router.push('/marca/LUMIANCE')}
                            className="cursor-pointer group inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Ver todos los productos Lumiance
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Texto SEO adicional */}
                    <div className="mt-12 text-center max-w-4xl mx-auto">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Lumiance ofrece soluciones de iluminación arquitectónica premium con tecnología europea.
                            Especialistas en proyectos comerciales, oficinas y espacios que requieren diseño superior
                            y control lumínico preciso. Productos con garantía y soporte técnico especializado.
                            Distribuidor autorizado en México.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección LEDVANCE */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="ledvance-heading">
                <div className="max-w-7xl mx-auto">
                    {/* Header de sección */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full mb-4">
                            <Zap className="w-4 h-4 text-cyan-600" aria-hidden="true" />
                            <span className="text-sm font-medium text-cyan-600">Innovación LED Inteligente</span>
                        </div>
                        <h2 id="ledvance-heading" className="text-4xl font-bold text-gray-900 mb-3">
                            Tecnología <span className="text-cyan-600">LEDVANCE</span> - El Futuro de la Iluminación LED
                        </h2>
                        <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
                            Transforma tus espacios con <strong>iluminación LEDVANCE</strong>: heredera de OSRAM, líder mundial
                            en tecnología LED inteligente, soluciones conectadas y productos de máxima eficiencia energética
                            para aplicaciones residenciales, comerciales e industriales en toda la República Mexicana.
                        </p>

                        {/* Keywords adicionales para SEO */}
                        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
                            <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full">Iluminación Inteligente</span>
                            <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full">Smart LED</span>
                            <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full">Tecnología OSRAM</span>
                            <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full">Máxima Eficiencia</span>
                        </div>
                    </div>

                    {loadingLEDVANCE ? (
                        <div className="mb-6 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="relative w-8 h-8">
                                    <div className="absolute inset-0 rounded-full border-2 border-yellow-300 border-t-transparent animate-spin"></div>
                                </div>
                                <span className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                                    Cargando productos Destacados
                                </span>
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.0s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.15s]"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.3s]"></span>
                            </div>
                        </div>
                    ) : null}
                    <FeaturedProducts products={resultLEDVANCE || []} />

                    {/* Botón después de los productos */}
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => router.push('/marca/LEDVANCE')}
                            className="cursor-pointer group inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Ver todos los productos LEDVANCE
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Texto SEO adicional */}
                    <div className="mt-12 text-center max-w-4xl mx-auto">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            LEDVANCE, heredera de la tecnología OSRAM, ofrece las soluciones LED más avanzadas del mercado.
                            Especialistas en iluminación inteligente, conectividad y productos de máxima eficiencia energética.
                            Garantía internacional y soporte técnico especializado. Distribuidor autorizado en México.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default LuminariasClient;
