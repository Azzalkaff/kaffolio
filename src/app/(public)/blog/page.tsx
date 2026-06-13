import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import BlogCard from './_components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog | Kaffolio',
  description: 'Artikel, tutorial, dan opini seputar pengembangan web, UI/UX, dan karir.',
};

export default function BlogPage() {
  const articles = getAllArticles();
  return (
    <div className="space-y-12 min-h-[70vh]">
      <div className="text-center space-y-4 pt-12">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary">Engineering & Design Blog</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about frontend architecture, UI/UX, and building digital
          products.
        </p>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
