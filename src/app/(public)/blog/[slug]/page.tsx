import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8 pb-16 pt-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to articles</span>
      </Link>

      <div className="space-y-6 pb-8 border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-6 text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none prose-headings:text-secondary prose-a:text-primary">
        {article.content}
      </div>
    </article>
  );
}
