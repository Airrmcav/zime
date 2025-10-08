/* eslint-disable @next/next/no-img-element */
"use client"
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, Menu, X, Phone, Mail, MapPin, Package2, Loader2 } from 'lucide-react';
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
                                <span>+52 55 6091 3395</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>+52 55 6091 3395</span>
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
                                <img src="logo/logo.webp" alt="Logo ZIME" className='w-full h-24' />
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
                                            <NavigationMenuTrigger className="uppercase cursor-pointer bg-transparent max-w-[130px]">
                                                Productos
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <div className="w-[400px] lg:w-[100px] xl:w-[600px] capitalize">
                                                    <div className="grid lg:grid-cols-[.75fr_1fr] gap-1 p-4">
                                                        {/* Sección principal - lado izquierdo */}
                                                        <div className="space-y-3 flex items-center">
                                                            <div>
                                                                <NavigationMenuLink
                                                                    className="flex flex-col items-center text-center select-none space-y-3 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 hover:shadow-md cursor-pointer"
                                                                    onClick={() => router.push("/categoria/todos")}
                                                                    asChild
                                                                >
                                                                    <a>
                                                                        <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl border border-blue-200">
                                                                            <Package2 className="w-6 h-6 text-blue-600" />
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <div className="text-sm font-semibold leading-none text-blue-900">
                                                                                Ver Todos los Productos
                                                                            </div>
                                                                            <p className="line-clamp-2 text-xs leading-snug text-blue-700">
                                                                                Explora nuestra amplia gama de materiales eléctricos y equipo de protección personal para tus proyectos.
                                                                            </p>
                                                                        </div>
                                                                    </a>
                                                                </NavigationMenuLink>

                                                                {/* Contador de categorías */}
                                                                <div className="flex items-center justify-center p-2 mt-2 bg-gray-50 rounded-lg border">
                                                                    {categoriesLoading ? (
                                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                            <Loader2 className="w-3 h-3 animate-spin" />
                                                                            Cargando...
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-xs text-gray-600 font-medium">
                                                                            {sortedCategories.length} categorías disponibles
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Lista de categorías - lado derecho */}
                                                        <div className="space-y-1">
                                                            {categoriesLoading ? (
                                                                <div className="flex items-center justify-center p-8">
                                                                    <div className="flex flex-col items-center gap-2">
                                                                        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                                                                        <span className="text-xs text-gray-500">Cargando categorías...</span>
                                                                    </div>
                                                                </div>
                                                            ) : error ? (
                                                                <div className="text-center p-4">
                                                                    <p className="text-xs text-red-600">Error al cargar categorías</p>
                                                                </div>
                                                            ) : sortedCategories.length === 0 ? (
                                                                <div className="text-center p-4">
                                                                    <p className="text-xs text-gray-500">No hay categorías disponibles</p>
                                                                </div>
                                                            ) : (
                                                                <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-100 pr-2">
                                                                    <div className="space-y-1">
                                                                        {sortedCategories.map((category: CategoryType) => (
                                                                            <NavigationMenuLink key={category.id} asChild>
                                                                                <Link
                                                                                    href={`/categoria/${createSlug(category.categoryName)}`}
                                                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-blue-50 border border-transparent hover:border-blue-100 group"
                                                                                >
                                                                                    <div className="flex items-center gap-2">
                                                                                        <div className="p-1 bg-blue-100 group-hover:bg-blue-200 rounded-md transition-colors">
                                                                                            <Package2 className="w-3 h-3 text-blue-600" />
                                                                                        </div>
                                                                                        <div className="text-sm font-medium leading-none group-hover:text-blue-900">
                                                                                            {category.categoryName}
                                                                                        </div>
                                                                                    </div>
                                                                                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-blue-700 ml-6">
                                                                                        Productos de {category.categoryName.toLowerCase()} disponibles para equipos médicos profesionales.
                                                                                    </p>
                                                                                </Link>
                                                                            </NavigationMenuLink>
                                                                        ))}
                                                                    </div>

                                                                    {/* Indicador de scroll */}
                                                                    {sortedCategories.length > 5 && (
                                                                        <div className="text-center py-2 border-t border-gray-100 mt-2">
                                                                            <p className="text-xs text-gray-400">
                                                                                ↕ Desliza para ver más
                                                                            </p>
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
                                            className="flex items-center text-gray-700 hover:text-orange-500 font-normal transition-colors"
                                        >
                                            {category.categoryName}
                                        </Link>
                                    ))
                                }

                                <Link
                                    href="/luminarias"
                                    className="flex items-center text-gray-700 hover:text-orange-500 font-normal transition-colors"
                                >
                                    Luminarias
                                </Link>

                                <Link
                                    href="/nosotros"
                                    className="flex items-center text-gray-700 hover:text-orange-500 font-normal transition-colors"
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
                                <span className="text-sm">+52 55 6091 3395</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-700">
                                <Mail className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">contacto@zime.com.mx</span>
                            </div>
                        </div>

                        {/* Botón WhatsApp mobile */}
                        <a 
                            href="https://wa.me/525560913395?text=Solicito%20asesoramiento%20sobre%20algunos%20productos.%20De%20la%20página%20de%20ZIME.COM.MX"
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