'use client';

import { Mail } from 'lucide-react';
import SocialLinks from '@/components/shared/SocialLinks';
import FadeIn from '@/components/shared/FadeIn';
import { TypewriterText } from '@/components/shared/Typewriter';

export default function ConnectSection() {
  // TODO: Sprint 5 - Fetch Profile data from MongoDB for real email & socials
  const profile = {
    contactEmail: 'hello@kaffaelghifari.dev',
    socialLinks: {
      github: 'https://github.com/kaffaelghifari',
      linkedin: 'https://linkedin.com/in/kaffaelghifari',
      threads: 'https://threads.net/@kaffadev',
      instagram: 'https://instagram.com/kaffadev',
      etsy: 'https://etsy.com/shop/kaffastudio',
      fiverr: 'https://fiverr.com/kaffadev',
    },
  };

  return (
    <section id="connect" className="space-y-12 py-16 scroll-mt-16">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl font-bold text-foreground">
          <TypewriterText text="Connect With Me" />
        </h2>
        <p className="text-xl text-muted-foreground">Let&apos;s work together or just say hello</p>
      </div>

      <FadeIn delay={0.2} direction="up" className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Email Link */}
          {profile.contactEmail && (
            <a
              href={`mailto:${profile.contactEmail}`}
              className="flex items-center gap-4 p-4 rounded-full border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all group shadow-sm hover:shadow-md"
            >
              <div className="p-3 bg-foreground text-background rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail size={24} />
              </div>
              <div className="pr-4">
                <p className="text-sm text-muted-foreground">Drop me an Email</p>
                <p className="font-bold text-card-foreground text-lg">{profile.contactEmail}</p>
              </div>
            </a>
          )}
        </div>

        {/* Render Social Links component */}
        <SocialLinks social={profile.socialLinks} />
      </FadeIn>
    </section>
  );
}
