'use client';

import React, { useState } from 'react';

// --- Data Types ---
interface Skill {
  name: string;
  icon: string;
}

interface Category {
  id: string;
  title: string;
  skills: Skill[];
}

// --- Data Definitions ---
const SKILL_CATEGORIES: Category[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      },
      {
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      },
      {
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
      },
      {
        name: 'Vue.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'Express',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
      },
      {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    skills: [
      {
        name: 'AWS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
      {
        name: 'Docker',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
      },
      {
        name: 'Kubernetes',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg',
      },
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
      },
      {
        name: 'Linux',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Data',
    skills: [
      {
        name: 'TensorFlow',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
      },
      {
        name: 'PyTorch',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
      },
      {
        name: 'Pandas',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
      },
      {
        name: 'Jupyter',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg',
      },
    ],
  },
];

// --- Configuration ---
const SKILL_CONFIG = {
  iconSizeClasses: "w-15 h-15", // Ubah ukuran icon (contoh: w-12 h-12, w-16 h-16)
  textSizeClasses: "text-lg md:text-xl", // Teks menjadi Large
};

// --- Subcomponents ---

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border hover:border-primary hover:shadow-md transition-all group">
      <div className={`${SKILL_CONFIG.iconSizeClasses} flex-shrink-0 bg-card shadow-sm rounded-md p-2 flex items-center justify-center group-hover:scale-110 transition-transform`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={skill.icon} alt={`${skill.name} icon`} className="w-full h-full object-contain" />
      </div>
      <span className={`text-card-foreground font-medium ${SKILL_CONFIG.textSizeClasses} group-hover:text-primary transition-colors`}>
        {skill.name}
      </span>
    </div>
  );
}

// --- Main Component ---

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>(SKILL_CATEGORIES[0].id);

  const activeCategory =
    SKILL_CATEGORIES.find((cat) => cat.id === activeTab) || SKILL_CATEGORIES[0];

  return (
    <section className="bg-card p-8 rounded-3xl border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50">
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-4">
          <span className="w-12 h-[2px] bg-primary block"></span>
          Skills & Expertise
        </h3>
      </div>

      {/* Category Buttons (Tabs) */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-5 py-2.5 text-sm font-semibold transition-all rounded-lg border ${activeTab === cat.id
              ? 'border-primary bg-primary text-primary-foreground shadow-md'
              : 'border-border bg-muted/50 text-muted-foreground hover:border-primary hover:text-primary'
              }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Active Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px] content-start">
        {activeCategory.skills.map((skill, idx) => (
          <SkillCard key={`${activeCategory.id}-${idx}`} skill={skill} />
        ))}
      </div>
    </section>
  );
}
