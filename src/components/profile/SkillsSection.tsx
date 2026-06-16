'use client';

import React, { useState } from 'react';

// --- Data Types ---
interface Skill {
  name: string;
  icon: string;
  level?: 'Familiar' | 'Learning' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
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
        level: 'Beginner'
      },
      {
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
        level: 'Beginner'
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
        level: 'Beginner'
      },
      {
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        level: 'Beginner'
      },
      {
        name: 'Vue.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
        level: 'Beginner'
      },
      {
        name: 'HTML',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        level: 'Beginner'
      },
      {
        name: 'CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        level: 'Beginner'
      },
      {
        name: 'Javascript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        level: 'Beginner'
      }
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        level: 'Beginner'
      },
      {
        name: 'Express',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
        level: 'Familiar'
      },
      {
        name: 'Java',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
        level: 'Beginner'
      },
      {
        name: 'C',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
        level: 'Beginner'
      },
      {
        name: 'Go',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
        level: 'Familiar'
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        level: 'Beginner'
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
        level: 'Beginner'
      },
      {
        name: 'SQLite',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
        level: 'Beginner'
      },
      {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
        level: 'Beginner'
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
        level: 'Familiar'
      },
      {
        name: 'Docker',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        level: 'Familiar'
      },
      {
        name: 'Kubernetes',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg',
        level: 'Familiar'
      },
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
        level: 'Intermediate'
      },
      {
        name: 'Linux',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
        level: 'Familiar'
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Data',
    skills: [
      {
        name: 'HuggingFace',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/huggingface/huggingface-original.svg',
      },
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
  {
    id: 'utils',
    title: 'Utils',
    skills: [
      {
        name: 'Selenium',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
      },
      {
        name: 'Beautiful Soup',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/beautifulsoup/beautifulsoup-original.svg',
      },
    ],
  },
  {
    id: 'Tools',
    title: 'Tools',
    skills:
      [
        {
          name: 'Figma',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
          level: 'Intermediate'
        },
        {
          name: 'VSCode',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
          level: 'Intermediate'
        },
        {
          name: 'AntiGravity',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/antigravity/antigravity-original.svg',
          level: 'Intermediate'
        },
        {
          name: 'Jira',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg',
          level: 'Familiar'
        },
        {
          name: 'Trello',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg',
          level: 'Familiar'
        },
        {
          name: 'XAMPP',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xampp/xampp-original.svg',
          level: 'Familiar'
        },
        {
          name: 'git',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
          level: 'Intermediate'
        },
        {
          name: 'Obsidian',
          icon: 'https: //cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/obsidian/obsidian-original.svg',
          level: 'Intermediate'
        },
        {
          name: 'Notion',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg',
          level: 'Intermediate'
        },
      ]
  }
];

// --- Configuration ---
const SKILL_CONFIG = {
  iconSizeClasses: "w-15 h-15", // Ubah ukuran icon (contoh: w-12 h-12, w-16 h-16)
  textSizeClasses: "text-lg md:text-xl", // Teks menjadi Large
};

// --- Subcomponents ---

function SkillCard({ skill }: { skill: Skill }) {
  // Fungsi kecil untuk menentukan warna berdasarkan level
  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Expert': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Advanced': return 'bg-primary/10 text-primary border-primary/20';
      case 'Intermediate': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Beginner': return 'bg-muted text-muted-foreground border-border';
      case 'Familiar': return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
      case 'Learning': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'hidden';
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border hover:border-primary hover:shadow-md transition-all group relative overflow-hidden">
      <div className={`${SKILL_CONFIG.iconSizeClasses} flex-shrink-0 bg-card shadow-sm rounded-md p-2 flex items-center justify-center group-hover:scale-110 transition-transform z-10`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={skill.icon} alt={`${skill.name} icon`} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col z-10">
        <span className={`text-card-foreground font-medium ${SKILL_CONFIG.textSizeClasses} group-hover:text-primary transition-colors`}>
          {skill.name}
        </span>
        {skill.level && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border w-max mt-1 ${getLevelColor(skill.level)}`}>
            {skill.level}
          </span>
        )}
      </div>

      {/* Subtle Background Glow on Hover based on Level */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
