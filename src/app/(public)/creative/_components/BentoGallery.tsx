'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const CATEGORIES = ['All', 'Branding', 'Motion', 'UI/UX', 'Digital Art'];

const DUMMY_PROJECTS = [
  { id: 1, title: 'Nova Identity', category: 'Branding', size: 'large', img: 'https://images.unsplash.com/photo-1628102491629-77858ab5721d?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, title: 'Fintech App', category: 'UI/UX', size: 'small', img: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, title: 'Kinetic Type', category: 'Motion', size: 'small', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, title: 'Cyber Poster', category: 'Digital Art', size: 'medium', img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, title: 'Lumina Brand', category: 'Branding', size: 'medium', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop' },
  { id: 6, title: 'Crypto Dashboard', category: 'UI/UX', size: 'large', img: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop' },
];

export default function BentoGallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = DUMMY_PROJECTS.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="w-full px-4 sm:px-6 py-16">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => {
            // Determine span based on size
            const spanClass = 
              project.size === 'large' ? 'col-span-1 sm:col-span-2 row-span-2' :
              project.size === 'medium' ? 'col-span-1 sm:col-span-2 row-span-1' :
              'col-span-1 row-span-1';

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`relative group rounded-3xl overflow-hidden cursor-pointer ${spanClass}`}
              >
                <Image 
                  src={project.img} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-primary font-medium text-sm mb-1">{project.category}</span>
                  <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
