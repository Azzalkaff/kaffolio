import Navigation from '@/components/layout/Navigation';

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  const developerLinks = [
    { label: 'Home', href: '/developer#hero' },
    { label: 'About', href: '/developer#about' },
    { label: 'Gallery', href: '/developer#gallery' },
    { label: 'Certificates', href: '/developer#certificates' },
    { label: 'Connect', href: '/developer#connect' },
  ];

  return (
    <>
      <Navigation links={developerLinks} />
      {children}
    </>
  );
}
