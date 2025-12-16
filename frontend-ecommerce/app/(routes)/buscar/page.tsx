import { Suspense } from "react";
import { Search } from "lucide-react";
import SearchClient from "./SearchClient";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const sp = await searchParams;
  const q = sp?.q || "";
  const page = sp?.page ? parseInt(sp.page, 10) || 1 : 1;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8 border-b pb-4">
        <h1 className="flex items-center text-4xl font-bold text-gray-900">
          <Search className="w-8 h-8 mr-3 text-primary" />
          Resultados de búsqueda
        </h1>
        {q && (
          <p className="mt-2 text-xl text-gray-600">
            {`Búsqueda para: "${q}"`}
          </p>
        )}
      </header>
      <Suspense fallback={<div className="py-16 text-center">Cargando…</div>}>
        <SearchClient q={q} initialPage={page} />
      </Suspense>
    </div>
  );
}
