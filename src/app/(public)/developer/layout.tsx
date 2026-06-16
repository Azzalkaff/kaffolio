import Navigation from '@/components/layout/Navigation';

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  const developerLinks = [
    { label: 'Home', href: '/developer#hero' },
    { label: 'About', href: '/developer#about' },
    { label: 'Projects', href: '/developer#projects' },
    { label: 'Certificate', href: '/developer#certificate' },
    { label: 'Connect', href: '/developer#connect' },
  ];

  return (
    <>
      <Navigation links={developerLinks} />
      {children}
    </>
  );
}
