'use client';

import { motion } from 'framer-motion';
import { 
  SiGoogleanalytics,
  SiFacebook,
  SiMeta,
  SiMailchimp,
  SiTiktok,
  SiWordpress,
  SiHubspot,
  SiGoogleads
} from 'react-icons/si';

export default function MarketingMarquee() {
  return (
    <div className="w-full relative z-30 -my-12">
      <div className="w-[110%] -ml-[5%] bg-foreground text-background py-8 flex whitespace-nowrap border-y-4 border-primary/20 -rotate-2 scale-[1.01] shadow-2xl origin-center overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex items-center"
        >
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-12 md:gap-24 flex-shrink-0 px-6 md:px-12">
              <SiGoogleanalytics className="w-10 h-10 md:w-14 md:h-14 hover:text-[#E37400] transition-colors" />
              <SiGoogleads className="w-10 h-10 md:w-14 md:h-14 hover:text-[#4285F4] transition-colors" />
              <SiMeta className="w-10 h-10 md:w-14 md:h-14 hover:text-[#0668E1] transition-colors" />
              <SiFacebook className="w-10 h-10 md:w-14 md:h-14 hover:text-[#1877F2] transition-colors" />
              <SiTiktok className="w-10 h-10 md:w-14 md:h-14 hover:text-[#000000] transition-colors dark:hover:text-white" />
              <SiMailchimp className="w-10 h-10 md:w-14 md:h-14 hover:text-[#FFE01B] transition-colors" />
              <SiHubspot className="w-10 h-10 md:w-14 md:h-14 hover:text-[#FF7A59] transition-colors" />
              <SiWordpress className="w-10 h-10 md:w-14 md:h-14 hover:text-[#21759B] transition-colors" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
