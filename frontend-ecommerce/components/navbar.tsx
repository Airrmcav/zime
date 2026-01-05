/* eslint-disable @next/next/no-img-element */
"use client"
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, Menu, X, Phone, Mail, MapPin, Package2, Loader2, Shield, ChevronRight } from 'lucide-react';
import { BsWhatsapp } from "react-icons/bs";
import { useLovedProducts } from '@/hooks/use-loved-products';
import { useCart } from '@/hooks/use-cart';
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";
import SearchDropdown from "./SearchDropdown";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useGetCategories } from "@/api/useGetCategories";
import Link from "next/link"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { lovedItems } = useLovedProducts();
    const cart = useCart();
    const router = useRouter();

    const { result: categories, loading: categoriesLoading, error }: ResponseType = useGetCategories();

    // Función para crear URLs amigables sin acentos
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

    // Ordenar categorías alfabéticamente
    const sortedCategories = categories ? [...categories].sort((a, b) =>
        a.categoryName.localeCompare(b.categoryName)
    ) : [];

    return (
        <div className="w-full">
            {/* Barra de contacto superior */}
            <div className="bg-orange-400 py-2">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between text-sm font-normal">
                        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                            <span className="text-black font-normal text-center sm:text-left">¡Envíos a todo México! Cotiza ahora</span>
                        </div>
                        <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4 text-xs sm:text-sm">
                            <div className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>+52 55 1007 0205</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>+52 55 1007 0205</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span>contacto@zime.com.mx</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar principal */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-auto">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <button onClick={() => router.push("/")} className="cursor-pointer">
                                <img src="/logo/logo.webp" alt="Logo ZIME" className='w-full h-24' />
                            </button>
                        </div>

                        {/* Buscador desktop */}
                        <div className="hidden lg:flex flex-1 w-full mx-8">
                            <div className="relative w-full">
                                <SearchDropdown />
                            </div>
                        </div>

                        {/* Iconos de acción desktop */}
                        <div className="hidden lg:flex items-center space-x-6">
                            <button
                                className="cursor-pointer text-gray-600 flex gap-x-2 hover:text-orange-500 transition-colors"
                                onClick={() => router.push("/productos-favoritos")}
                            >
                                <Heart className={`w-6 h-6 ${lovedItems.length > 0 && 'fill-red-300'}`} />
                                Mis Favoritos
                            </button>

                            <div className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition-colors">
                                <MapPin className="w-5 h-5" />
                                <span>México</span>
                            </div>

                            <div className="relative flex gap-x-2 text-gray-600 hover:text-orange-500 transition-colors">
                                <button onClick={() => router.push("/carrito")} className="relative flex space-x-2 cursor-pointer">
                                    <ShoppingCart className="w-6 h-6" />
                                    {cart.items.length > 0 && (
                                        <span className="absolute -top-2 left-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                            {cart.items.length}
                                        </span>
                                    )}
                                    Carrito
                                </button>
                            </div>
                        </div>

                        {/* Botones mobile */}
                        <div className="flex lg:hidden items-center space-x-4">
                            <button
                                onClick={() => router.push("/productos-favoritos")}
                                className="text-gray-600 hover:text-orange-500"
                            >
                                <Heart className={`w-5 h-5 ${lovedItems.length > 0 && 'fill-red-300'}`} />
                            </button>
                            <button
                                onClick={() => router.push("/carrito")}
                                className="text-gray-600 hover:text-orange-500 relative"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {cart.items.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                                        {cart.items.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-gray-600 hover:text-orange-500"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-600 hover:text-orange-500"
                            >
                                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Buscador mobile */}
                    {isSearchOpen && (
                        <div className="lg:hidden py-4 px-4">
                            <div className="relative">
                                <SearchDropdown />
                            </div>
                        </div>
                    )}
                </div>

                {/* Menú de navegación desktop */}
                <div className="bg-white py-2">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="hidden lg:flex items-center justify-between py-1">
                            <div className="flex space-x-3 uppercase">
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger className="uppercase cursor-pointer bg-transparent hover:bg-orange-50 data-[state=open]:bg-orange-50 transition-colors">
                                                <Shield className="w-4 h-4 mr-2 text-orange-500" />
                                                Productos EPP
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <div className="w-[900px] capitalize h-96">
                                                    {/* Header del menú */}
                                                    

                                                    <div className="grid grid-cols-[300px_1fr] gap-0">
                                                        {/* Sección izquierda - Ver todos */}
                                                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 border-r border-orange-200">
                                                            <NavigationMenuLink
                                                                className="flex flex-col h-62 select-none space-y-4 rounded-xl p-6 leading-none no-underline outline-none transition-all bg-white hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 hover:text-white border-2 border-orange-200 hover:border-orange-500 hover:shadow-xl group cursor-pointer"
                                                                onClick={() => router.push("/categoria/todos")}
                                                                asChild
                                                            >
                                                                <a>
                                                                    <div className="flex items-center justify-center mb-4">
                                                                        <div className="p-4 bg-gradient-to-br from-orange-400 to-orange-500 group-hover:from-white group-hover:to-white rounded-2xl shadow-lg group-hover:shadow-orange-200 transition-all">
                                                                            <Package2 className="w-10 h-10 text-white group-hover:text-orange-500 transition-colors" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="space-y-2 text-center">
                                                                        
                                                                        <p className="text-sm leading-relaxed text-orange-700 group-hover:text-orange-100 transition-colors">
                                                                            Explora nuestra línea completa de equipos de protección personal certificados
                                                                        </p>
                                                                    </div>
                                                                    <div className="mt-auto pt-1 flex items-center justify-center text-orange-600 group-hover:text-white transition-colors">
                                                                        <span className="text-sm font-semibold">Ver productos</span>
                                                                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                                    </div>
                                                                </a>
                                                            </NavigationMenuLink>

                                                            {/* Contador de categorías */}
                                                            <div className="mt-4 p-3 bg-white rounded-lg border border-orange-200 shadow-sm">
                                                                {categoriesLoading ? (
                                                                    <div className="flex items-center justify-center gap-2 text-xs text-orange-600">
                                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                                        Cargando...
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-center">
                                                                        <div className="text-2xl font-bold text-orange-600">
                                                                            {sortedCategories.length}
                                                                        </div>
                                                                        <div className="text-xs text-orange-800 font-medium">
                                                                            Categorías disponibles
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Lista de categorías - lado derecho */}
                                                        <div className="bg-white p-6">
                                                            {categoriesLoading ? (
                                                                <div className="flex items-center justify-center h-full">
                                                                    <div className="flex flex-col items-center gap-3">
                                                                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                                                                        <span className="text-sm text-gray-600 font-medium">Cargando categorías...</span>
                                                                    </div>
                                                                </div>
                                                            ) : error ? (
                                                                <div className="flex items-center justify-center h-full">
                                                                    <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                                                                        <p className="text-sm text-red-600 font-medium">Error al cargar categorías</p>
                                                                    </div>
                                                                </div>
                                                            ) : sortedCategories.length === 0 ? (
                                                                <div className="flex items-center justify-center h-full">
                                                                    <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                                                                        <p className="text-sm text-gray-600">No hay categorías disponibles</p>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-2">
                                                                    <div className="mb-4">
                                                                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">Nuestras Categorías</h4>
                                                                        <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"></div>
                                                                    </div>
                                                                    
                                                                    <div className="max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-50 pr-3">
                                                                        <div className="grid grid-cols-2 gap-2">
                                                                            {sortedCategories.map((category: CategoryType) => (
                                                                                <NavigationMenuLink key={category.id} asChild>
                                                                                    <Link
                                                                                        href={`/categoria/${createSlug(category.categoryName)}`}
                                                                                        className="group block select-none rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 border border-gray-100 hover:border-orange-300 hover:shadow-md bg-white"
                                                                                    >
                                                                                        <div className="flex items-start gap-3">
                                                                                            <div className="p-2 bg-orange-100 group-hover:bg-orange-500 rounded-lg transition-all group-hover:scale-110 flex-shrink-0">
                                                                                                <Shield className="w-4 h-4 text-orange-600 group-hover:text-white transition-colors" />
                                                                                            </div>
                                                                                            <div className="flex-1 min-w-0">
                                                                                                <div className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1 leading-tight">
                                                                                                    {category.categoryName}
                                                                                                </div>
                                                                                                <p className="text-xs leading-snug text-gray-600 group-hover:text-orange-700 transition-colors line-clamp-2">
                                                                                                    Equipos certificados de {category.categoryName.toLowerCase()}
                                                                                                </p>
                                                                                            </div>
                                                                                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                                                                                        </div>
                                                                                    </Link>
                                                                                </NavigationMenuLink>
                                                                            ))}
                                                                        </div>
                                                                    </div>

                                                                    {/* Footer con indicador */}
                                                                    {sortedCategories.length > 6 && (
                                                                        <div className="mt-4 pt-3 border-t border-orange-100">
                                                                            <div className="flex items-center justify-center gap-2 text-orange-600">
                                                                                <div className="flex gap-1">
                                                                                    <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce"></div>
                                                                                    <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                                                    <div className="w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                                                </div>
                                                                                <span className="text-xs font-medium">Desliza para ver más</span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>

                                {/* Categorías destacadas */}
                                {!categoriesLoading && sortedCategories && sortedCategories
                                    .filter((category: CategoryType) => category.isFeatured)
                                    .map((category: CategoryType) => (
                                        <Link
                                            key={category.id}
                                            href={`/catalogo/${createSlug(category.categoryName)}`}
                                            className="inline-flex items-center px-1 py-1 bg-orange-500 hover:bg-orange-600 text-[12px] text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                        >
                                            {category.categoryName}
                                        </Link>
                                    ))
                                }

                                <Link
                                    href="/luminarias"
                                    className="inline-flex items-center px-2 py-1 bg-orange-500 hover:bg-orange-600 text-[12px] text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                >
                                    Luminarias por marca
                                </Link>

                                <Link
                                    href="/nosotros"
                                    className="inline-flex items-center px-2 py-1 bg-orange-500 hover:bg-orange-600 text-[12px] text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                >
                                    Nosotros
                                </Link>
                            </div>

                            <div className='flex gap-x-6 uppercase text-gray-700'>
                                <a
                                    href="https://wa.me/525560913395?text=Solicito%20asesoramiento%20sobre%20algunos%20productos.%20De%20la%20página%20de%20ZIME.COM.MX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1 hover:text-orange-500 transition-colors"
                                >
                                    <BsWhatsapp className="w-5 h-5 text-orange-500" />
                                    <span className="font-normal">Asesoría WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Menú mobile desplegable */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
                    <div className="px-4 py-4 space-y-4">
                        {/* Enlaces principales */}
                        <div className="space-y-3">
                            <Link
                                href="/categoria/todos"
                                className="block text-gray-700 hover:text-orange-500 font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Productos
                            </Link>
                            <Link
                                href="/luminarias"
                                className="block text-gray-700 hover:text-orange-500 font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Luminarias
                            </Link>
                            <Link
                                href="/nosotros"
                                className="block text-gray-700 hover:text-orange-500 font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Nosotros
                            </Link>
                        </div>

                        {/* Información de contacto */}
                        <div className="py-3 space-y-3 border-t border-gray-200">
                            <div className="flex items-center space-x-2 text-gray-700">
                                <Package2 className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">¡Envíos a todo México! Cotiza ahora</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-700">
                                <Phone className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">+52 55 1007 0205</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-700">
                                <Mail className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">contacto@zime.com.mx</span>
                            </div>
                        </div>

                        {/* Botón WhatsApp mobile */}
                        <a
                            href="https://wa.me/525510070205?text=Solicito%20asesoramiento%20sobre%20algunos%20productos.%20De%20la%20página%20de%20ZIME.COM.MX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                        >
                            <BsWhatsapp className="w-5 h-5" />
                            <span className="font-medium">Asesoría WhatsApp</span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;