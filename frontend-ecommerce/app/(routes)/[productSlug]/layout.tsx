import { Metadata } from 'next';

async function getProductBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1337';
    const url = new URL(`${baseUrl}/api/products`);
    
    url.searchParams.append('populate', '*');
    url.searchParams.append('pagination[pageSize]', '500');
    url.searchParams.append('filters[slug][$eq]', slug);
    
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) return null;
    
    const json = await res.json();
    return json.data && json.data.length > 0 ? json.data[0] : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

type Props = {
  params: Promise<{ productSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  
  const product = await getProductBySlug(productSlug);
  
  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto solicitado no existe.',
    };
  }
  
  const productImage = product.images?.[0]?.url || '';
  
  return {
    title: product.productName || 'Producto',
    description: product.description || 'Descubre nuestros productos industriales de alta calidad.',
    openGraph: {
      title: product.productName || 'Producto',
      description: product.description || 'Descubre nuestros productos industriales de alta calidad.',
      images: productImage ? [productImage] : [],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
