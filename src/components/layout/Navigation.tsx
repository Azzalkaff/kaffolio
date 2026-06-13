'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '@/components/shared/ThemeToggle';

export interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  links?: NavLink[];
}

export default function Navigation({ links = [] }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full bg-background/70 backdrop-blur-md border-b border-border/50 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-primary flex-shrink-0 mr-4">
            Kaffolio
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto text-sm sm:text-base whitespace-nowrap">
              {links.map((link) => {
                const isHashLink = link.href.includes('#');
                const isActive = pathname === link.href || (!isHashLink && link.href !== '/' && pathname?.startsWith(link.href));
                
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`hover:text-primary transition-colors ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
