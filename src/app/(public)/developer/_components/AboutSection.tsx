import SkillsSection from '@/components/profile/SkillsSection';
import FadeIn from '@/components/shared/FadeIn';
import { TypewriterText } from '@/components/shared/Typewriter';
import Link from 'next/link';
import DownloadButton from '@/components/shared/DownloadButton';

export default function AboutSection() {
  // TODO: Sprint 5 - Fetch from MongoDB via API
  const about = {
    name: 'Kaffa Elghifari',
    title: 'Senior Full-Stack Engineer',
    bio: 'I am a passionate software engineer with over 4 years of experience building scalable, accessible, and highly performant web applications. From designing microservices to crafting pixel-perfect interfaces, I love solving complex problems with elegant code.',
    avatarUrl:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop',
    skills: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Node.js'],
  };

  return (
    <section id="about" className="space-y-12 py-16 scroll-mt-16">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl font-bold text-foreground">
          <TypewriterText text="About Me" />
        </h2>
        <p className="text-xl text-muted-foreground">Get to know me and my journey</p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Box 1: Avatar Profile */}
        <div className="md:col-span-1 p-4 sm:p-8 flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative w-40 h-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={about.avatarUrl}
              alt={about.name}
              className="w-full h-full rounded-full border-4 border-primary/20 object-cover shadow-inner"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{about.name}</h3>
              <p className="text-primary font-medium">{about.title}</p>
            </div>
            
            <DownloadButton 
              fileUrl="/Kaffa_Elghifari_CV.pdf" 
              fileName="Kaffa_Elghifari_ATS_CV.pdf" 
              label="Download ATS CV"
              className="w-full"
            />
          </div>
        </div>

        {/* Box 2: Bio */}
        <div className="md:col-span-2 p-4 sm:p-8 flex flex-col justify-center space-y-6">
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-4">
            <span className="w-8 h-[2px] bg-primary block"></span>
            My Story
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">{about.bio}</p>
        </div>

        {/* Box 3: Skills Section (Takes full width of Bento) */}
        <div className="md:col-span-3">
          <SkillsSection />
        </div>
      </div>
    </section>
  );
}
