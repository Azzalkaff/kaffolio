import React from 'react';
import { MonitorSmartphone, Server, Palette } from 'lucide-react';
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/shared/FadeIn';

/**
 * Interface untuk properti layanan
 */
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Membangun antarmuka web interaktif, responsif, dan mudah diakses menggunakan React dan Next.js.',
    icon: <MonitorSmartphone className="w-10 h-10 text-primary" />
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Mengembangkan API yang aman, cepat, dan terukur menggunakan Node.js dan database modern.',
    icon: <Server className="w-10 h-10 text-primary" />
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Merancang pengalaman pengguna yang intuitif dengan fokus pada estetika dan kemudahan penggunaan.',
    icon: <Palette className="w-10 h-10 text-primary" />
  }
];

/**
 * Komponen untuk menampilkan layanan atau keahlian utama yang ditawarkan.
 * 
 * @returns {React.ReactElement} Bagian layanan
 */
export default function ServicesSection() {
  return (
    <div className="space-y-12">
      <FadeIn direction="up">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">What I Do</h2>
          <p className="text-lg text-muted-foreground">
            Spesialisasi dan layanan teknis yang dapat saya berikan untuk membantu menyelesaikan masalah Anda.
          </p>
        </div>
      </FadeIn>

      <StaggerContainer staggerChildren={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <StaggerItem key={service.id}>
            <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors h-full flex flex-col space-y-4">
              <div className="p-3 bg-primary/10 w-max rounded-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">{service.title}</h3>
              <p className="text-muted-foreground flex-grow leading-relaxed">
                {service.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
