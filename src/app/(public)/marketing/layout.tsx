import Navigation from '@/components/layout/Navigation';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const marketingLinks = [
    { label: 'Growth', href: '/marketing#hero-marketing' },
    { label: 'Strategy', href: '/marketing#strategy' },
    { label: 'Campaigns', href: '/marketing#campaigns' },
    { label: 'Reviews', href: '/marketing#reviews' },
    { label: 'Connect', href: '/marketing#connect-marketing' },
  ];

  return (
    <>
      <Navigation links={marketingLinks} />
      {children}
    </>
  );
}
