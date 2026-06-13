import { notFound } from 'next/navigation';
import { getProductById, ProductItem, getAllProducts } from '@/lib/mdx';
import { ArrowLeft, ShoppingCart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * 1. The Hook: Kalimat emosional yang menyentuh pain point pengguna.
 */
function StoryHookSection({ product }: { product: ProductItem }) {
  if (!product.storyHook) return null;
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight max-w-4xl tracking-tight">
        {product.storyHook}
      </h1>
      <div className="mt-16 w-1 h-24 bg-gradient-to-b from-primary to-transparent opacity-50"></div>
    </div>
  );
}

/**
 * 2. The Problem: Memvalidasi perjuangan mereka.
 */
function ProblemNarrative({ product }: { product: ProductItem }) {
  if (!product.problemStory) return null;
  return (
    <div className="py-20 max-w-3xl mx-auto px-4 text-center space-y-8">
      <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed font-medium">
        {product.problemStory}
      </p>
    </div>
  );
}

/**
 * 3. The Reveal: Memperkenalkan Produk sebagai Solusi.
 */
function ProductReveal({ product, mainImage }: { product: ProductItem, mainImage: string }) {
  return (
    <div className="py-20 space-y-12">
      <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
        <h2 className="text-sm font-bold text-primary tracking-widest uppercase">Introducing</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-foreground">{product.title}</h3>
        <p className="text-xl text-muted-foreground">{product.description}</p>
      </div>

      <div className="w-full max-w-5xl mx-auto aspect-video md:aspect-[21/9] bg-muted rounded-3xl overflow-hidden shadow-2xl border border-border/50 relative group">
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

/**
 * 4. The Transformation: Visualisasi fitur dalam bentuk manfaat (Zig-zag Layout).
 */
function BenefitGrid({ product }: { product: ProductItem }) {
  const highlights = product.benefitHighlights || [];
  
  return (
    <div className="py-20 space-y-24 max-w-5xl mx-auto px-4">
      {highlights.map((benefit, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
            <div className="flex-1 space-y-6">
              <h4 className="text-3xl font-bold text-foreground">{benefit.title}</h4>
              <p className="text-xl text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
            <div className="flex-1 w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-border/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={benefit.imageUrl} alt={benefit.title} className="w-full h-full object-cover" />
            </div>
          </div>
        );
      })}

      {/* Bonus Features List */}
      {product.features && product.features.length > 0 && (
        <div className="mt-24 bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
          <h4 className="text-2xl font-bold text-center mb-8">What You'll Get</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="text-primary shrink-0" size={24} />
                <span className="text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 5. The Climax (CTA): Penawaran harga dan tombol Buy.
 */
function ProductCallToAction({ product }: { product: ProductItem }) {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4">
      <div className="bg-card border border-primary/20 rounded-[3rem] p-8 md:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
          Start Your Transformation Today
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Instant lifetime access. Pay once, no monthly subscriptions.
        </p>
        
        <div className="pt-8">
          <span className="text-6xl md:text-7xl font-black text-primary block mb-8">{product.price}</span>
          <a
            href={product.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all font-bold text-xl md:text-2xl shadow-xl hover:-translate-y-1"
          >
            <ShoppingCart size={28} /> Get Instant Access
          </a>
          <p className="text-sm text-muted-foreground mt-6 font-medium">Secure payment via {product.platformName}</p>
        </div>
      </div>
    </div>
  );
}

// Generate static params so Next.js pre-renders all product pages
export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

/**
 * Halaman detail produk (Scrollytelling Layout).
 */
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return notFound();

  const mainImage = product.galleryUrls?.[0] || product.thumbnailUrl;

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Sticky Back Navigation */}
      <div className="fixed top-24 left-4 md:left-8 z-50">
        <Link
          href="/shop"
          className="flex items-center justify-center w-12 h-12 bg-background/80 backdrop-blur-md border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>

      <StoryHookSection product={product} />
      <ProblemNarrative product={product} />
      <ProductReveal product={product} mainImage={mainImage} />
      <BenefitGrid product={product} />
      <ProductCallToAction product={product} />
    </div>
  );
}
