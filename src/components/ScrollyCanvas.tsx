"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, animate } from "framer-motion";

const FRAME_COUNT = 120; // 0 to 119

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 200,
    mass: 1,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1], { clamp: true });

  // Overlay Animations
  const opacity1 = useTransform(smoothProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0], { clamp: true });
  const y1 = useTransform(smoothProgress, [0, 0.05, 0.15, 0.2], [50, 0, 0, -100], { clamp: true });

  const opacity2 = useTransform(smoothProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0], { clamp: true });
  const y2 = useTransform(smoothProgress, [0.2, 0.5], [100, -100], { clamp: true });

  const opacity3 = useTransform(smoothProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0], { clamp: true });
  const y3 = useTransform(smoothProgress, [0.5, 0.8], [100, -100], { clamp: true });

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const lastDrawnIndex = useRef<number | null>(null);

  const drawFrame = (index: number) => {
    if (lastDrawnIndex.current === index) return;
    
    const images = imagesRef.current;
    if (!canvasRef.current || !images[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    const scaledWidth = Math.floor(width * dpr);
    const scaledHeight = Math.floor(height * dpr);

    if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
    }

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    // Add a zoom factor to crop out watermarks near the edges (like the Veo logo)
    const zoom = 1.15; 

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width * zoom;
      drawHeight = (canvas.width / imgRatio) * zoom;
    } else {
      drawWidth = (canvas.height * imgRatio) * zoom;
      drawHeight = canvas.height * zoom;
    }
    
    // Center the zoomed image
    offsetX = (canvas.width - drawWidth) / 2;
    offsetY = (canvas.height - drawHeight) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Enable high quality smoothing for better scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    lastDrawnIndex.current = index;
  };

  useEffect(() => {
    if (imagesLoaded && imagesRef.current.length > 0) {
      drawFrame(0);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      if (imagesLoaded) {
        drawFrame(Math.floor(latest));
      }
    });
    return () => unsubscribe();
  }, [imagesLoaded, frameIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded) {
        drawFrame(Math.floor(frameIndex.get()));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-zinc-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 bg-zinc-950 z-50">
            <div className="w-8 h-8 border-4 border-zinc-800 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <p className="text-sm tracking-widest uppercase font-mono text-zinc-400">Loading Sequence...</p>
          </div>
        )}

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-10">
          <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute w-full h-full flex flex-col justify-center px-6 md:px-24">
            <h1 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter leading-[0.95] mb-8 uppercase">
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #71717a' }}>KOYYANA</span>
              <br className="hidden md:block"/>
              <span className="text-zinc-100">TARUN KUMAR</span><span className="text-emerald-500">.</span>
            </h1>
            <p className="text-xl md:text-3xl font-light text-zinc-400 tracking-wide mb-12">
              AI/ML Engineer <span className="text-emerald-500 mx-2 font-medium">&amp;</span> Full-Stack Developer
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 pointer-events-auto relative z-50">
              <a 
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('projects');
                  if (!target) return;
                  const targetPos = target.getBoundingClientRect().top + window.scrollY;
                  document.documentElement.style.scrollBehavior = 'auto';
                  animate(window.scrollY, targetPos, {
                    duration: 2,
                    ease: [0.76, 0, 0.24, 1],
                    onUpdate: (v) => window.scrollTo({ top: v }),
                    onComplete: () => { document.documentElement.style.scrollBehavior = ''; }
                  });
                }}
                className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-100 font-mono tracking-widest uppercase text-sm transition-colors cursor-pointer"
              >
                <span className="w-8 h-px bg-zinc-700 group-hover:bg-emerald-500 group-hover:w-12 transition-all duration-300"></span>
                View Projects
              </a>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('contact');
                  if (!target) return;
                  const targetPos = target.getBoundingClientRect().top + window.scrollY;
                  document.documentElement.style.scrollBehavior = 'auto';
                  animate(window.scrollY, targetPos, {
                    duration: 2.2,
                    ease: [0.76, 0, 0.24, 1],
                    onUpdate: (v) => window.scrollTo({ top: v }),
                    onComplete: () => { document.documentElement.style.scrollBehavior = ''; }
                  });
                }}
                className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-100 font-mono tracking-widest uppercase text-sm transition-colors cursor-pointer"
              >
                <span className="w-8 h-px bg-zinc-700 group-hover:bg-emerald-500 group-hover:w-12 transition-all duration-300"></span>
                Get In Touch
              </a>
            </div>
          </motion.div>

          <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute w-full px-6 md:px-24 flex justify-start">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-zinc-100 mb-6 leading-tight">
                Building intelligent <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">systems from scratch.</span>
              </h2>
              <div className="h-1 w-20 bg-zinc-800 mb-6" />
              <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed">
                Reinforcement Learning, Computer Vision, and full-stack AI applications.
              </p>
            </div>
          </motion.div>

          <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute w-full px-6 md:px-24 flex justify-end text-right">
            <div className="max-w-2xl flex flex-col items-end">
              <div className="grid grid-cols-3 gap-8 md:gap-16 text-left">
                <div>
                  <h3 className="text-4xl md:text-6xl font-display font-medium text-zinc-100 mb-2">3+</h3>
                  <p className="text-sm md:text-base text-zinc-500 font-mono uppercase tracking-widest">AI/ML Projects</p>
                </div>
                <div>
                  <h3 className="text-4xl md:text-6xl font-display font-medium text-zinc-100 mb-2">300+</h3>
                  <p className="text-sm md:text-base text-zinc-500 font-mono uppercase tracking-widest">RL Games</p>
                </div>
                <div>
                  <h3 className="text-4xl md:text-6xl font-display font-medium text-zinc-100 mb-2">96%</h3>
                  <p className="text-sm md:text-base text-zinc-500 font-mono uppercase tracking-widest">Accuracy</p>
                </div>
              </div>
              <div className="mt-12 flex gap-6 pointer-events-auto">
                <a href="#projects" className="px-8 py-4 bg-zinc-100 text-zinc-950 font-display font-medium rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
                  View Projects
                </a>
                <a href="#contact" className="px-8 py-4 border border-zinc-700 text-zinc-300 font-display font-medium rounded-full hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
                  Get in touch
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
