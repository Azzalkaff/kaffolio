'use client';

import React, { useState } from 'react';
import { Portfolio } from '@/lib/mdx';
import PortfolioCard from './PortfolioCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsGallery({ 
  portfolios, 
  layoutType = 'staggered' 
}: { 
  portfolios: Portfolio[];
  layoutType?: 'staggered' | 'standard';
}) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Web', 'Mobile', 'Desktop'];

  const filteredPortfolios = activeCategory === 'All' 
    ? portfolios 
    : portfolios.filter(p => p.category === activeCategory);

  const containerClass = layoutType === 'staggered'
    ? "grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-16 md:gap-y-0"
    : "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12";

  const itemClass = layoutType === 'staggered'
    ? "md:even:mt-32 md:odd:mb-32 h-full"
    : "h-full";

  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
              activeCategory === category 
                ? 'bg-foreground text-background shadow-lg scale-105' 
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* The Grid Gallery */}
      <div className={containerClass}>
        <AnimatePresence mode="popLayout">
          {filteredPortfolios.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              key={project.id}
              className={itemClass}
            >
              <PortfolioCard {...project} isAdmin={false} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredPortfolios.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="col-span-full py-32 text-center flex flex-col items-center justify-center"
          >
             <span className="text-6xl mb-6">🗄️</span>
             <h3 className="text-2xl font-bold text-foreground">No Projects Found</h3>
             <p className="text-muted-foreground mt-2">There are no {activeCategory} projects to display right now.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
