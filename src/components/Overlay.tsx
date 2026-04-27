"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 30% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: 60% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden">
        
        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute w-full px-6 md:px-20 text-center"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-4">
            My Name.
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 font-light tracking-wide">
            Creative Developer.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute w-full px-6 md:px-24 flex justify-start"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6">
              I build <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">
                digital experiences.
              </span>
            </h2>
            <div className="h-1 w-20 bg-white/20 mb-6" />
            <p className="text-lg md:text-2xl text-gray-400 font-light">
              Crafting immersive, high-performance interfaces that bridge the gap between design and engineering.
            </p>
          </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute w-full px-6 md:px-24 flex justify-end text-right"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Bridging design <br/> and engineering.
            </h2>
            <div className="h-1 w-20 bg-white/20 ml-auto mb-6" />
            <p className="text-lg md:text-2xl text-gray-400 font-light">
              Obsessed with micro-interactions, flawless performance, and premium aesthetics.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
