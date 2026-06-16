import React from 'react';
import { SiGoogleanalytics, SiMeta, SiGoogleads, SiHubspot } from 'react-icons/si';
import { TrendingUp } from 'lucide-react';

interface StatisticItemProps {
  id: string;
  metric: string;
  delta: string;
  descriptor: string;
  context: string;
  proofCue: string;
  IconComponent: React.ElementType;
}

const STATISTICS_DATA: StatisticItemProps[] = [
  {
    id: 'stat-1',
    metric: '120%',
    delta: '+12%',
    descriptor: 'Increase in organic traffic',
    context: 'in 6 months',
    proofCue: 'Verified by GA4',
    IconComponent: SiGoogleanalytics,
  },
  {
    id: 'stat-2',
    metric: '50+',
    delta: '+5',
    descriptor: 'Campaigns managed',
    context: 'across B2B & D2C',
    proofCue: 'Meta Ads',
    IconComponent: SiMeta,
  },
  {
    id: 'stat-3',
    metric: 'Rp500M+',
    delta: '+50M',
    descriptor: 'Ad budget handled',
    context: 'Q3-Q4 2025',
    proofCue: 'Google Ads',
    IconComponent: SiGoogleads,
  },
  {
    id: 'stat-4',
    metric: '8.5K',
    delta: '+1.2K',
    descriptor: 'Monthly active leads',
    context: 'average per month',
    proofCue: 'Hubspot',
    IconComponent: SiHubspot,
  },
];

/**
 * Micro-component: Render a single statistics card.
 * Enforces visual hierarchy: Metric > Descriptor > Context > Proof Cue
 * 
 * @param {StatisticItemProps} props - Data untuk satu kartu statistik
 * @returns {React.ReactElement}
 */
function StatisticCard(props: StatisticItemProps): React.ReactElement {
  return (
    <div className="flex flex-col p-6 border border-border/40 bg-card/30 hover:bg-card/60 transition-colors">
      <div className="flex items-end justify-between mb-2">
        <span className="text-5xl lg:text-6xl font-black tracking-tighter text-foreground">
          {props.metric}
        </span>
        <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold mb-1">
          <TrendingUp className="w-3 h-3" />
          <span>{props.delta}</span>
        </div>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">
        {props.descriptor}
      </h3>
      <p className="text-sm text-muted-foreground font-medium mb-6">
        {props.context}
      </p>
      
      <div className="mt-auto pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
        <props.IconComponent className="w-4 h-4 opacity-70" />
        <span className="uppercase tracking-wider font-semibold opacity-70">{props.proofCue}</span>
      </div>
    </div>
  );
}

/**
 * Komponen utama MarketingStats.
 * Berfungsi sebagai credibility snapshot dengan 4 metrik utama.
 * 
 * @returns {React.ReactElement}
 */
export default function MarketingStats(): React.ReactElement {
  return (
    <section className="w-full px-4 md:px-12 py-16 md:py-24 border-y border-border/30 bg-muted/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
            Quick Achievements
          </h2>
          <p className="text-3xl md:text-4xl font-light text-foreground leading-tight tracking-tight max-w-2xl">
            Numbers that speak louder than promises.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {STATISTICS_DATA.map((stat) => (
            <StatisticCard key={stat.id} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
