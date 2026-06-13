import Navigation from '@/components/layout/Navigation';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const shopLinks = [
    { label: 'Hero', href: '/shop#shop-hero' },
    { label: 'Products', href: '/shop#products' },
    { label: 'Benefits', href: '/shop#benefits' },
    { label: 'FAQ', href: '/shop#faq' },
    { label: 'Connect', href: '/shop#connect' },
  ];

  return (
    <>
      <Navigation links={shopLinks} />
      {children}
    </>
  );
}
