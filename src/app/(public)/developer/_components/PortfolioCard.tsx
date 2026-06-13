'use client';

import Link from 'next/link';

export interface PortfolioCardProps {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  completedDate?: string;
  isOngoing: boolean;
  isFeatured: boolean;
  techStack: string[];
  cloudinaryUrl: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  youtubeUrl?: string;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function PortfolioCard({
  id,
  slug,
  title,
  shortDescription,
  completedDate,
  isOngoing,
  isFeatured,
  techStack,
  cloudinaryUrl,
  isAdmin = false,
  onEdit,
  onDelete,
}: PortfolioCardProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden hover:border-primary transition-colors bg-card text-card-foreground flex flex-col h-full relative group">
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
          Featured
        </div>
      )}

      {/* Image */}
      <Link
        href={`/gallery/${slug}`}
        className="block w-full h-48 bg-muted overflow-hidden relative group-hover:opacity-90"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cloudinaryUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/500x300?text=' + encodeURIComponent(title);
          }}
        />
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3 flex-grow flex flex-col">
        {/* Title */}
        <Link href={`/gallery/${slug}`} className="inline-block">
          <h3 className="text-xl font-bold text-card-foreground hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Date & Status */}
        <div className="flex items-center gap-2">
          {isOngoing ? (
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded">
              Work In Progress
            </span>
          ) : completedDate ? (
            <p className="text-sm text-muted-foreground">
              Completed:{' '}
              {new Date(completedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          ) : null}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-primary/10 text-xs font-semibold text-primary rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">{shortDescription}</p>

        {/* Detail Button */}
        <div className="pt-4 border-t border-border mt-auto w-full">
          <Link
            href={`/gallery/${slug}`}
            className="flex items-center justify-center w-full py-2.5 text-sm font-bold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all group"
          >
            View Case Study
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        {/* Admin Buttons */}
        {isAdmin && (
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border mt-4">
            <div className="flex ml-auto gap-2">
              <button
                onClick={() => onEdit?.(id)}
                className="px-3 py-1 text-sm font-medium bg-secondary text-white rounded hover:bg-slate-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(id)}
                className="px-3 py-1 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
