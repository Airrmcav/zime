"use client";

// import ActionPrice from "@/components/actionPrice";
import FeaturedProducts from "@/components/index/featured-products";
import FeaturedProductsLuminarias from "@/app/(routes)/luminarias/components/featured-products";
import CarouselText from "@/components/index/Carousel";
import Marcas from "@/components/index/Marcas";
import FeaturedProductsElectric from "@/components/index/featured-products-electric";
import ChooseCategory from "@/components/index/choose-category";
import { useGetFeaturedProductsLuminariasSupraAube } from "@/api/luminarias/useGetFeaturedProductsLuminariasSupraAube";
import ChooseCatalogo from "@/components/index/choose-catalogo";
import FeaturedProductsOficina from "@/components/index/featured-products-oficina";
import FeaturedProductsLimpieza from "@/components/index/featured-products-limpieza";
import { Star, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResponseType } from "@/types/response";



export default function Home() {
  const router = useRouter();
  
  // Obtenemos los productos destacados de luminarias SUPRA/AUBE
  const { loading: loadingSupraAube, result: resultSupraAube }: ResponseType =
    useGetFeaturedProductsLuminariasSupraAube();

  return (
    <div>
      <CarouselText />
      <main>
        {/* Sección SUPRA/AUBE */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
        aria-labelledby="supraaube-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header de sección */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-4">
              <Star className="w-4 h-4 text-purple-600" aria-hidden="true" />
              <span className="text-sm font-medium text-purple-600">
                Iluminación Profesional
              </span>
            </div>
            <h2
              id="supraaube-heading"
              className="text-4xl font-bold text-gray-900 mb-3"
            >
              Soluciones <span className="text-purple-600">SUPRA/AUBE</span> -
              Iluminación de Alta Calidad
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
              Descubre la excelencia en <strong>iluminación SUPRA/AUBE</strong>:
              productos de alta calidad, diseño superior y rendimiento
              excepcional para aplicaciones residenciales, comerciales e
              industriales en toda la República Mexicana.
            </p>

            {/* Keywords adicionales para SEO */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                Iluminación Profesional
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                Diseño Superior
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                Alta Durabilidad
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                Eficiencia Energética
              </span>
            </div>
          </div>

          {loadingSupraAube ? (
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-300 border-t-transparent animate-spin"></div>
                </div>
                <span className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                  Cargando productos Destacados
                </span>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.0s]"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:.3s]"></span>
              </div>
            </div>
          ) : null}
          <FeaturedProductsLuminarias products={resultSupraAube || []} />

          {/* Botón después de los productos */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => router.push("/marca/SUPRA-AUBE")}
              className="cursor-pointer group inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Ver todos los productos SUPRA/AUBE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Texto SEO adicional */}
          <div className="mt-12 text-center max-w-4xl mx-auto">
            <p className="text-gray-600 text-sm leading-relaxed">
              SUPRA/AUBE ofrece soluciones de iluminación de alta calidad para
              proyectos residenciales, comerciales e industriales. Productos con
              garantía y certificación que combinan diseño, durabilidad y
              eficiencia. Distribuidor autorizado en México.
            </p>
          </div>
        </div>
      </section>

      <FeaturedProducts/>
      <FeaturedProductsElectric/>
     
      <FeaturedProductsOficina/>
      <FeaturedProductsLimpieza />
      <ChooseCatalogo/>
      <ChooseCategory/>
      </main>
      
      {/* <ActionPrice/> */}
      {/* <Marcas/> */}

    </div>
  );
}
