// import ActionPrice from "@/components/actionPrice";
import FeaturedProducts from "@/components/index/featured-products";
import CarouselText from "@/components/index/Carousel";
import Marcas from "@/components/index/Marcas";
import FeaturedProductsElectric from "@/components/index/featured-products-electric";
import ChooseCategory from "@/components/index/choose-category";
import ChooseCatalogo from "@/components/index/choose-catalogo";
import FeaturedProductsOficina from "@/components/index/featured-products-oficina";
import FeaturedProductsLimpieza from "@/components/index/featured-products-limpieza";



export default function Home() {
  return (
    <div>
      <CarouselText />
      <main>

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
