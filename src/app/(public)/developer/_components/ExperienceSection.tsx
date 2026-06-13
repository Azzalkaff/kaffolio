import FadeIn, { StaggerContainer, StaggerItem } from '@/components/shared/FadeIn';

/**
 * Interface untuk item pengalaman
 */
interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Fullstack Developer',
    company: 'Freelance',
    period: '2023 - Present',
    description: 'Mengembangkan berbagai aplikasi web dari sisi frontend maupun backend untuk klien lokal dan internasional.'
  },
  {
    id: 'exp-2',
    role: 'Mahasiswa Teknik Informatika',
    company: 'Universitas',
    period: '2021 - Present',
    description: 'Fokus mempelajari algoritma, struktur data, pengembangan perangkat lunak, dan kecerdasan buatan.'
  }
];

/**
 * Komponen untuk menampilkan riwayat pengalaman kerja atau pendidikan.
 * 
 * @returns {JSX.Element} Bagian pengalaman
 */
export default function ExperienceSection() {
  return (
    <div className="space-y-12">
      <FadeIn direction="up">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Experience</h2>
          <p className="text-lg text-muted-foreground">
            Jejak langkah perjalanan karir dan pendidikan saya hingga saat ini.
          </p>
        </div>
      </FadeIn>

      <div className="max-w-3xl mx-auto">
        <StaggerContainer staggerChildren={0.2} className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {EXPERIENCES.map((exp) => (
            <StaggerItem key={exp.id}>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-2 h-2 rounded-full bg-background" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                    <h3 className="font-bold text-xl text-card-foreground">{exp.role}</h3>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-max">{exp.period}</span>
                  </div>
                  <h4 className="font-medium text-secondary mb-4">{exp.company}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
