'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Zap, Shield, HardHat, Wrench, Tag, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchProducts } from '@/api/searchProducts';
import { ProductType } from '@/types/product';
import { CategoryType } from '@/types/category';

interface SearchDropdownProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function SearchDropdown({ isMobile = false, onClose }: SearchDropdownProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Usar el hook de búsqueda
  const { result, loading, error } = useSearchProducts(searchTerm);

  // Depuración
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      console.log('SearchDropdown - Resultados:', result);
    }
  }, [result, searchTerm]);

  // Función para crear URLs amigables sin acentos
  const createSlug = (text: string | undefined) => {
    // Si el texto es undefined o null, devolver un valor por defecto
    if (!text) return 'producto';

    return text
      .trim() // Eliminar espacios al inicio y final
      .toLowerCase() // Convertir a minúsculas
      .normalize('NFD') // Normalizar caracteres Unicode
      .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos y diacríticos
      .replace(/[^a-z0-9\s-]/g, '') // Solo permitir letras, números, espacios y guiones
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
      .trim(); // Eliminar posibles espacios o guiones al inicio/final
  };

  // Función para obtener icono de categoría basado en el nombre
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('eléctrico') || name.includes('electrico') || name.includes('cable') || name.includes('interruptor')) {
      return <Zap className="w-4 h-4 text-yellow-600" />;
    }
    if (name.includes('protección') || name.includes('proteccion') || name.includes('seguridad') || name.includes('casco') || name.includes('guante')) {
      return <Shield className="w-4 h-4 text-green-600" />;
    }
    if (name.includes('herramienta') || name.includes('tool')) {
      return <Wrench className="w-4 h-4 text-blue-600" />;
    }
    if (name.includes('trabajo') || name.includes('construccion') || name.includes('obra')) {
      return <HardHat className="w-4 h-4 text-orange-600" />;
    }
    return <Tag className="w-4 h-4 text-gray-600" />;
  };

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Abrir el dropdown cuando hay resultados o cuando se está buscando
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      // Siempre mostrar el dropdown cuando hay un término de búsqueda
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [searchTerm]);

  // Verificar si hay resultados para mostrar
  const hasProducts = Array.isArray(result.products) && result.products.length > 0;
  const hasCategories = Array.isArray(result.categories) && result.categories.length > 0;
  const hasResults = hasProducts || hasCategories;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      router.push(`/buscar?q=${searchTerm}`);
      setIsDropdownOpen(false);
      if (onClose) onClose();
    }
  };

  const handleItemClick = () => {
    setIsDropdownOpen(false);
    setSearchTerm('');
    if (onClose) onClose();
  };

  return (
    <div className={`relative w-full ${isMobile ? '' : 'max-w-2xl'}`} ref={dropdownRef}>
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 z-10 pointer-events-none"
        />

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Buscar materiales eléctricos y EPP..."
          className={`w-full ${isMobile ? 'pl-10 pr-4 py-2.5 text-sm' : 'pl-12 pr-4 py-3 text-sm lg:text-base'} 
            bg-white/90 border-2 border-slate-200 rounded-xl lg:rounded-2xl 
            shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 
            focus:border-amber-400 focus:bg-white transition-all duration-300
            placeholder-slate-500 text-slate-800 backdrop-blur-sm
            hover:border-slate-300 hover:shadow-xl`}
        />


        {loading && searchTerm.trim() !== '' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="relative">
              <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
              <div className="absolute inset-0 h-5 w-5 rounded-full border-2 border-amber-200 animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {/* Dropdown de resultados */}
      {isDropdownOpen && searchTerm.trim() !== '' && (
        <div className="absolute z-50 w-full mt-3 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[80vh] overflow-y-auto backdrop-blur-sm">
          {loading ? (
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
                  <div className="absolute inset-0 h-6 w-6 rounded-full border-2 border-amber-200 animate-pulse"></div>
                </div>
                <span className="text-slate-700 font-medium">Buscando productos...</span>
              </div>
            </div>
          ) : hasResults ? (
            <div>
              {/* Categorías */}
              {hasCategories && (
                <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50">
                  <div className="flex items-center gap-2 mb-3 px-2">
                    <Tag className="w-4 h-4 text-slate-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Categorías</h3>
                  </div>
                  <div className="space-y-2">
                    {Array.isArray(result.categories) && result.categories.slice(0, 3).map((category: CategoryType) => (
                      <Link
                        href={`/categoria/${createSlug(category.categoryName)}`}
                        key={category.id}
                        onClick={handleItemClick}
                        className="group block px-4 py-3 hover:bg-white rounded-xl transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(category.categoryName)}
                            {category.mainImage && category.mainImage.url && (
                              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-sm border border-slate-200">
                                <img
                                  src={`${category.mainImage.url}`}
                                  alt={category.mainImage.alternativeText || category.categoryName}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                              {category.categoryName}
                            </div>
                            {category.descriptionCategory && (
                              <div className="text-xs text-slate-500 truncate mt-1">
                                {category.descriptionCategory.substring(0, 60)}{category.descriptionCategory.length > 60 ? '...' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Productos */}
              {hasProducts && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-3 px-2">
                    <Package className="w-4 h-4 text-slate-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Productos</h3>
                  </div>
                  <div className="space-y-2">
                    {Array.isArray(result.products) && result.products.slice(0, 5).map((product: ProductType) => (
                      <Link
                        href={`/${createSlug(product.productName || product.productName)}`}
                        key={product.id}
                        onClick={handleItemClick}
                        className="group flex items-center gap-4 px-4 py-3 hover:bg-white rounded-xl transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-white rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-200 group-hover:shadow-md transition-shadow">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={`${product.images[0].url}`}
                              alt={product.productName || product.productName}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                              <Package className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors text-sm">
                            {product.productName || product.productName}
                          </div>
                          {product.description && (
                            <div className="text-xs text-slate-500 truncate mt-1 leading-relaxed">
                              {product.description.substring(0, 80)}{product.description.length > 80 ? '...' : ''}
                            </div>
                          )}
                        </div>
                        <div className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Search className="w-4 h-4" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer con enlace a ver todos */}
              {/* <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-4 border-t border-slate-200 text-center">
                <Link
                  href={`/buscar?q=${searchTerm}`}
                  onClick={handleItemClick}
                  className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-amber-700 font-semibold transition-colors group"
                >
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Ver todos los resultados
                  <span className="text-xs bg-slate-200 px-2 py-1 rounded-full">
                    {(result.products?.length || 0) + (result.categories?.length || 0)} resultados
                  </span>
                </Link>
              </div> */}
            </div>
          ) : searchTerm.trim() !== '' && !loading ? (
            <div className="p-8 text-center bg-gradient-to-r from-slate-50 to-red-50">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-red-500" />
                </div>
                <div className="text-slate-700">
                  <p className="font-semibold">No se encontraron resultados</p>
                  <p className="text-sm text-slate-500 mt-1">
                    No hay productos o categorías que coincidan con <span className="font-medium">"{searchTerm}"</span>
                  </p>
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  Intenta con términos como: cables, cascos, guantes, interruptores, herramientas
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
