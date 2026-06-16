'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CreativeProject } from '@/lib/mdx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PinterestGalleryClientProps {
  initialProjects: CreativeProject[];
}

export default function PinterestGalleryClient({ initialProjects }: PinterestGalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<CreativeProject | null>(null);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-black text-foreground mb-4"
        >
          Design Inspiration
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          A visual collection of creative directions, branding experiments, and digital art concepts. 
          Presented in a seamless masonry layout.
        </motion.p>
      </div>

      {/* Masonry Layout Grid using CSS columns */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {initialProjects.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={() => setSelectedImage(item)}
            // break-inside-avoid ensures the card isn't split across columns
            className={`relative w-full rounded-2xl overflow-hidden group cursor-pointer bg-card border border-border break-inside-avoid`}
          >
            <Image 
              src={item.img} 
              alt={item.title} 
              width={1200}
              height={1200}
              style={{ width: '100%', height: 'auto' }}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="transition-transform duration-700 group-hover:scale-110" 
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row cursor-default bg-card rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
            >
              {/* Image Column: 40% Width on Desktop */}
              <div className="relative w-full md:w-[40%] h-[45vh] md:h-[90vh] bg-black/5 dark:bg-white/5 flex-shrink-0 flex items-center justify-center">
                <Image 
                  src={selectedImage.img} 
                  alt={selectedImage.title} 
                  fill
                  className="object-contain p-4 md:p-8"
                />
              </div>

              {/* Text Column: 60% Width on Desktop */}
              <div className="w-full md:w-[60%] p-6 md:p-10 overflow-y-auto max-h-[90vh] flex-grow">
                <h2 className="text-3xl font-bold text-foreground mb-2">{selectedImage.title}</h2>
                {selectedImage.content ? (
                  <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-p:font-primary prose-headings:font-secondary prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary-hover prose-hr:border-border">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedImage.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-muted-foreground">{selectedImage.shortDescription || 'No description available.'}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
