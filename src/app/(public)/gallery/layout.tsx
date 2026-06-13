import Navigation from '@/components/layout/Navigation';

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  const galleryLinks = [
    { label: 'Back to Profile', href: '/developer' },
    { label: 'All Projects', href: '/gallery' },
  ];

  return (
    <>
      <Navigation links={galleryLinks} />
      {children}
    </>
  );
}
