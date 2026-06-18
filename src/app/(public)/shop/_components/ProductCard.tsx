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
  type,
  description,
  price,
  thumbnailUrl,
  platformName,
  externalLink,
  previewLink,
  badge
}: ProductItem) {
  return (
    <div className="group relative flex flex-col h-full bg-transparent">
      {/* Thumbnail Container */}
      <Link href={`/shop/${id}`} className="relative aspect-[4/3] w-full flex items-center justify-center bg-transparent mb-5 transition-transform duration-500 group-hover:-translate-y-2">
        
        {/* Printable Paper UI */}
        {type === 'printable' && (
          <div className="relative w-[55%] aspect-[1/1.414] bg-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:rotate-2 ring-1 ring-black/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] to-transparent z-10 pointer-events-none" />
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover relative z-0"
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x560?text=' + encodeURIComponent(title); }}
            />
          </div>
        )}

        {/* Planner iPad UI */}
        {type === 'planner' && (
          <div className="relative w-[80%] aspect-[1.43/1] bg-[#1a1a1a] p-2 md:p-3 rounded-2xl md:rounded-[1.5rem] shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-3xl ring-1 ring-white/10">
            {/* Buttons */}
            <div className="absolute top-6 -left-1 w-1 h-8 bg-[#333] rounded-l-sm" />
            <div className="absolute top-16 -left-1 w-1 h-8 bg-[#333] rounded-l-sm" />
            {/* Screen */}
            <div className="relative w-full h-full bg-black rounded-lg md:rounded-xl overflow-hidden border border-white/5">
              <img 
                src={thumbnailUrl} 
                alt={title} 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x420?text=' + encodeURIComponent(title); }}
              />
            </div>
            {/* Camera */}
            <div className="absolute top-1/2 left-1 md:left-1.5 -translate-y-1/2 w-1 h-1 md:w-1.5 md:h-1.5 bg-[#0a0a0a] rounded-full border border-white/10" />
          </div>
        )}

        {/* Fallback UI */}
        {(!type || (type !== 'printable' && type !== 'planner')) && (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x400?text=' + encodeURIComponent(title); }}
          />
        )}
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg z-30">
            {badge}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="px-2 text-center">
        <Link href={`/shop/${id}`} className="hover:text-primary transition-colors inline-block w-full">
          <h3 className="text-lg font-bold text-foreground truncate">{title}</h3>
        </Link>
      </div>
    </div>
  );
}
