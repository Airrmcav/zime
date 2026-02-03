import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";
import { Filter, Loader2, Stethoscope } from "lucide-react";

type FiltersAreaProps = {
  setFilterArea: (area: string) => void;
  filterArea: string;
  setFilterCategory?: (category: string) => void;
  theme?: "blue" | "orange";
};

const FilterArea = (props: FiltersAreaProps) => {
  const {
    setFilterArea,
    filterArea,
    setFilterCategory,
    theme = "blue",
  } = props;
  const { result, loading }: FilterTypes = useGetProductField();

  const themeColors = {
    blue: {
      gradient: "from-blue-100 to-indigo-100",
      text: "text-blue-600",
      border: "border-blue-100",
      hover: "hover:border-blue-200 hover:bg-blue-50/30",
      bg: "bg-blue-50",
      indicator: "from-blue-500 to-indigo-500",
      dot: "bg-blue-400",
      loading: "text-blue-600",
    },
    orange: {
      gradient: "from-orange-100 to-amber-100",
      text: "text-orange-600",
      border: "border-orange-100",
      hover: "hover:border-orange-200 hover:bg-orange-50/30",
      bg: "bg-orange-50",
      indicator: "from-orange-500 to-amber-500",
      dot: "bg-orange-400",
      loading: "text-orange-600",
    },
  };

  const colors = themeColors[theme];

  return (
    <div
      className={`bg-white rounded-2xl border ${colors.border} shadow-lg p-6 my-0`}
    >
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 bg-linear-to-r ${colors.gradient} rounded-xl`}>
          <Filter className={`w-5 h-5 ${colors.text}`} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Filtrar por Área</h3>
          <p className="text-sm text-gray-600">
            Selecciona el área de tu interés
          </p>
        </div>
      </div>

      {/* Decorative Line */}
      <div
        className={`w-16 h-1 bg-linear-to-r ${colors.indicator} rounded-full mb-4`}
      ></div>

      {/* Loading State */}
      {loading && result === null && (
        <div className="flex items-center justify-center py-3">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className={`w-8 h-8 ${colors.loading} animate-spin`} />
            <p className="text-gray-600 font-medium">Cargando áreas...</p>
            <div className="flex gap-1">
              <div
                className={`w-2 h-2 ${colors.dot} rounded-full animate-bounce`}
              ></div>
              <div
                className={`w-2 h-2 ${colors.dot} rounded-full animate-bounce delay-100`}
              ></div>
              <div
                className={`w-2 h-2 ${colors.dot} rounded-full animate-bounce delay-200`}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Radio Group */}
      {result !== null &&
        result.schema &&
        result.schema.attributes &&
        result.schema.attributes.area &&
        result.schema.attributes.area.enum &&
        result.schema.attributes.area.enum.length > 0 && (
          <div className="space-y-1">
            <RadioGroup
              onValueChange={(value) => {
                // Al seleccionar un área, limpiamos el filtro de categoría si existe
                if (setFilterCategory) {
                  setFilterCategory("");
                }
                setFilterArea(value);
              }}
              value={filterArea}
              className="space-y-3"
            >
              {result.schema.attributes.area.enum.map(
                (areaName: string, index: number) => {
                  // Obtener el slug del área - normalizando acentos y caracteres especiales
                  const areaSlug = areaName
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
                    .replace(/[^a-z0-9\s-]/g, "") // Eliminar caracteres especiales
                    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
                    .replace(/-+/g, "-"); // Evitar guiones múltiples
                  return (
                    <div key={index} className="group relative">
                      <div
                        className={`flex items-center space-x-4 p-2 rounded-xl border-2 border-gray-100 ${colors.hover} transition-all duration-300 cursor-pointer`}
                      >
                        <RadioGroupItem
                          value={areaSlug}
                          id={areaSlug}
                          className={`${colors.text} border-2 border-gray-300 group-hover:border-${theme}-400 transition-colors duration-200`}
                        />

                        {/* Icon based on area */}
                        <div
                          className={`p-2 rounded-lg bg-linear-to-br ${colors.gradient} transition-colors duration-300`}
                        >
                          <Stethoscope className={`w-4 h-4 ${colors.text}`} />
                        </div>

                        <Label
                          htmlFor={areaSlug}
                          className="flex-1 text-gray-700 group-hover:text-gray-900 font-medium cursor-pointer transition-colors duration-200 text-sm"
                        >
                          {areaName}
                        </Label>

                        {/* Hover indicator */}
                        <div
                          className={`w-2 h-2 rounded-full ${colors.dot} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        ></div>
                      </div>

                      {/* Selection indicator line */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b ${colors.indicator} rounded-r-full ${filterArea === areaSlug ? "opacity-100" : "opacity-0"}`}
                      ></div>
                    </div>
                  );
                },
              )}
            </RadioGroup>

            {/* Results count */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  <span className={`font-semibold ${colors.text}`}>
                    {result.schema &&
                    result.schema.attributes &&
                    result.schema.attributes.area &&
                    result.schema.attributes.area.enum
                      ? result.schema.attributes.area.enum.length
                      : 0}
                  </span>{" "}
                  áreas disponibles
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <div className={`w-2 h-2 ${colors.dot} rounded-full`}></div>
                  <span>Filtros activos</span>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Empty State */}
      {result !== null &&
        result.schema &&
        result.schema.attributes &&
        result.schema.attributes.area &&
        result.schema.attributes.area.enum &&
        result.schema.attributes.area.enum.length === 0 && (
          <div className="text-center py-8">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-700 mb-2">
              No hay áreas disponibles
            </h4>
            <p className="text-sm text-gray-500">
              No se encontraron áreas para filtrar en este momento.
            </p>
          </div>
        )}
    </div>
  );
};

export default FilterArea;
