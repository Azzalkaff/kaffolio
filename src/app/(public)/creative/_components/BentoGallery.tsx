'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CreativeProject } from '@/lib/mdx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BentoGalleryProps {
  initialProjects: CreativeProject[];
}

export default function BentoGallery({ initialProjects }: BentoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<CreativeProject | null>(null);

  const CATEGORIES = ['All', ...Array.from(new Set(initialProjects.map((p) => p.category)))].filter(Boolean);

  const filteredProjects = initialProjects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="w-full px-4 md:px-12 py-8 md:py-12 border-t border-border/30">
      
      {/* Header & Filters */}
      <div className="max-w-[1400px] mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
            The Gallery
          </h2>
          <p className="text-2xl md:text-4xl font-light text-foreground leading-tight tracking-tight">
            Selected <span className="italic font-serif text-muted-foreground">Exhibitions</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat
                ? 'bg-foreground text-background'
                : 'bg-muted/30 text-muted-foreground hover:bg-muted/80'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Spread Grid */}
      <motion.div
        layout
        className="max-w-[1400px] mx-auto columns-1 sm:columns-2 lg:columns-3 gap-8 md:gap-16 space-y-8 md:space-y-16"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => {
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                onClick={() => setSelectedImage(project)}
                className="relative group cursor-zoom-in w-full break-inside-avoid flex flex-col"
              >
                {/* Image Container */}
                <div className="overflow-hidden bg-muted/20">
                  <Image
                    src={project.img}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    style={{ width: '100%', height: 'auto' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>

                {/* Naked Content Below */}
                <div className="pt-6 pb-2 flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 sm:p-8 backdrop-blur-md cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-4 rounded-full bg-muted/20 text-foreground hover:bg-muted/50 transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-7xl max-h-[90vh] flex flex-col md:flex-row cursor-default bg-card shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full md:w-1/2 h-[45vh] md:h-[90vh] bg-muted/10 flex-shrink-0 flex items-center justify-center">
                <Image 
                  src={selectedImage.img} 
                  alt={selectedImage.title} 
                  fill
                  className="object-contain p-4 md:p-12"
                />
              </div>

              <div className="w-full md:w-1/2 py-8 md:py-16 px-8 md:px-16 overflow-y-auto max-h-[90vh] flex-grow">
                <div className="mb-8 border-b border-border/30 pb-8">
                  <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4 block">
                    {selectedImage.category}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
                    {selectedImage.title}
                  </h2>
                </div>

                {selectedImage.content ? (
                  <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedImage.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-xl text-muted-foreground leading-relaxed font-light">
                    {selectedImage.shortDescription || 'No description available.'}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-32 flex justify-center">
        <button
          onClick={() => window.location.href = '/creative/gallery'}
          className="group px-10 py-5 border border-foreground text-foreground hover:bg-foreground hover:text-background font-bold text-sm uppercase tracking-widest transition-all duration-500 flex items-center gap-4"
        >
          Explore Pinterest Vibe Gallery
          <span className="group-hover:translate-x-2 transition-transform duration-300">➔</span>
        </button>
      </div>
    </div>
  );
}
