'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/shared/FadeIn';
import { TypewriterText } from '@/components/shared/Typewriter';
import certificatesData from '@/content/certificates.json';

interface CertificateProps {
  id: string;
  title: string;
  imageUrl?: string;
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
  imageUrl,
  onImageClick,
}: CertificateProps): JSX.Element {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-xl hover:border-primary transition-colors shadow-sm flex flex-col h-full overflow-hidden group">
      {/* Image Container */}
      <div 
        className="w-full h-48 bg-muted relative overflow-hidden border-b border-border cursor-pointer"
        onClick={onImageClick}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl || `https://via.placeholder.com/600x400?text=${encodeURIComponent(title)}`}
          alt={`${title} certificate`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow justify-center text-center">
        <h4 className="font-bold text-card-foreground text-lg leading-tight">{title}</h4>
      </div>
    </div>
  );
}

/**
 * Komponen seksi Sertifikat untuk halaman utama developer portofolio.
 * Menampilkan daftar sertifikat profesional yang dimiliki.
 * Mematuhi coding standard: JSDoc, Server Component, Strict Typing, Guard Clauses/Pemisahan.
 *
 * @returns {JSX.Element} Bagian antarmuka Sertifikat
 */
export default function CertificateSection(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certificates" className="space-y-12 py-16 scroll-mt-16">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl font-bold text-foreground">
          <TypewriterText text="Certificates" />
        </h2>
        <p className="text-xl text-muted-foreground">Professional validations and licenses</p>
      </div>

      <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {certificatesData.map((cert) => (
          <StaggerItem key={cert.id} className="h-full">
            <CertificateCard 
              {...cert} 
              onImageClick={() => setSelectedImage(cert.imageUrl || `https://via.placeholder.com/600x400?text=${encodeURIComponent(cert.title)}`)} 
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Modal / Lightbox untuk Gambar */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex justify-center items-center animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika gambar diklik
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={selectedImage} 
              alt="Certificate Full View" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
            />
            <button 
              className="absolute -top-4 -right-4 md:top-4 md:right-4 bg-card text-card-foreground rounded-full p-2 hover:bg-muted border border-border transition-colors shadow-lg"
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
