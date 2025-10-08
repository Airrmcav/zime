// helpers/renderCharacteristics.tsx - Versión mejorada
import React from "react";

export function renderCharacteristics(data: any, level = 0): React.ReactNode {
  if (!data || typeof data !== "object") return null;

  const getIcon = (key: string) => {
    const keyLower = key.toLowerCase();

    // Iconos específicos mejorados
    if (keyLower.includes('titulo') || keyLower.includes('title')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      );
    }
    if (keyLower.includes('descripcion') || keyLower.includes('description')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      );
    }
    if (keyLower.includes('dimensión') || keyLower.includes('tamaño') || keyLower.includes('medidas')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      );
    }
    if (keyLower.includes('peso') || keyLower.includes('weight')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l3-3 3 3" />
        </svg>
      );
    }
    if (keyLower.includes('potencia') || keyLower.includes('voltaje') || keyLower.includes('energía')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    }
    if (keyLower.includes('temperatura') || keyLower.includes('temp')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    }
    if (keyLower.includes('certificación') || keyLower.includes('certificado') || keyLower.includes('norma')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    }
    if (keyLower.includes('material') || keyLower.includes('construcción')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    }
    if (keyLower.includes('caracteristica') || keyLower.includes('feature')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }

    // Icono por defecto - estrella
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    );
  };

  const getGradientColor = (index: number) => {
    const colors = [
      'from-amber-500 to-orange-500',
      'from-rose-500 to-pink-500',
      'from-violet-500 to-purple-500',
      'from-cyan-500 to-blue-500',
      'from-emerald-500 to-teal-500'
    ];
    return colors[index % colors.length];
  };

  // Si es un array, renderizamos cada elemento como una tarjeta individual
  if (Array.isArray(data)) {
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="group">
            <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">

              {/* Línea decorativa lateral */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getGradientColor(index)}`}></div>

              {/* Contenido */}
              <div className="pl-5 pr-4 py-4">
                {typeof item === "object" && item !== null ? (
                  Object.entries(item).map(([key, value]) => {
                    const keyLower = key.toLowerCase();

                    // Si es "titulo", lo mostramos como encabezado
                    if (keyLower.includes('titulo') || keyLower === 'title') {
                      return (
                        <div key={key} className="mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${getGradientColor(index)} text-white shadow-sm`}>
                              {getIcon(key)}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">
                              {String(value)}
                            </h3>
                          </div>
                        </div>
                      );
                    }

                    // Si es "descripcion", lo mostramos como texto
                    if (keyLower.includes('descripcion') || keyLower === 'description') {
                      return (
                        <div key={key} className="ml-10">
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {String(value)}
                          </p>
                        </div>
                      );
                    }

                    // Otros campos
                    return (
                      <div key={key} className="ml-10 mt-2">
                        <span className="text-xs font-semibold text-slate-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-sm text-slate-700 ml-1">
                          {typeof value === "object" ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-slate-700 text-sm">{String(item)}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Si es un objeto normal, usamos el renderizado anterior
  return (
    <div className={`space-y-3 ${level > 0 ? 'ml-4' : ''}`}>
      {Object.entries(data).map(([key, value], index) => (
        <div key={key} className="group">
          <div className={`
            relative overflow-hidden rounded-xl border transition-all duration-300 
            ${level === 0
              ? 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              : 'bg-slate-50 border-slate-200'
            }
          `}>

            {level === 0 && (
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getGradientColor(index)}`}></div>
            )}

            <div className={`p-4 ${level === 0 ? 'pl-5' : ''}`}>
              <div className="flex items-start gap-2 mb-2">
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                  ${level === 0
                    ? `bg-gradient-to-br ${getGradientColor(index)} text-white shadow-sm`
                    : 'bg-slate-200 text-slate-600'
                  }
                `}>
                  {getIcon(key)}
                </div>
                <h4 className={`
                  font-bold capitalize leading-tight pt-1
                  ${level === 0 ? 'text-base text-slate-800' : 'text-sm text-slate-700'}
                `}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
              </div>

              <div className="ml-10">
                {typeof value === "object" && value !== null ? (
                  <div className="">
                    {renderCharacteristics(value, level + 1)}
                  </div>
                ) : (
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {String(value)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}