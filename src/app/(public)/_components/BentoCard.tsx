import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from '@/components/shared/FadeIn';

interface BentoCardProps {
  href: string;
  title: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  delay?: number;
}

/**
 * Komponen kartu untuk layout Bento Grid.
 * Menerapkan prinsip desain Brave Minimalism dengan sudut melengkung, efek transisi halus,
 * dan hierarki visual yang jelas.
 */
export default function BentoCard({ 
  href, 
  title, 
  description, 
  className = '', 
  icon, 
  children,
  delay = 0 
}: BentoCardProps) {
  return (
    <FadeIn delay={delay} className={`group h-full ${className}`}>
      <Link 
        href={href}
        className="block relative w-full h-full p-6 md:p-8 rounded-[2rem] border border-border/50 bg-card overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30"
      >
        {/* Subtle Gradient Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-12">
            <div className="p-4 bg-muted/50 rounded-2xl text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              {icon}
            </div>
            <div className="p-2 rounded-full bg-muted/50 text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all duration-300">
              <ArrowUpRight size={24} />
            </div>
          </div>
          
          <div className="mt-auto space-y-3 z-10 relative bg-card/80 backdrop-blur-sm p-4 -m-4 rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            {description && (
              <p className="text-muted-foreground line-clamp-2 text-sm md:text-base">
                {description}
              </p>
            )}
          </div>
          
          {/* Custom Visual Injections */}
          {children && (
            <div className="absolute right-0 top-0 bottom-0 pointer-events-none opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
              {children}
            </div>
          )}
        </div>
      </Link>
    </FadeIn>
  );
}
