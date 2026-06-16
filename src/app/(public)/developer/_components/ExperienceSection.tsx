'use client';

import { motion } from 'framer-motion';

/**
 * Interface untuk item pengalaman
 */
interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  techStack?: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Undergraduate Student',
    company: 'Bandung State of Polytech',
    period: '2025 - Present',
    description: 'Learn fundamental algorithm, data structure, computational thinking, OOP',
    techStack: ['Python', 'C', 'Java', 'JavaScript']
  },
  {
    id: 'exp-2',
    role: 'Freelance Web Developer',
    company: 'Fiverr',
    period: '2025 - Present',
    description: 'Build custom web application for client',
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'PostgreSQL']
  }
];

/**
 * Komponen untuk menampilkan riwayat pengalaman kerja atau pendidikan.
 * Menggunakan layout Editorial Sticky-Scroll.
 * 
 * @returns {JSX.Element} Bagian pengalaman
 */
export default function ExperienceSection() {
  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

        {/* Left Column: Sticky Header */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-32 flex flex-col items-start">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground uppercase tracking-tighter leading-none"
            >
              History.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 w-24 h-2 bg-primary origin-left"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-xl text-muted-foreground font-medium max-w-sm"
            >
              Jejak langkah perjalanan karir dan pendidikan saya hingga saat ini.
            </motion.p>
          </div>
        </div>

        {/* Right Column: Scrollable List */}
        <div className="lg:col-span-7 flex flex-col gap-24 lg:gap-32 lg:pt-12 pb-16">
          {EXPERIENCES.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0.2, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-10% 0px -10% 0px", once: false }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-4 group"
            >
              <div className="flex flex-col xl:flex-row xl:items-baseline justify-between gap-4 border-b border-border/40 pb-6 transition-colors group-hover:border-primary/50">
                <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
                  {exp.role}
                </h3>
                <span className="text-lg md:text-xl font-semibold text-primary shrink-0 font-mono bg-primary/5 px-4 py-1.5 rounded-full w-max">
                  {exp.period}
                </span>
              </div>

              <h4 className="text-xl md:text-2xl text-secondary font-serif italic mt-2">
                {exp.company}
              </h4>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mt-4">
                {exp.description}
              </p>

              {exp.techStack && exp.techStack.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-8">
                  {exp.techStack.map((tech, idx) => (
                    <span key={idx} className="text-sm font-bold tracking-widest uppercase text-muted-foreground/80 flex items-center">
                      {idx > 0 && <span className="mr-4 text-border/50">•</span>}
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
