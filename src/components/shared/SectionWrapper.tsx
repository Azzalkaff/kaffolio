import { ReactNode } from 'react';

/**
 * Interface untuk properti komponen SectionWrapper
 */
interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Komponen pembungkus untuk setiap section di halaman portofolio.
 * Menerapkan padding dan memungkinkan penambahan ID untuk navigasi anchor.
 * 
 * @param {SectionWrapperProps} props - Properti komponen
 * @returns {JSX.Element} Elemen pembungkus section
 */
export default function SectionWrapper({ children, id, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-24 ${className}`.trim()}>
      {children}
    </section>
  );
}
