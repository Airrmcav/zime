"use client";

import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductType } from "@/types/product";
import { ChevronDown, Loader2, Package2, Tag } from "lucide-react";

type FilterBrandProps = {
  setFilterBrand: (brand: string) => void;
  filterBrand: string;
  products?: ProductType[];
  theme?: "blue" | "orange";
};

const FilterBrand = (props: FilterBrandProps) => {
  const {
    setFilterBrand,
    filterBrand,
    products = [],
    theme = "blue",
  } = props;
  
  const [isExpanded, setIsExpanded] = useState(true);

  const themeColors = {
    blue: {
      gradient: "from-blue-100 to-indigo-100",
      text: "text-blue-600",
      border: "border-blue-100",
      hover: "hover:border-blue-200",
      bg: "bg-blue-50",
      bgExpanded: "bg-gradient-to-r from-blue-50 to-indigo-50",
      selected: "border-blue-300 bg-blue-50",
      badge: "bg-blue-100",
      badgeText: "text-blue-600",
    },
    orange: {
      gradient: "from-orange-100 to-amber-100",
      text: "text-orange-600",
      border: "border-orange-100",
      hover: "hover:border-orange-200",
      bg: "bg-orange-50",
      bgExpanded: "bg-gradient-to-r from-orange-50 to-amber-50",
      selected: "border-orange-300 bg-orange-50",
      badge: "bg-orange-100",
      badgeText: "text-orange-600",
    },
  };

  const colors = themeColors[theme];

  const sortedBrands = useMemo(() => {
    if (!products || products.length === 0) return [];

    // Extraer marcas únicas de los productos
    const brandsSet = new Set<string>();
    
    products.forEach((product) => {
      if (product.marcaProduct?.nameMarca) {
        brandsSet.add(product.marcaProduct.nameMarca);
      }
    });

    // Convertir a array y ordenar alfabéticamente
    return Array.from(brandsSet).sort((a, b) => 
      a.localeCompare(b)
    );
  }, [products]);

  const handleBrandSelect = (value: string) => {
    setFilterBrand(value);
    setIsExpanded(true);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`bg-white rounded-2xl border ${colors.border} shadow-lg overflow-hidden`}
    >
      {/* Header Clickeable */}
      <div
        onClick={toggleExpanded}
        className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 
                    ${isExpanded ? `${colors.bgExpanded} border-b border-gray-100` : "hover:bg-gray-50"}`}
      >
        <div className={`p-1.5 bg-gradient-to-r ${colors.gradient} rounded-lg`}>
          <Tag className={`w-4 h-4 ${colors.text}`} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">
            {filterBrand ? filterBrand : "Filtrar por Marca"}
          </h3>
          {!filterBrand && (
            <p className="text-xs text-gray-500">Selecciona una marca</p>
          )}
        </div>

        {/* Counter badge */}
        {sortedBrands.length > 0 && (
          <div className={`px-2 py-1 ${colors.badge} rounded-full`}>
            <span className={`text-xs font-semibold ${colors.badgeText}`}>
              {sortedBrands.length}
            </span>
          </div>
        )}

        {/* Arrow */}
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 
                          ${isExpanded ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      {/* Contenido Expandible */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {/* Empty State */}
          {sortedBrands.length === 0 && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                <Package2 className="w-6 h-6 text-gray-400" />
              </div>
              <h4 className="font-semibold text-gray-700 mb-1">
                No hay marcas disponibles
              </h4>
              <p className="text-xs text-gray-500">
                No se encontraron marcas para filtrar.
              </p>
            </div>
          )}

          {/* Lista de Marcas - Scrollable */}
          {sortedBrands.length > 0 && (
            <div className="max-h-74 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-gray-100">
              <div className="p-4 space-y-0.5">
                <RadioGroup
                  onValueChange={handleBrandSelect}
                  value={filterBrand}
                  className="space-y-0"
                >
                  {sortedBrands.map((brand: string) => (
                    <div key={brand} className="group relative">
                      <div
                        className={`flex items-center space-x-3 p-2 rounded-lg border transition-all duration-200 cursor-pointer
                                                ${
                                                  filterBrand === brand
                                                    ? `${colors.selected} shadow-sm`
                                                    : `border-gray-200 ${colors.hover} hover:bg-gray-50`
                                                }`}
                      >
                        <RadioGroupItem
                          value={brand}
                          id={brand}
                          className={`${colors.text} border-gray-300 group-hover:border-${theme}-400`}
                        />

                        <div
                          className={`p-1.5 rounded-md transition-colors duration-200
                                                    ${
                                                      filterBrand === brand
                                                        ? colors.badge
                                                        : `bg-gray-100 group-hover:${colors.bg}`
                                                    }`}
                        >
                          <Tag className={`w-3.5 h-3.5 ${colors.text}`} />
                        </div>

                        <Label
                          htmlFor={brand}
                          className="flex-1 text-sm text-gray-700 group-hover:text-gray-900 font-medium cursor-pointer"
                        >
                          {brand}
                        </Label>

                        {filterBrand === brand && (
                          <div
                            className={`w-2 h-2 rounded-full ${colors.text.replace("text-", "bg-")}`}
                          ></div>
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Footer con indicador de scroll si hay muchas marcas */}
          {sortedBrands.length > 4 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500">
                ↕ Desliza para ver más opciones
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBrand;
