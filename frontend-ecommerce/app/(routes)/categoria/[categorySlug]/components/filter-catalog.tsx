import { useGetProductField } from "@/api/getProductField";
import { FilterTypes } from "@/types/filters";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Filter, Loader2, Package } from "lucide-react";

type FiltersCatalogProps = {
    setFilterCatalog: (catalog: string) => void;
    filterCatalog: string;
    setFilterArea: (area: string) => void;
    setFilterCategory: (category: string) => void;
}

const FilterCatalog = (props: FiltersCatalogProps) => {
    const { setFilterCatalog, filterCatalog, setFilterArea, setFilterCategory } = props;
    const { result, loading, error }: FilterTypes = useGetProductField();


    return (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-lg p-6 my-4">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl">
                    <Package className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Filtrar por Catálogo</h3>
                    <p className="text-sm text-gray-600">Selecciona el catálogo de tu interés</p>
                </div>
            </div>

            {/* Decorative Line */}
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4"></div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-3">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                        <p className="text-gray-600 font-medium">Cargando catálogos...</p>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Radio Group */}
            {!loading && result && result.schema && result.schema.attributes && result.schema.attributes.catalogo && result.schema.attributes.catalogo.enum && result.schema.attributes.catalogo.enum.length > 0 && (
                <div className="space-y-1">
                    <RadioGroup 
                        onValueChange={(value) => {
                            // Al seleccionar un catálogo, limpiamos los otros filtros
                            setFilterArea('');
                            setFilterCategory('');
                            setFilterCatalog(value);
                        }}
                        value={filterCatalog}
                        className="space-y-3"
                    >
                        {result.schema.attributes.catalogo.enum.map((catalogName: string, index: number) => {
                            // Obtener el slug del catálogo - normalizando acentos y caracteres especiales
                            const catalogSlug = catalogName
                                .toLowerCase()
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
                                .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
                                .replace(/\s+/g, '-') // Reemplazar espacios con guiones
                                .replace(/-+/g, '-'); // Evitar guiones múltiples
                            return (
                                <div 
                                    key={index} 
                                    className="group relative"
                                >
                                    <div className="flex items-center space-x-4 p-2 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer">
                                        <RadioGroupItem 
                                            value={catalogSlug} 
                                            id={catalogSlug}
                                            className="text-blue-600 border-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-200"
                                        />
                                        
                                        {/* Icon */}
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-300">
                                            <Package className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                                        </div>
                                        
                                        <Label 
                                            htmlFor={catalogSlug}
                                            className="flex-1 text-gray-700 group-hover:text-gray-900 font-medium cursor-pointer transition-colors duration-200 text-sm"
                                        >
                                            {catalogName}
                                        </Label>
                                        
                                        {/* Hover indicator */}
                                        <div className="w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    
                                    {/* Selection indicator line */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full ${filterCatalog === catalogSlug ? 'opacity-100' : 'opacity-0'}`}></div>
                                </div>
                            );
                        })}
                        {/* Agregar un console.log para depuración */}
                        {console.log('Catálogos disponibles en el componente:', result.schema.attributes.catalogo.enum)}
                    </RadioGroup>

                    {/* Results count */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-blue-600">
                                    {result.schema.attributes.catalogo.enum.length}
                                </span> catálogos disponibles
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Filtros activos</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && (!result || !result.schema || !result.schema.attributes || !result.schema.attributes.catalogo || !result.schema.attributes.catalogo.enum || result.schema.attributes.catalogo.enum.length === 0) && (
                <div className="text-center py-8">
                    <div className="mb-4">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
                            <Filter className="w-8 h-8 text-gray-400" />
                        </div>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">No hay catálogos disponibles</h4>
                    <p className="text-sm text-gray-500">
                        No se encontraron catálogos para filtrar en este momento.
                    </p>
                </div>
            )}
        </div>
    );
}

export default FilterCatalog;