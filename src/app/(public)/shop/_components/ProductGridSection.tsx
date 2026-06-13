import FadeIn, { StaggerContainer, StaggerItem } from '@/components/shared/FadeIn';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { getAllProducts } from '@/lib/mdx';

/**
 * Komponen untuk menampilkan daftar (grid) produk digital
 * Mengambil data dari berkas MDX lokal.
 */
export default function ProductGridSection() {
  const products = getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <FadeIn direction="up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
          <p className="text-muted-foreground">{products.length} items</p>
        </div>
      </FadeIn>

      <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DUMMY_PRODUCTS.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard {...product} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
