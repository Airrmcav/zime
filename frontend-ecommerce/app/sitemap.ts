import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zime.com.mx";
  const apiBaseUrl = "https://ecommerce-zime-production.up.railway.app/api/products";
  const pageSize = 1000;
  let allProducts: any[] = [];
  let currentPage = 1;
  let hasMorePages = true;

  // Obtener todos los productos paginando si es necesario
  while (hasMorePages) {
    try {
      const res = await fetch(
        `${apiBaseUrl}?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&publicationState=live`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        console.error(`Error al obtener productos para el sitemap (página ${currentPage})`);
        break;
      }

      const json = await res.json();

      if (!json?.data || !Array.isArray(json.data)) {
        console.error("Formato inesperado de productos", json);
        break;
      }

      // Log para depuración (solo en la primera página)
      if (currentPage === 1) {
        console.log(`Total productos en página ${currentPage}:`, json.data.length);
        if (json.data.length > 0) {
          console.log("Ejemplo de estructura de producto:", JSON.stringify(json.data[0], null, 2));
        }
      }

      // Agregar productos de esta página
      allProducts = allProducts.concat(json.data);

      // Verificar si hay más páginas
      const pagination = json.meta?.pagination;
      if (pagination) {
        console.log(`Página ${currentPage} de ${pagination.pageCount}, total: ${pagination.total}`);
        hasMorePages = currentPage < pagination.pageCount;
        currentPage++;
      } else {
        // Si no hay información de paginación, asumir que no hay más páginas
        hasMorePages = false;
      }
    } catch (error) {
      console.error(`Error al obtener productos (página ${currentPage}):`, error);
      break;
    }
  }

  console.log(`Total productos obtenidos: ${allProducts.length}`);

  // Filtrar y mapear productos válidos
  // Strapi puede devolver productos con estructura { id, attributes: { slug } } o ya transformados
  const products = allProducts
    .map((product: any) => {
      // Intentar obtener el slug de diferentes formas posibles
      let slug: string | null = null;
      
      if (product?.attributes?.slug) {
        slug = product.attributes.slug;
      } else if (product?.slug) {
        slug = product.slug;
      }
      
      return slug;
    })
    .filter((slug: string | null): slug is string => 
      typeof slug === "string" && slug.length > 0
    )
    .map((slug: string) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      priority: 0.7,
    }));

  console.log(`Productos válidos para sitemap: ${products.length}`);

  // Obtener todas las categorías
  const categoriesApiUrl = "https://ecommerce-zime-production.up.railway.app/api/categories";
  let allCategories: any[] = [];
  let categoryPage = 1;
  let hasMoreCategoryPages = true;

  while (hasMoreCategoryPages) {
    try {
      const res = await fetch(
        `${categoriesApiUrl}?populate=*&pagination[page]=${categoryPage}&pagination[pageSize]=${pageSize}&publicationState=live`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        console.error(`Error al obtener categorías para el sitemap (página ${categoryPage})`);
        break;
      }

      const json = await res.json();

      if (!json?.data || !Array.isArray(json.data)) {
        console.error("Formato inesperado de categorías", json);
        break;
      }

      // Log para depuración (solo en la primera página)
      if (categoryPage === 1) {
        console.log(`Total categorías en página ${categoryPage}:`, json.data.length);
      }

      // Agregar categorías de esta página
      allCategories = allCategories.concat(json.data);

      // Verificar si hay más páginas
      const pagination = json.meta?.pagination;
      if (pagination) {
        console.log(`Categorías - Página ${categoryPage} de ${pagination.pageCount}, total: ${pagination.total}`);
        hasMoreCategoryPages = categoryPage < pagination.pageCount;
        categoryPage++;
      } else {
        hasMoreCategoryPages = false;
      }
    } catch (error) {
      console.error(`Error al obtener categorías (página ${categoryPage}):`, error);
      break;
    }
  }

  console.log(`Total categorías obtenidas: ${allCategories.length}`);

  // Filtrar y mapear categorías válidas
  const categories = allCategories
    .map((category: any) => {
      // Intentar obtener el slug de diferentes formas posibles
      let slug: string | null = null;
      
      if (category?.attributes?.slug) {
        slug = category.attributes.slug;
      } else if (category?.slug) {
        slug = category.slug;
      }
      
      return slug;
    })
    .filter((slug: string | null): slug is string => 
      typeof slug === "string" && slug.length > 0
    )
    .map((slug: string) => ({
      url: `${baseUrl}/categoria/${slug}`,
      lastModified: new Date(),
      priority: 0.8,
    }));

  console.log(`Categorías válidas para sitemap: ${categories.length}`);

  // Obtener todas las marcas
  // Primero intentar obtener de un endpoint específico, si no existe, extraer de productos
  const marcasApiUrl = "https://ecommerce-zime-production.up.railway.app/api/marca-products";
  let allMarcas: any[] = [];
  let marcaPage = 1;
  let hasMoreMarcaPages = true;
  let useMarcasEndpoint = true;

  // Intentar obtener marcas de endpoint específico
  try {
    const res = await fetch(
      `${marcasApiUrl}?populate=*&pagination[page]=${marcaPage}&pagination[pageSize]=${pageSize}&publicationState=live`,
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      const json = await res.json();
      if (json?.data && Array.isArray(json.data)) {
        allMarcas = json.data;
        const pagination = json.meta?.pagination;
        if (pagination && pagination.pageCount > 1) {
          while (marcaPage < pagination.pageCount) {
            marcaPage++;
            const nextRes = await fetch(
              `${marcasApiUrl}?populate=*&pagination[page]=${marcaPage}&pagination[pageSize]=${pageSize}&publicationState=live`,
              { cache: "no-store" }
            );
            if (nextRes.ok) {
              const nextJson = await nextRes.json();
              if (nextJson?.data && Array.isArray(nextJson.data)) {
                allMarcas = allMarcas.concat(nextJson.data);
              }
            }
          }
        }
        console.log(`Total marcas obtenidas del endpoint: ${allMarcas.length}`);
      } else {
        useMarcasEndpoint = false;
      }
    } else {
      useMarcasEndpoint = false;
    }
  } catch (error) {
    console.log("No se encontró endpoint de marcas, extrayendo de productos");
    useMarcasEndpoint = false;
  }

  // Si no hay endpoint de marcas, extraer marcas únicas de los productos
  if (!useMarcasEndpoint || allMarcas.length === 0) {
    const marcasSet = new Set<string>();
    
    allProducts.forEach((product: any) => {
      let marcaName: string | null = null;
      
      // Intentar obtener el nombre de la marca de diferentes formas
      if (product?.marcaProduct?.nameMarca) {
        marcaName = product.marcaProduct.nameMarca;
      } else if (product?.attributes?.marcaProduct?.nameMarca) {
        marcaName = product.attributes.marcaProduct.nameMarca;
      } else if (product?.attributes?.marcaProduct?.data?.attributes?.nameMarca) {
        marcaName = product.attributes.marcaProduct.data.attributes.nameMarca;
      }
      
      if (marcaName && typeof marcaName === "string" && marcaName.trim().length > 0) {
        marcasSet.add(marcaName.trim());
      }
    });
    
    allMarcas = Array.from(marcasSet).map(name => ({ nameMarca: name }));
    console.log(`Total marcas únicas extraídas de productos: ${allMarcas.length}`);
  }

  // Filtrar y mapear marcas válidas
  const marcas = allMarcas
    .map((marca: any) => {
      // Intentar obtener el nombre de la marca de diferentes formas
      let marcaName: string | null = null;
      
      if (marca?.nameMarca) {
        marcaName = marca.nameMarca;
      } else if (marca?.attributes?.nameMarca) {
        marcaName = marca.attributes.nameMarca;
      }
      
      return marcaName;
    })
    .filter((marcaName: string | null): marcaName is string => 
      typeof marcaName === "string" && marcaName.length > 0
    )
    .map((marcaName: string) => ({
      url: `${baseUrl}/marca/${marcaName}`,
      lastModified: new Date(),
      priority: 0.8,
    }));

  console.log(`Marcas válidas para sitemap: ${marcas.length}`);

  // URLs estáticas de marcas principales
  const staticMarcas = [
    {
      url: `${baseUrl}/marca/LUCECO`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marca/PHILCO`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marca/TECNOLED`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marca/SUPRA`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marca/LEDVANCE`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marca/LUMIANCE`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/luminarias`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/postes`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      priority: 0.6,
    },
    ...categories,
    ...staticMarcas,
    ...marcas,
    ...products,
  ];
}