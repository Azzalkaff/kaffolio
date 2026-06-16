import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950 border-t border-white/10 pt-16 pb-8 px-4 md:px-12 relative z-20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter text-white">
            Kaffolio.
          </Link>
          <p className="text-zinc-400 font-light leading-relaxed">
            Bridging the gap between engineering, design, and growth. Building digital experiences that perform and inspire.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white hover:text-zinc-950 text-white rounded-full transition-colors">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white hover:text-zinc-950 text-white rounded-full transition-colors">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white hover:text-zinc-950 text-white rounded-full transition-colors">
              <FiInstagram className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white hover:text-zinc-950 text-white rounded-full transition-colors">
              <FiTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2">Explore</span>
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors font-medium">Home</Link>
            <Link href="/developer" className="text-zinc-400 hover:text-white transition-colors font-medium">Developer</Link>
            <Link href="/creative" className="text-zinc-400 hover:text-white transition-colors font-medium">Creative</Link>
            <Link href="/marketing" className="text-zinc-400 hover:text-white transition-colors font-medium">Marketing</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2">Connect</span>
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors font-medium">Blog</Link>
            <Link href="/shop" className="text-zinc-400 hover:text-white transition-colors font-medium">Shop</Link>
            <a href="mailto:hello@kaffolio.com" className="text-zinc-400 hover:text-white transition-colors font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contact
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
          © {currentYear} Kaffa Elghifari. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-xs text-zinc-500 hover:text-white uppercase tracking-wider transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-xs text-zinc-500 hover:text-white uppercase tracking-wider transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
