"use client"
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Componente de paginación reutilizable con botones numerados y controles prev/next
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  // Generar un rango de páginas amigable con el diseño (con elipses)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxButtons = 7; // número máximo de botones visibles (incluye elipses)

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const showLeftEllipsis = currentPage > 4;
    const showRightEllipsis = currentPage < totalPages - 3;

    pages.push(1);

    // Bloque intermedio
    if (showLeftEllipsis) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (showRightEllipsis) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 border-gray-200"
            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
        }`}
        aria-label="Anterior"
      >
        Anterior
      </button>

      {/* Botones numerados */}
      <div className="flex items-center gap-1">
        {pages.map((p, idx) =>
          typeof p === "number" ? (
            <button
              key={`${p}-${idx}`}
              onClick={() => goToPage(p)}
              className={`min-w-[36px] h-9 px-2 py-1 rounded-md text-sm border transition-all ${
                p === currentPage
                  ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </button>
          ) : (
            <span key={`ellipsis-${idx}`} className="px-1 text-gray-500">
              {p}
            </span>
          )
        )}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 border-gray-200"
            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
        }`}
        aria-label="Siguiente"
      >
        Siguiente
      </button>
    </div>
  );
}