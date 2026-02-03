"use client";

import { useState, useMemo } from "react";
import { useGetCategories } from "@/api/useGetCategories";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";
import { ProductType } from "@/types/product";
import { ChevronDown, Loader2, Package2, Grid3X3 } from "lucide-react";

type FiltersCategoryProps = {
  setFilterCategory: (category: string) => void;
  filterCategory: string;
  setFilterArea?: (area: string) => void;
  theme?: "blue" | "orange";
  products?: ProductType[]; // Productos disponibles para filtrar categorías
  catalogSlug?: string; // Slug del catálogo para filtrar categorías
};

const FilterCategory = (props: FiltersCategoryProps) => {
  const {
    setFilterCategory,
    filterCategory,
    setFilterArea,
    theme = "blue",
    products,
    catalogSlug,
  } = props;
  const { result, loading, error }: ResponseType = useGetCategories();
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

  const sortedCategories = useMemo(() => {
    if (!result) return [];

    let filteredCategories = [...result].filter((a) => a && a.categoryName);

    // Filter by catalogSlug if provided
    if (catalogSlug) {
      let normalizedSlug = catalogSlug;
      // Handle special cases
      if (normalizedSlug === "epp") {
        normalizedSlug = "equipo-de-proteccion-personal";
      }

      filteredCategories = filteredCategories.filter(
        (cat) => cat.catalogo && cat.catalogo.slug === normalizedSlug,
      );
    }

    if (products && products.length > 0) {
      const productCategoryNames = new Set(
        products
          .filter((p) => p.category?.categoryName)
          .map((p) => p.category.categoryName),
      );
      filteredCategories = filteredCategories.filter((cat) =>
        productCategoryNames.has(cat.categoryName),
      );
    }
    return filteredCategories.sort((a, b) =>
      a.categoryName.localeCompare(b.categoryName),
    );
  }, [result, products, catalogSlug]);

  const handleCategorySelect = (value: string) => {
    if (setFilterArea) {
      setFilterArea("");
    }
    setFilterCategory(value);
    setIsExpanded(true);
  };

  const toggleExpanded = () => {
    if (!loading && result) {
      setIsExpanded(!isExpanded);
    }
  };

  // Encontrar la categoría seleccionada para mostrar en el header
  const selectedCategory = sortedCategories.find(
    (cat) => cat && cat.categoryName === filterCategory,
  );

  return (
    <div
      className={`bg-white rounded-2xl border ${colors.border} shadow-lg overflow-hidden mt-3`}
    >
      {/* Header Clickeable */}
      <div
        onClick={toggleExpanded}
        className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 
                    ${isExpanded ? `${colors.bgExpanded} border-b border-gray-100` : "hover:bg-gray-50"}`}
      >
        <div className={`p-1.5 bg-gradient-to-r ${colors.gradient} rounded-lg`}>
          <Grid3X3 className={`w-4 h-4 ${colors.text}`} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">
            {selectedCategory
              ? selectedCategory.categoryName
              : "Filtrar por Categoría"}
          </h3>
          {!selectedCategory && (
            <p className="text-xs text-gray-500">Selecciona una categoría</p>
          )}
        </div>

        {/* Counter badge */}
        {result && !loading && (
          <div className={`px-2 py-1 ${colors.badge} rounded-full`}>
            <span className={`text-xs font-semibold ${colors.badgeText}`}>
              {result.length}
            </span>
          </div>
        )}

        {/* Loading o Arrow */}
        {loading ? (
          <Loader2 className={`w-5 h-5 ${colors.text} animate-spin`} />
        ) : (
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 
                            ${isExpanded ? "rotate-180" : "rotate-0"}`}
          />
        )}
      </div>

      {/* Contenido Expandible */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {/* Error State */}
          {error && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-red-100 rounded-xl flex items-center justify-center mb-3">
                <Package2 className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="font-semibold text-red-700 mb-1">
                Error al cargar categorías
              </h4>
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {result && result.length === 0 && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                <Package2 className="w-6 h-6 text-gray-400" />
              </div>
              <h4 className="font-semibold text-gray-700 mb-1">
                No hay categorías disponibles
              </h4>
              <p className="text-xs text-gray-500">
                No se encontraron categorías para filtrar.
              </p>
            </div>
          )}

          {/* Lista de Categorías - Scrollable */}
          {result && result.length > 0 && (
            <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-100">
              <div className="p-4 space-y-1">
                <RadioGroup
                  onValueChange={handleCategorySelect}
                  value={filterCategory}
                  className="space-y-2"
                >
                  {sortedCategories.map((category: CategoryType) => (
                    <div key={category.id} className="group relative">
                      <div
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer
                                                ${
                                                  filterCategory ===
                                                  category.categoryName
                                                    ? `${colors.selected} shadow-sm`
                                                    : `border-gray-200 ${colors.hover} hover:bg-gray-50`
                                                }`}
                      >
                        <RadioGroupItem
                          value={category.categoryName}
                          id={category.categoryName}
                          className={`${colors.text} border-gray-300 group-hover:border-${theme}-400`}
                        />

                        <div
                          className={`p-1.5 rounded-md transition-colors duration-200
                                                    ${
                                                      filterCategory ===
                                                      category.categoryName
                                                        ? colors.badge
                                                        : `bg-gray-100 group-hover:${colors.bg}`
                                                    }`}
                        >
                          <Package2 className={`w-3.5 h-3.5 ${colors.text}`} />
                        </div>

                        <Label
                          htmlFor={category.categoryName}
                          className="flex-1 text-sm text-gray-700 group-hover:text-gray-900 font-medium cursor-pointer"
                        >
                          {category.categoryName}
                        </Label>

                        {filterCategory === category.categoryName && (
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

          {/* Footer con indicador de scroll si hay muchas categorías */}
          {result && result.length > 4 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500">
                ↕ Desliza para ver más opciones
              </p>
            </div>
          )}
        </div>
      )}

      {/* Indicador cuando está cerrado y hay selección */}
      {!isExpanded && selectedCategory && (
        <div className={`px-4 py-2 ${colors.bg} border-t ${colors.border}`}>
          <p className={`text-xs ${colors.text} text-center`}>
            ✓ {selectedCategory.categoryName} seleccionada
          </p>
        </div>
      )}
    </div>
  );
};

export default FilterCategory;
