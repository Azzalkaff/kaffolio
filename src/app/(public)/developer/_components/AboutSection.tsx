'use client';

import FadeIn from '@/components/shared/FadeIn';
import { TypewriterText } from '@/components/shared/Typewriter';
import { motion } from 'framer-motion';
import { Download, Globe2, MapPin } from 'lucide-react';
import SkillsSection from '@/components/profile/SkillsSection';

export default function AboutSection() {
  // TODO: Sprint 5 - Fetch from MongoDB via API
  const about = {
    name: 'Syahid Alkaff',
    title: '1st year Computer Science Student',
    bio: 'I am a passionate software engineer with a strong foundation in computer science. I am constantly learning and improving my skills to build innovative and user-friendly applications. I am also a team player and enjoy collaborating with others to create amazing products.',
    avatarUrl: '/images/profile.png',
    skills: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'Tailwind', 'Node.js'],
  };

  return (
    <section id="about" className="space-y-12 py-16 scroll-mt-16 w-full mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-5xl md:text-7xl font-black text-foreground uppercase tracking-tighter">
          <TypewriterText text="About Me" />
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-min max-w-6xl mx-auto">

        {/* Box 1: Holographic ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-1 h-[350px] md:h-[450px] relative rounded-[2rem] overflow-hidden group bg-card border border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
        >
          {/* Duotone Filter via Mix-blend */}
          <div className="absolute inset-0 bg-primary/20 mix-blend-color z-10 transition-opacity duration-500 group-hover:opacity-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={about.avatarUrl}
            alt={about.name}
            className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
          />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="inline-block px-3 py-1 bg-background/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-primary mb-3">
              Identity
            </div>
            <h3 className="text-3xl font-black leading-none text-foreground uppercase tracking-tighter">
              {about.name.split(' ').map((n, i) => <span key={i} className="block">{n}</span>)}
            </h3>
            <p className="text-xs font-mono text-muted-foreground mt-3 uppercase tracking-wider">
              // {about.title}
            </p>
          </div>
        </motion.div>

        {/* Right Column wrapper for Desktop to manage rows */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* Box 2: Brutalist Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3 p-8 md:p-12 rounded-[2rem] bg-card border border-border/50 flex flex-col justify-center relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700" />
            <h3 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-foreground leading-[1.2] z-10 tracking-tight">
              I build <span className="bg-primary/10 text-primary px-2 rounded-lg italic font-serif">scalable</span>, accessible, and highly performant web applications.
              I love solving complex problems with <span className="border-b-4 border-primary">elegant code</span>.
            </h3>
          </motion.div>

          {/* Box 3: Live Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 p-6 md:p-8 rounded-[2rem] bg-card border border-border/50 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow min-h-[200px]"
          >
            <div className="flex justify-between items-start">
              <Globe2 className="text-muted-foreground group-hover:text-primary transition-colors" size={28} />
              <div className="flex h-4 w-4 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">Current Status</p>
              <p className="text-xl font-bold text-foreground flex items-center gap-2">
                <MapPin size={20} className="text-primary" /> Based in Indonesia
              </p>
            </div>
          </motion.div>

          {/* Box 4: Tech Stack Visualizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 p-6 md:p-8 rounded-[2rem] bg-card border border-border/50 flex flex-col justify-center overflow-hidden relative shadow-sm hover:shadow-md transition-shadow min-h-[200px]"
          >
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4 absolute top-8 left-8 z-10">Core Stack</p>
            <div className="flex flex-wrap gap-2 lg:gap-3 mt-6 z-10 relative">
              {about.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-background border border-border/50 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
            {/* Decorative background grid */}
            <div className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          </motion.div>
        </div>

        {/* Box 5: Kinetic Download Bar */}
        <motion.a
          href="/Syahid_Alkaf_CV.pdf"
          download="Syahid_Alkaf_ATS_CV.pdf"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="md:col-span-4 h-16 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-primary text-primary-foreground overflow-hidden relative group cursor-pointer flex items-center shadow-sm hover:shadow-md transition-all"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-foreground text-background font-black text-lg md:text-2xl uppercase tracking-widest">
            <Download className="mr-3 w-5 h-5 md:w-6 md:h-6" /> Click to Download
          </div>
          <div className="flex whitespace-nowrap opacity-100 group-hover:opacity-5 transition-opacity duration-300 w-[200%]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              className="inline-block font-black text-3xl md:text-5xl tracking-tighter uppercase"
            >
              DOWNLOAD ATS CV ➔ DOWNLOAD ATS CV ➔ DOWNLOAD ATS CV ➔ DOWNLOAD ATS CV ➔ DOWNLOAD ATS CV ➔
            </motion.div>
          </div>
        </motion.a>

      </div>

      {/* Skills Section (Kept intact below the bento grid) */}
      <div className="mt-32 max-w-6xl mx-auto">
        <SkillsSection />
      </div>
    </section>
  );
}
