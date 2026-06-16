import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getMarketingCampaignBySlug, getAllMarketingCampaigns, MarketingOutcome, MarketingSnapshot } from '@/lib/mdx';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const campaigns = getAllMarketingCampaigns();
  return campaigns.map((campaign) => ({
    slug: campaign.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getMarketingCampaignBySlug(slug);
  if (!campaign) return { title: 'Not Found' };
  
  return {
    title: `${campaign.title} | Case Study`,
    description: campaign.shortDescription,
  };
}

function OutcomeChips({ outcomes }: { outcomes: MarketingOutcome[] }) {
  return (
    <div className="flex flex-wrap gap-4 mb-12">
      {outcomes.map((outcome, idx) => (
        <div key={idx} className="bg-primary/5 border border-primary/20 px-8 py-6 flex flex-col min-w-[160px]">
          <span className="text-4xl md:text-5xl font-black text-foreground mb-2">{outcome.metric}</span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{outcome.label}</span>
        </div>
      ))}
    </div>
  );
}

function SnapshotBar({ snapshot }: { snapshot: MarketingSnapshot }) {
  const items = [
    { label: 'Industry', value: snapshot.industry },
    { label: 'Scope', value: snapshot.scope },
    { label: 'Timeline', value: snapshot.timeline },
    { label: 'Tools', value: snapshot.tools },
    { label: 'Role', value: snapshot.role },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-8 bg-muted/10 border border-border/30 mb-16">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{item.label}</span>
          <span className="text-sm font-medium text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = getMarketingCampaignBySlug(slug);
  if (!campaign) notFound();

  return (
    <main className="flex flex-col w-full min-h-screen bg-background pb-24">
      {/* Navigation */}
      <div className="w-full px-4 md:px-12 py-8 border-b border-border/10">
        <div className="max-w-[1200px] mx-auto">
          <Link href="/marketing" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketing
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <div className="w-full relative h-[50vh] lg:h-[60vh] flex items-end">
        <Image src={campaign.img} alt={campaign.title} fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-12 pb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4 block">
            {campaign.category}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter uppercase leading-[0.9] max-w-5xl">
            {campaign.title}
          </h1>
        </div>
      </div>

      {/* Editorial Content */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-12 mt-8">
        <OutcomeChips outcomes={campaign.outcomes} />
        <SnapshotBar snapshot={campaign.snapshot} />
        
        <article className="prose prose-lg md:prose-xl dark:prose-invert max-w-4xl prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-foreground prose-li:text-muted-foreground prose-hr:border-border/30">
          {campaign.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{campaign.content}</ReactMarkdown>
          ) : (
            <p>{campaign.shortDescription}</p>
          )}
        </article>
      </div>
    </main>
  );
}
