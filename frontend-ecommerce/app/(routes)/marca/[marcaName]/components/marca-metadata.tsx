import { Metadata } from "next";
import { buildApiUrl, fetchAPIServer } from "@/api/serverUtils";

// Modificamos la interfaz para recibir params directamente
export async function generateMetadata({ params }: { params: { marcaName: string } }): Promise<Metadata> {
  // Extraemos y validamos marcaName de params
  const { marcaName = "" } = await params;
  
  // Obtener información de la marca desde la API
  let description = `Explora el catálogo ${marcaName}, distribuidores oficiales de luminarias LED. Soluciones de iluminación profesional para proyectos industriales, comerciales y residenciales, con productos certificados, alta eficiencia energética y respaldo técnico.`;
  
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
    title: `Catálogo ${marcaName} | Distribuidores Oficiales de Luminarias LED`,
    description: description,
    openGraph: {
      title: `Catálogo ${marcaName} | Distribuidores Oficiales de Luminarias LED`,
      description: description,
      images: [
        {
          url: '/logo/logo-zime.png',
          width: 800,
          height: 600,
          alt: `Explora el catálogo ${marcaName}, distribuidores oficiales de luminarias LED. Soluciones de iluminación profesional para proyectos industriales, comerciales y residenciales, con productos certificados, alta eficiencia energética y respaldo técnico.`,
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