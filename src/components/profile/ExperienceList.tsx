'use client';

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
}

interface ExperienceListProps {
  experience: ExperienceItem[];
}

export default function ExperienceList({ experience }: ExperienceListProps) {
  if (!experience || experience.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground flex items-center gap-4">
        <span className="w-12 h-[2px] bg-primary block"></span>
        Experience
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experience.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-card border border-border rounded-lg shadow-sm hover:border-primary transition-colors"
          >
            <h4 className="text-xl font-bold text-card-foreground">{item.position}</h4>
            <div className="text-primary font-medium mt-1">{item.company}</div>
            <div className="text-muted-foreground text-sm mt-2">{item.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
