'use client';

import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'UI/UX Design', design: 9, usability: 10, creativity: 9, content: 9, overall: '9.25' },
  { name: 'Brand Identity', design: 10, usability: 9, creativity: 10, content: 10, overall: '9.75' },
  { name: 'Graphic Arts', design: 10, usability: 8, creativity: 10, content: 9, overall: '9.25' },
  { name: 'Motion & Video', design: 8, usability: 8, creativity: 9, content: 8, overall: '8.25' },
  { name: '3D Visuals', design: 8, usability: 7, creativity: 9, content: 7, overall: '7.75' },
];

export default function CreativeSkills() {
  return (
    <div className="w-full py-24 md:py-32 px-4 md:px-12 border-t border-border/30">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="mb-16 md:mb-24">
          <h2 className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-[0.3em] mb-4">
            Technical Arsenal
          </h2>
          <p className="text-3xl md:text-5xl font-light text-foreground leading-tight tracking-tight">
            Self-evaluated <span className="italic font-serif text-muted-foreground">metrics</span>.
          </p>
        </div>

        {/* Awwwards Style Table */}
        <div className="w-full overflow-x-auto pb-8">
          <table className="w-full text-center border-collapse min-w-[900px]">
            <thead>
              <tr>
                <th className="pb-8 px-4 text-left font-medium text-foreground w-1/4">Discipline</th>
                <th className="pb-8 px-4 font-medium text-foreground">Design</th>
                <th className="pb-8 px-4 font-medium text-foreground">Usability</th>
                <th className="pb-8 px-4 font-medium text-foreground">Creativity</th>
                <th className="pb-8 px-4 font-medium text-foreground">Content</th>
                <th className="pb-8 px-8 font-medium text-foreground bg-muted/40 rounded-t-xl">Overall</th>
              </tr>
            </thead>
            <tbody>
              {SKILLS.map((skill, idx) => (
                <tr key={idx} className="border-t border-dashed border-foreground/20 hover:bg-muted/5 transition-colors group">
                  <td className="py-12 px-4 text-left text-xl md:text-2xl font-bold text-foreground">
                    {skill.name}
                  </td>
                  <td className="py-12 px-4 text-3xl md:text-4xl font-light text-foreground/80">
                    {skill.design}
                  </td>
                  <td className="py-12 px-4 text-3xl md:text-4xl font-light text-foreground/80">
                    {skill.usability}
                  </td>
                  <td className="py-12 px-4 text-3xl md:text-4xl font-light text-foreground/80">
                    {skill.creativity}
                  </td>
                  <td className="py-12 px-4 text-3xl md:text-4xl font-light text-foreground/80">
                    {skill.content}
                  </td>
                  <td className={`py-12 px-8 text-3xl md:text-4xl font-black text-foreground bg-muted/40 ${idx === SKILLS.length - 1 ? 'rounded-b-xl' : ''}`}>
                    {skill.overall}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
