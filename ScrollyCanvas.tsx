'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // IMPORTANT: Update this to match the exact number of frames in your /public/sequence/ folder
  const frameCount = 89; 

  // 1. Preload images safely and strictly ordered
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      
      // Ensure this string matches your extracted file names exactly!
      // e.g., "frame_00_delay-0.067s.webp" -> padStart(2, '0') makes 0 become "00"
      const frameNum = i.toString().padStart(2, '0');
      img.src = `/sequence/frame_${frameNum}_delay-0.067s.webp`;
      
      img.onload = () => {
        loadedImages[i] = img;
        loadedCount++;
        
        // Draw the very first frame immediately so the screen isn't blank while scrolling
        if (i === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawImage(ctx, img, canvasRef.current);
          }
        }

        // Once all frames load, commit them to state
        if (loadedCount === frameCount) {
          setImages([...loadedImages]);
        }
      };
    }
  }, []);

  // 2. Setup Scroll Tracking
  const { scrollYProgress } = useScroll();
  
  // Apply a spring to smooth out the scroll progress (fixes jagged scrolling on standard mice)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50, // lower stiffness gives a more floaty, cinematic feel
    damping: 20,   // lower damping lets it glide further
    restDelta: 0.001
  });

  // Map the smoothed scroll progress (0 to 1) directly to our image array bounds (0 to frameCount - 1)
  const currentFrameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // 3. Draw on Canvas whenever the scroll changes
  useMotionValueEvent(currentFrameIndex, "change", (latestIndex) => {
    if (images.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const frameIndex = Math.floor(latestIndex);
    // Find the next frame for crossfade blending
    const nextFrameIndex = Math.min(frameIndex + 1, frameCount - 1);
    // Get the decimal part (e.g. 10.45 -> 0.45)
    const fraction = latestIndex - frameIndex; 
    
    if (ctx && images[frameIndex]) {
      // Clear canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the base frame
      ctx.globalAlpha = 1;
      drawImage(ctx, images[frameIndex], canvas);
      
      // Blend the next frame on top to create an ultra-smooth crossfade effect
      if (fraction > 0 && images[nextFrameIndex]) {
        ctx.globalAlpha = fraction;
        drawImage(ctx, images[nextFrameIndex], canvas);
        ctx.globalAlpha = 1; // Reset alpha
      }
    }
  });

  // Helper function to replicate CSS `object-fit: cover` on HTML5 Canvas
  const drawImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    // Notice we removed ctx.clearRect here so we can layer images for crossfading
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // 4. Handle Window Resizes
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      
      if (images.length > 0) {
        const ctx = canvasRef.current.getContext('2d');
        const latestIndex = currentFrameIndex.get();
        const frameIndex = Math.floor(latestIndex);
        const nextFrameIndex = Math.min(frameIndex + 1, frameCount - 1);
        const fraction = latestIndex - frameIndex;

        if (ctx && images[frameIndex]) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.globalAlpha = 1;
          drawImage(ctx, images[frameIndex], canvasRef.current);
          if (fraction > 0 && images[nextFrameIndex]) {
            ctx.globalAlpha = fraction;
            drawImage(ctx, images[nextFrameIndex], canvasRef.current);
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    // Set initial size and listen for resizes
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, currentFrameIndex]);

  return (
    <div className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </div>
  );
}