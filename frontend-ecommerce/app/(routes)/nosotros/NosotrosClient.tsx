"use client"
import { Shield, Zap, Users, Award, Target, Eye, Heart, CheckCircle, Star, TrendingUp, Clock, Handshake } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";



const NosotrosClient = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 text-white py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Protegemos lo que más
                            <span className="text-blue-300"> importa</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Somos especialistas en equipo de protección personal y material eléctrico, 
                            comprometidos con la seguridad y calidad en cada proyecto.
                        </p>
                        <div className="flex justify-center items-center gap-8 mt-12">
                            <div className="flex items-center gap-3">
                                <Shield className="w-8 h-8 text-blue-300" />
                                <span className="text-lg font-semibold">Protección Personal</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Zap className="w-8 h-8 text-yellow-400" />
                                <span className="text-lg font-semibold">Material Eléctrico</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nuestra Historia */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Nuestra Historia
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p className="text-lg">
                                    Desde nuestros inicios, hemos sido pioneros en la distribución de 
                                    equipos de protección personal y material eléctrico de la más alta calidad.
                                </p>
                                <p>
                                    Nacimos con la visión de crear un entorno más seguro para trabajadores 
                                    y empresas, ofreciendo productos que cumplen con los estándares 
                                    internacionales más exigentes.
                                </p>
                                <p>
                                    Con años de experiencia en el mercado, hemos logrado posicionarnos 
                                    como líderes en nuestro sector, siempre manteniendo nuestro compromiso 
                                    con la innovación y la excelencia.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
                                    <div className="text-gray-600">Años de experiencia</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
                                    <div className="text-gray-600">Clientes satisfechos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-yellow-600 mb-2">400+</div>
                                    <div className="text-gray-600">Productos disponibles</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
                                    <div className="text-gray-600">Calidad garantizada</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Misión, Visión y Valores */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Nuestros Pilares
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Los valores que nos guían en cada decisión y nos impulsan hacia la excelencia
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Misión */}
                        <div className="bg-blue-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Misión</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Proveer equipos de protección personal y material eléctrico de la más alta calidad, 
                                garantizando la seguridad y bienestar de nuestros clientes en cada proyecto.
                            </p>
                        </div>

                        {/* Visión */}
                        <div className="bg-green-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
                            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Eye className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Visión</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Ser la empresa líder en México en la distribución de equipos de seguridad y 
                                material eléctrico, reconocida por nuestra innovación y compromiso con la excelencia.
                            </p>
                        </div>

                        {/* Valores */}
                        <div className="bg-purple-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
                            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Integridad, compromiso con la seguridad, innovación constante y servicio al cliente 
                                excepcional son los valores que nos definen como empresa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Por qué elegirnos */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            ¿Por qué elegirnos?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Nos distinguimos por nuestro compromiso con la calidad y la satisfacción del cliente
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Award className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Calidad Premium</h3>
                            <p className="text-gray-600">
                                Productos certificados que cumplen con las normas internacionales más exigentes.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Atención Personalizada</h3>
                            <p className="text-gray-600">
                                Equipo de expertos dedicado a asesorarte y encontrar la mejor solución.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Entrega Rápida</h3>
                            <p className="text-gray-600">
                                Logística eficiente para que recibas tus productos en tiempo récord.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Star className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Experiencia</h3>
                            <p className="text-gray-600">
                                Más de 15 años especializándose en seguridad industrial y material eléctrico.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovación</h3>
                            <p className="text-gray-600">
                                Constantemente incorporamos las últimas tecnologías en nuestro catálogo.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Handshake className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Confianza</h3>
                            <p className="text-gray-600">
                                Relaciones duraderas basadas en transparencia y compromiso mutuo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marcas que representamos */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Marcas de Confianza
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Trabajamos con las marcas líderes en el mercado para garantizar la máxima calidad
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 2000,
                                }),
                            ]}
                            className="w-full max-w-5xl"
                        >
                            <CarouselContent className="-ml-1">
                                <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex items-center justify-center h-32">
                                        <img 
                                            src="/marcas/argos.jpg" 
                                            alt="3M" 
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex items-center justify-center h-32">
                                        <img 
                                            src="/marcas/jyrsa.jpg" 
                                            alt="Honeywell" 
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex items-center justify-center h-32">
                                        <img 
                                            src="/marcas/truper.png" 
                                            alt="MSA Safety" 
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex items-center justify-center h-32">
                                        <img 
                                            src="/marcas/santul.jpeg" 
                                            alt="Schneider Electric" 
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex items-center justify-center h-32">
                                        <img 
                                            src="/marcas/golden.png" 
                                            alt="ABB" 
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex items-center justify-center h-32">
                                        <img 
                                            src="/marcas/ker.png" 
                                            alt="DuPont" 
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex items-center justify-center h-32">
                                        <img 
                                            src="/marcas/philco.png" 
                                            alt="Siemens" 
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5">
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex items-center justify-center h-32">
                                        <img 
                                            src="/marcas/derma.png" 
                                            alt="Uvex" 
                                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </CarouselItem>
                               
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex" />
                            <CarouselNext className="hidden md:flex" />
                        </Carousel>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Y muchas marcas más reconocidas mundialmente por su calidad y innovación
                        </p>
                    </div>
                </div>
            </section>

            {/* Nuestros Productos */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Nuestras Especialidades
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Dos líneas de productos especializadas para cubrir todas tus necesidades
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* EPP */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <div className="bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900">Equipo de Protección Personal</h3>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Ofrecemos una amplia gama de EPP certificado para garantizar la seguridad 
                                en cualquier entorno laboral.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-gray-700">Cascos de seguridad</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-gray-700">Guantes industriales</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-gray-700">Calzado de seguridad</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-gray-700">Equipos respiratorios</span>
                                </div>
                            </div>
                        </div>

                        {/* Material Eléctrico */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mr-4">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900">Material Eléctrico</h3>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Componentes eléctricos de alta calidad para instalaciones seguras y eficientes.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="text-gray-700">Tableros eléctricos</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="text-gray-700">Conductores y cables</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="text-gray-700">Protecciones eléctricas</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="text-gray-700">Iluminación industrial</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-800 text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        ¿Listo para proteger tu proyecto?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        Contacta con nuestros especialistas y descubre cómo podemos ayudarte 
                        a encontrar la solución perfecta para tus necesidades.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                        onClick={() => router.push('/categoria/todos')}
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                            Ver Catálogo
                        </button>
                        <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                            Contactar Ahora
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default NosotrosClient;