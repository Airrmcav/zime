export type CatalogoType = {
    id: number;
    documentId?: string;
    nameCatalogo: string;
    descriptionCatalogo: string; 
    slug: string;
    isFeatured?: boolean;
    mainImage: Array<{
        id: number;
        name: string;
        alternativeText: string | null;
        url: string;
        formats: {
            large: {
                url: string;
            };
            medium: {
                url: string;
            };
            small: {
                url: string;
            };
            thumbnail: {
                url: string;
            };
        };
    }>;
}