'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';
import reviews from '@/content/marketing-reviews.json';

export default function MarketingReviews() {
  return (
    <div className="w-full px-4 md:px-12 py-8 md:py-16 border-t border-border/30">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
            Client Success
          </h2>
          <p className="text-3xl md:text-5xl font-light text-foreground leading-tight tracking-tight max-w-2xl">
            Don't just take my word for it. Look at the <span className="italic font-serif text-primary">data</span>.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border/50 p-8 md:p-10 flex flex-col justify-between hover:border-primary/50 transition-colors group"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-8">
                  {Array(review.rating).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-[#F7B500] text-[#F7B500]" 
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-lg md:text-xl text-foreground font-light leading-relaxed mb-12">
                  "{review.review}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-border group-hover:border-primary transition-colors">
                  <Image 
                    src={review.image} 
                    alt={review.name} 
                    fill 
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground">
                    {review.name}
                  </h4>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">
                    {review.status}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
