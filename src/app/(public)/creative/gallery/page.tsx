import { Metadata } from 'next';
import PinterestGalleryClient from './_components/PinterestGalleryClient';
import { getAllCreativeProjects } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Creative Gallery | Kaffolio',
  description: 'A visual collection of creative directions, branding experiments, and digital art concepts.',
};

export default function CreativeGalleryPage() {
  const creativeProjects = getAllCreativeProjects();

  return <PinterestGalleryClient initialProjects={creativeProjects} />;
}
