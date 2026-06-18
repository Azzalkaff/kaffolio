'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/shared/FadeIn';
import { TypewriterText } from '@/components/shared/Typewriter';
import certificatesData from '@/content/certificates.json';

interface CertificateProps {
  id: string;
  title: string;
  issuer?: string;
  year?: string;
  type?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  onImageClick?: () => void;
}



/**
 * Komponen kartu untuk menampilkan satu sertifikat.
 *
 * @param {CertificateProps} props - Data sertifikat yang akan ditampilkan
 * @returns {JSX.Element} Elemen kartu sertifikat
 */
function CertificateCard({
  title,
  type,
  imageUrl,
  onImageClick,
}: CertificateProps) {
  const isAward = type === 'Award';

  return (
    <div 
      className="relative group cursor-zoom-in w-full break-inside-avoid flex flex-col"
      onClick={onImageClick}
    >
      {/* Image Container ONLY */}
      <div className={`relative overflow-hidden bg-muted/20 border ${isAward ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/10' : 'border-border/50'} aspect-[4/3] rounded-xl group-hover:border-primary transition-colors duration-500`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl || `https://via.placeholder.com/600x400?text=${encodeURIComponent(title)}`}
          alt={`${title} certificate`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Subtle overlay indicator */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-foreground font-bold tracking-widest uppercase text-sm bg-background/80 backdrop-blur-sm px-6 py-2 rounded-full">
            View Details
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Komponen seksi Sertifikat untuk halaman utama developer portofolio.
 */
export default function CertificateSection() {
  const [selectedCert, setSelectedCert] = useState<CertificateProps | null>(null);

  return (
    <section id="certificates" className="space-y-12 py-16 scroll-mt-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tighter">
          <TypewriterText text="Awards & Certifications." />
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          Awards, competition achievements, and validation of professional skills. <br/>
          <span className="text-base opacity-80">(Penghargaan, pencapaian kompetisi, dan validasi keahlian profesional.)</span>
        </p>
      </div>

      <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {certificatesData.map((cert) => (
          <StaggerItem key={cert.id} className="h-full">
            <CertificateCard 
              {...cert} 
              onImageClick={() => setSelectedCert(cert)} 
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Fullscreen Lightbox Modal (Split View) */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 sm:p-8 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setSelectedCert(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-4 rounded-full bg-muted/20 text-foreground hover:bg-muted/50 transition-colors z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCert(null);
            }}
          >
            <X size={24} />
          </button>

          <div 
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row cursor-default bg-card border border-border shadow-2xl overflow-hidden rounded-xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Image */}
            <div className="relative w-full md:w-1/2 h-[40vh] md:h-[85vh] bg-muted/30 flex-shrink-0 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedCert.imageUrl || `https://via.placeholder.com/600x400?text=${encodeURIComponent(selectedCert.title)}`} 
                alt={selectedCert.title} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-xl drop-shadow-xl" 
              />
            </div>

            {/* Right: Metadata Content */}
            <div className="w-full md:w-1/2 py-8 md:py-16 px-8 md:px-12 overflow-y-auto max-h-[50vh] md:max-h-[85vh] flex-grow flex flex-col">
              <div className="mb-8 border-b border-border/30 pb-8">
                <span className={`text-xs font-bold tracking-[0.2em] uppercase mb-4 block ${selectedCert.type === 'Award' ? 'text-yellow-600 dark:text-yellow-500' : 'text-primary'}`}>
                  {selectedCert.type === 'Award' ? '🏆 ' : ''}{selectedCert.type || 'Certificate'}
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter leading-tight">
                  {selectedCert.title}
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                {/* Meta details list */}
                <div className="flex flex-col gap-3">
                  {selectedCert.issuer && (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Issuer / Organizer</span>
                      <span className="text-lg font-medium text-foreground">{selectedCert.issuer}</span>
                    </div>
                  )}
                  
                  {selectedCert.year && (
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Year of Achievement</span>
                      <span className="text-lg font-medium text-foreground">{selectedCert.year}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {selectedCert.description && (
                  <div className="mt-4">
                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase block mb-3">About This Validation</span>
                    <p className="text-lg text-muted-foreground leading-relaxed font-light">
                      {selectedCert.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
