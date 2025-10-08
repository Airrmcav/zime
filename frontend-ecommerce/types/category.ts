export type CategoryType = {
    id: number;
    categoryName: string;
    descriptionCategory: string; 
    slug: string;
    isFeatured?: boolean;
    mainImage: {
        url: string;
        alternativeText?: string;
    };
}