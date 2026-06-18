import Navigation from '@/components/layout/Navigation';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const blogLinks = [
    { label: 'Home', href: '/blog' },
    { label: 'Back to Hub', href: '/' },
  ];

  return (
    <>
      <Navigation links={blogLinks} />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-24 pb-16">
        {children}
      </div>
    </>
  );
}
