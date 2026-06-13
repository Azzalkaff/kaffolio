import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Article } from '@/lib/mdx';

export default function BlogCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="block group">
      <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
        </div>

        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
