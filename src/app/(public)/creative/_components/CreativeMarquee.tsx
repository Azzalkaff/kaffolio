'use client';

import { motion } from 'framer-motion';
import { 
  SiFigma, 
  SiCanva, 
  SiBlender, 
  SiFramer, 
  SiWebflow, 
  SiSketch,
  SiMiro,
  SiInvision
} from 'react-icons/si';

export default function CreativeMarquee() {
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
              <SiFigma className="w-10 h-10 md:w-14 md:h-14 hover:text-[#F24E1E] transition-colors" />
              <SiCanva className="w-10 h-10 md:w-14 md:h-14 hover:text-[#00C4CC] transition-colors" />
              <SiSketch className="w-10 h-10 md:w-14 md:h-14 hover:text-[#F7B500] transition-colors" />
              <SiBlender className="w-10 h-10 md:w-14 md:h-14 hover:text-[#F5792A] transition-colors" />
              <SiFramer className="w-10 h-10 md:w-14 md:h-14 hover:text-[#0055FF] transition-colors" />
              <SiWebflow className="w-10 h-10 md:w-14 md:h-14 hover:text-[#4353FF] transition-colors" />
              <SiMiro className="w-10 h-10 md:w-14 md:h-14 hover:text-[#050038] transition-colors" />
              <SiInvision className="w-10 h-10 md:w-14 md:h-14 hover:text-[#FF3366] transition-colors" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
