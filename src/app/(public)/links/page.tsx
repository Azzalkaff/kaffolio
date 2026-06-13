import Link from 'next/link';
import { ExternalLink, Briefcase, ShoppingBag, BookOpen } from 'lucide-react';

export default function LinksPage() {
  const affiliateLinks = [
    { title: 'My Coding Setup (Shopee)', url: '#', icon: <ShoppingBag size={20} /> },
    { title: 'Best Mechanical Keyboard (TikTok Shop)', url: '#', icon: <ShoppingBag size={20} /> },
    { title: 'Learn Next.js (Course Affiliate)', url: '#', icon: <ExternalLink size={20} /> },
  ];

  const mainLinks = [
    { title: 'Hire Me as Developer', url: '/developer', icon: <Briefcase size={20} /> },
    { title: 'Read My Blog', url: '/blog', icon: <BookOpen size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-16 px-4 transition-colors duration-300">
      {/* Profile Section */}
      <div className="text-center space-y-4 mb-10">
        <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          K
        </div>
        <h1 className="text-2xl font-bold text-foreground">@kaffolio</h1>
        <p className="text-muted-foreground">I design, build, and ship digital products.</p>
      </div>

      {/* Links Container */}
      <div className="w-full max-w-md space-y-8">
        {/* Main Routes */}
        <div className="space-y-3">
          {mainLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              className="flex items-center justify-between w-full p-4 bg-card border border-border rounded-xl text-card-foreground font-semibold hover:border-primary hover:text-primary hover:shadow-md transition-all"
            >
              <span>{link.title}</span>
              <div className="text-muted-foreground">{link.icon}</div>
            </Link>
          ))}
        </div>

        {/* Affiliate Links */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">
            Recommended Gear
          </h2>
          {affiliateLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-4 bg-card border border-border rounded-xl text-card-foreground font-semibold hover:border-primary hover:text-primary hover:shadow-md transition-all"
            >
              <span>{link.title}</span>
              <div className="text-muted-foreground">{link.icon}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
