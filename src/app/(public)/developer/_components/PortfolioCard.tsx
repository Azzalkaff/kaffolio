'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface PortfolioCardProps {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  completedDate?: string;
  isOngoing: boolean;
  isFeatured: boolean;
  techStack: string[];
  cloudinaryUrl: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  youtubeUrl?: string;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function PortfolioCard({
  id,
  slug,
  title,
  shortDescription,
  completedDate,
  isOngoing,
  isFeatured,
  techStack,
  cloudinaryUrl,
  isAdmin = false,
  onEdit,
  onDelete,
}: PortfolioCardProps) {
  return (
    <div className="flex flex-col h-full group relative">
      {/* Monitor Display as the main clickable area */}
      <Link
        href={`/gallery/${slug}`}
        className="block w-full aspect-[4/3] sm:aspect-[16/10] relative group z-10"
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02] flex flex-col items-center justify-end">
          
          {/* Monitor Screen (Bezel) */}
          <div className="w-full h-[88%] md:h-[90%] bg-[#1a1a1a] p-2 md:p-3 rounded-t-xl rounded-b-md shadow-2xl relative z-10 border-b-4 border-[#0a0a0a] flex flex-col">
            {/* Display Area */}
            <div className="relative w-full h-full flex-grow overflow-hidden shadow-inner bg-black rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cloudinaryUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://via.placeholder.com/800x600?text=' + encodeURIComponent(title);
                }}
              />
              
              {/* Hover Overlay for Arrow */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl border border-black/10">
                  <ArrowUpRight size={28} strokeWidth={1.5} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            {/* Monitor Brand indicator / light */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/20"></div>
          </div>

          {/* Monitor Stand */}
          <div className="h-[12%] md:h-[10%] flex flex-col items-center relative z-0 -mt-[1px]">
            {/* Stand Neck */}
            <div className="w-10 md:w-16 h-3/4 bg-gradient-to-b from-[#111] to-[#222] border-x border-[#000]" />
            {/* Stand Base */}
            <div className="w-24 md:w-36 h-1/4 bg-gradient-to-b from-[#333] to-[#111] rounded-t-md shadow-2xl border-t border-white/10" />
          </div>
          
        </div>
      </Link>

      {/* Minimalist Content */}
      <div className="pt-6 pb-2 space-y-2 flex-grow flex flex-col">
        {/* Category / Status Line */}
        <div className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground/70">
          {isOngoing ? (
            <span className="text-primary font-bold">In Progress</span>
          ) : completedDate ? (
            <span>{new Date(completedDate).getFullYear()}</span>
          ) : null}
          
          {techStack?.length > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="truncate">{techStack[0]} {techStack.length > 1 && `• ${techStack[1]}`}</span>
            </>
          )}
        </div>

        {/* Title */}
        <Link href={`/gallery/${slug}`} className="inline-block">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        </Link>

        {/* Admin Buttons */}
        {isAdmin && (
          <div className="flex items-center gap-2 pt-4 mt-auto">
            <button
              onClick={() => onEdit?.(id)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(id)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-destructive text-destructive-foreground hover:bg-destructive/80 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
