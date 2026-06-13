import Navigation from '@/components/layout/Navigation';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const blogLinks = [
    { label: 'Home', href: '/blog' },
    { label: 'Back to Hub', href: '/' },
  ];

  return (
    <>
      <Navigation links={blogLinks} />
      {children}
    </>
  );
}
