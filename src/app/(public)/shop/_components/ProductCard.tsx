'use client';

import { ExternalLink, Eye, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductItem } from '@/lib/mdx';

/**
 * Komponen kartu untuk menampilkan produk digital satuan
 * 
 * @param {ProductItem} props - Properti produk
 * @returns {JSX.Element} Kartu produk
 */
export default function ProductCard({
  id,
  title,
  description,
  price,
  thumbnailUrl,
  platformName,
  externalLink,
  previewLink,
  badge
}: ProductItem) {
  return (
    <div className="group relative flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors h-full shadow-sm hover:shadow-md">
      {/* Thumbnail */}
      <Link href={`/shop/${id}`} className="relative aspect-video w-full overflow-hidden bg-muted block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/600x400?text=' + encodeURIComponent(title);
          }}
        />
        {badge && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {badge}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div className="flex justify-between items-start gap-4">
          <Link href={`/shop/${id}`} className="hover:text-primary transition-colors">
            <h3 className="text-xl font-bold text-card-foreground line-clamp-2">{title}</h3>
          </Link>
          <span className="text-xl font-bold text-primary whitespace-nowrap">{price}</span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Actions */}
        <div className="pt-4 border-t border-border/50">
          <Link
            href={`/shop/${id}`}
            className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-3 px-4 rounded-xl font-bold hover:bg-secondary/80 transition-colors"
          >
            <Eye size={18} />
            Lihat Detail Planner
          </Link>
        </div>
      </div>
    </div>
  );
}
