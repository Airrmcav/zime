// export type ProductType = {
//   id: number;
//   documentId: string;
//   productName: string;
//   slug: string;
//   description: string;
//   price?: number; // si lo manejas
//   quantity?: number; // cantidad de productos en el carrito
//   isFeatured: boolean;
//   active: boolean;
//   topProduct?: boolean;
//   area?: string;
//   images: {
//     id: number;
//     url: string;
//     alternativeText?: string | null;
//     caption?: string | null;
//   }[];
//   category: {
//     id: number;
//     documentId: string;
//     slug: string;
//     categoryName: string;
//   };
//   characteristics: string | {
//     nombre?: string;
//     categorias?: string[];
//     caracteristicas?: {
//       [key: string]: string | number | boolean;
//     };
//   };
// };
export type ProductType = {
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string | null;
  price?: number;
  quantity?: number;
  isFeatured: boolean;
  active: boolean;
  topProduct?: boolean;
  catalogo: {
    id: number;
    descriptionCatalogo: string;
    slug: string;
    nameCatalogo: string;
  };
  area?: string; 
  images: {
    id: number;
    url: string;
    alternativeText?: string | null;
    caption?: string | null;
  }[];
  category: {
    id: number;
    documentId: string;
    slug: string;
    categoryName: string;
  };
  characteristics?:
    | string
    | {
        nombre?: string;
        categorias?: string[];
        caracteristicas?: {
          [key: string]: string | number | boolean;
        };
      };
  // Añadimos la propiedad marcaProduct para productos por marca
  marcaProduct?: {
    id?: number;
    nameMarca?: string;
    descriptionMarca?: string;
    mainImage?: {
      url: string;
    };
  };
};
