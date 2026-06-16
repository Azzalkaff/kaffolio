'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MarketingCampaign } from '@/lib/mdx';

/**
 * Wrapper for the grid item.
 * @param {MarketingCampaign} campaign - The campaign item
 * @returns {React.ReactElement}
 */
function CampaignGridItem({ campaign }: { campaign: MarketingCampaign }): React.ReactElement {
  return (
    <Link href={`/marketing/case-study/${campaign.slug}`} className="block w-full break-inside-avoid mb-8 md:mb-16">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative group cursor-pointer flex flex-col"
      >
        <div className="overflow-hidden bg-muted/20 relative aspect-video w-full">
          <Image 
            src={campaign.img} 
            alt={campaign.title} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw" 
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
        </div>
        <div className="pt-6 pb-2 flex flex-col gap-2">
          <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            {campaign.category}
          </span>
          <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
            {campaign.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}

interface MarketingGalleryProps {
  campaigns: MarketingCampaign[];
}

/**
 * Main Marketing Gallery Component.
 * Renders the Bento Grid with links to standalone case study pages.
 * 
 * @param {MarketingGalleryProps} props
 * @returns {React.ReactElement}
 */
export default function MarketingGallery({ campaigns }: MarketingGalleryProps): React.ReactElement {
  return (
    <div className="w-full px-4 md:px-12 py-8 md:py-12 border-t border-border/30">
      <div className="max-w-[1400px] mx-auto mb-16">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
          Case Studies
        </h2>
        <p className="text-2xl md:text-4xl font-light text-foreground leading-tight tracking-tight">
          Growth <span className="italic font-serif text-muted-foreground">Architectures</span>
        </p>
      </div>

      <motion.div layout className="max-w-[1400px] mx-auto columns-1 sm:columns-2 gap-8 md:gap-16">
        {campaigns.map((campaign) => (
          <CampaignGridItem key={campaign.id} campaign={campaign} />
        ))}
      </motion.div>
    </div>
  );
}
