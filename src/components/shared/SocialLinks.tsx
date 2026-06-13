'use client';

import { siGithub, siInstagram, siThreads, siEtsy, siFiverr } from 'simple-icons';

// Manual definition for LinkedIn since simple-icons removed it
const siLinkedin = {
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
};

interface SocialLinksProps {
  social: {
    github?: string;
    linkedin?: string;
    threads?: string;
    instagram?: string;
    etsy?: string;
    fiverr?: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleIcon = ({ icon, className = '' }: { icon: any; className?: string }) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
};

const SOCIAL_PLATFORMS = [
  { id: 'github' as const, label: 'GitHub', icon: siGithub, hoverBg: 'hover:bg-[#333]' },
  { id: 'linkedin' as const, label: 'LinkedIn', icon: siLinkedin, hoverBg: 'hover:bg-[#0077b5]' },
  {
    id: 'instagram' as const,
    label: 'Instagram',
    icon: siInstagram,
    hoverBg: 'hover:bg-[#E1306C]',
  },
  { id: 'threads' as const, label: 'Threads', icon: siThreads, hoverBg: 'hover:bg-black' },
  { id: 'etsy' as const, label: 'Etsy', icon: siEtsy, hoverBg: 'hover:bg-[#F16521]' },
  { id: 'fiverr' as const, label: 'Fiverr', icon: siFiverr, hoverBg: 'hover:bg-[#1dbf73]' },
];

export default function SocialLinks({ social }: SocialLinksProps) {
  if (!social) return null;

  // Ukuran icon dapat disesuaikan di sini
  const iconSizeClass = 'w-[75px] h-[75px]';

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {SOCIAL_PLATFORMS.map((platform) => {
        const url = social[platform.id];
        if (!url) return null;

        return (
          <a
            key={platform.id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-white transition-all shadow-sm font-semibold ${platform.hoverBg}`}
            aria-label={platform.label}
          >
            <SimpleIcon icon={platform.icon} className={iconSizeClass} />
            {platform.label}
          </a>
        );
      })}
    </div>
  );
}
