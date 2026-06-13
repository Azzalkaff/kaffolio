import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ExternalLink, Github, Calendar, Target, Lightbulb, Rocket, ArrowLeft, Code } from 'lucide-react';
import { getPortfolioBySlug, Portfolio, getAllPortfolios } from '@/lib/mdx';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Komponen pembantu untuk menampilkan bagian atas (Hero) dari case study.
 *
 * @param {object} props - Berisi data project
 * @returns {JSX.Element} Bagian judul, deskripsi, dan tombol aksi
 */
function ProjectHero({ project }: { project: Portfolio }) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
        {project.title}
      </h1>
      <p className="text-xl text-muted-foreground leading-relaxed">{project.shortDescription}</p>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech, idx) => (
          <span
            key={idx}
            className="px-4 py-1.5 bg-card border border-border text-sm font-semibold text-card-foreground rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        {project.liveDemoUrl && (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-semibold shadow-sm"
          >
            <ExternalLink size={20} /> Kunjungi Web
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold shadow-sm"
          >
            <Code size={20} /> Source Code
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Komponen pembantu untuk menampilkan konten rincian case study (latar belakang, dll).
 *
 * @param {object} props - Berisi data project
 * @returns {JSX.Element} Bagian detail konten proyek
 */
function ProjectDetails({ project }: { project: Portfolio }) {
  return (
    <div className="space-y-10">
      {project.background && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Latar Belakang</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.background}</p>
        </section>
      )}

      {project.challenges && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Tantangan</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.challenges}</p>
        </section>
      )}

      {project.solutions && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Solusi Teknis</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.solutions}</p>
        </section>
      )}

      {project.results && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Hasil & Dampak</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.results}</p>
        </section>
      )}

      {project.content && (
        <section className="prose prose-lg dark:prose-invert max-w-none prose-p:font-primary prose-headings:font-secondary prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary-hover prose-img:rounded-2xl prose-img:shadow-sm prose-img:w-full prose-img:object-cover prose-hr:border-border">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.content}
          </ReactMarkdown>
        </section>
      )}
    </div>
  );
}

// Static generation
export function generateStaticParams() {
  const portfolios = getAllPortfolios();
  return portfolios.map((portfolio) => ({
    slug: portfolio.slug,
  }));
}

/**
 * Halaman detail portofolio (Immersive Case Study).
 * Menampilkan rincian teknis, latar belakang, dan tautan live/source code.
 * Memisahkan komponen Hero untuk menjaga ukuran fungsi maksimal 50 baris.
 *
 * @param {PageProps} props - Properti Next.js berisi params (termasuk slug)
 * @returns {Promise<JSX.Element>} Antarmuka halaman detail portofolio
 */
export default async function GalleryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Guard Clause: Jika project tidak ditemukan, kembalikan halaman 404
  const project = getPortfolioBySlug(slug);
  if (!project) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      <div className="pt-4">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Kembali ke Gallery
        </Link>
      </div>

      <ProjectHero project={project} />

      <div className="w-full aspect-video bg-muted rounded-2xl overflow-hidden shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cloudinaryUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <ProjectDetails project={project} />
    </div>
  );
}
