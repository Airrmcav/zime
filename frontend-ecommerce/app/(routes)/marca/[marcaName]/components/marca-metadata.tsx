import { Metadata } from "next";
import { buildApiUrl, fetchAPIServer } from "@/api/serverUtils";

// Modificamos la interfaz para recibir params directamente
export async function generateMetadata({ params }: { params: { marcaName: string } }): Promise<Metadata> {
  // Extraemos y validamos marcaName de params
  const { marcaName = "" } = await params;
  
  // Obtener información de la marca desde la API
  let description = `Descubre nuestra selección completa de productos ${marcaName}. Calidad y rendimiento garantizado para profesionales y empresas.`;
  
  try {
    if (marcaName) {
      const url = buildApiUrl('products', {
        marcaProduct: {
          nameMarca: { $eq: marcaName }
        }
      }, '*');
      
      const { data, error } = await fetchAPIServer(url);
      
      if (data && Array.isArray(data) && data.length > 0 && data[0].marcaProduct?.descriptionMarca) {
        description = data[0].marcaProduct.descriptionMarca;
      }
    }
  } catch (error) {
    console.error("Error al obtener información de la marca:", error);
  }
  
  return {
    title: `Catálogo de Productos ${marcaName || 'de nuestra marca'} | Zime Iluminación LED`,
    description: description,
    openGraph: {
      title: `Catálogo de productos ${marcaName || 'de nuestra marca'} | Zime Iluminación LED`,
      description: description,
      images: [
        {
          url: '/logo/logo-zime.png',
          width: 800,
          height: 600,
          alt: `Catálogo de productos ${marcaName || 'de nuestra marca'}`,
        },
      ],
    },
  };
}

interface MarcaMetadataProps {
  marcaName: string;
}

export default function MarcaMetadata({ marcaName }: MarcaMetadataProps) {
  // Este componente no renderiza nada, solo genera metadatos
  return null;
}