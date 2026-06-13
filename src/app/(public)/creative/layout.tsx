import Navigation from '@/components/layout/Navigation';

export default function CreativeLayout({ children }: { children: React.ReactNode }) {
  const creativeLinks = [
    { label: 'Showreel', href: '/creative#hero-creative' },
    { label: 'Philosophy', href: '/creative#philosophy' },
    { label: 'Gallery', href: '/creative#gallery' },
    { label: 'Services', href: '/creative#services' },
    { label: 'Connect', href: '/creative#connect-creative' },
  ];

  return (
    <>
      <Navigation links={creativeLinks} />
      {children}
    </>
  );
}
