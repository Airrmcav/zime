// import ActionPrice from "@/components/actionPrice";
import FeaturedProducts from "@/components/index/featured-products";
import CarouselText from "@/components/index/Carousel";
import Marcas from "@/components/index/Marcas";
import FeaturedProductsElectric from "@/components/index/featured-products-electric";
import ChooseCategory from "@/components/index/choose-category";
import ChooseCatalogo from "@/components/index/choose-catalogo";
import FeaturedProductsCajas from "@/components/index/featured-products-cajas";
import FeaturedProductsOficina from "@/components/index/featured-products-oficina";
import FeaturedProductsLimpieza from "@/components/index/featured-products-limpieza";



export default function Home() {
  return (
    <div>
      <CarouselText />
      <FeaturedProducts/>
      <FeaturedProductsElectric/>
      <FeaturedProductsCajas />
      <FeaturedProductsOficina/>
      <FeaturedProductsLimpieza />
      <ChooseCatalogo/>
      <ChooseCategory/>
      
      {/* <ActionPrice/> */}
      {/* <Marcas/> */}

    </div>
  );
}
