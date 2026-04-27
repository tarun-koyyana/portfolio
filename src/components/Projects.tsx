"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    number: "01",
    category: "Reinforcement Learning",
    title: "RL Snake Agent — DQN",
    description: "An AI agent that learns to play Snake from absolute scratch using Deep Q-Network. No hardcoded rules — purely learns from +10/-10 rewards. Achieved best score of 34 in 300 training games.",
    tags: ["PyTorch", "DQN", "Experience Replay", "Pygame", "Streamlit"],
    link: "https://github.com/tarunkumar"
  },
  {
    number: "02",
    category: "Computer Vision",
    title: "Deepfake Detection System",
    description: "A CNN-based deepfake detection system built using XceptionNet architecture. Trained on real deepfake image datasets to classify real vs AI-generated faces with high accuracy.",
    tags: ["XceptionNet", "CNN", "TensorFlow", "OpenCV"],
    link: "https://github.com/tarunkumar"
  },
  {
    number: "03",
    category: "Coming Soon",
    title: "Next Project — In Progress",
    description: "Currently exploring new domains in AI/ML. Click to get suggestions for what to build next based on the current portfolio.",
    tags: ["TBD"],
    link: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="bg-zinc-950 py-32 px-6 md:px-20 border-t border-zinc-900 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Col: Section Title */}
        <div className="md:w-1/3">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="sticky top-32"
          >
            <p className="text-xl text-zinc-500 font-mono tracking-widest mb-4">03 —</p>
            <h2 className="text-5xl md:text-7xl font-display font-medium text-zinc-100 tracking-tighter mb-6">
              Projects
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-zinc-500 to-transparent" />
          </motion.div>
        </div>

        {/* Right Col: Project List */}
        <div className="md:w-2/3 flex flex-col gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-3xl p-8 md:p-12 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm font-mono text-zinc-400 mb-4 uppercase tracking-widest flex items-center gap-4">
                    <span className="text-zinc-100 bg-zinc-800 px-3 py-1 rounded-full">{project.number}</span>
                    {project.category}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-display font-medium text-zinc-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-500 transition-all">
                    {project.title}
                  </h3>
                </div>
                <a href={project.link} target="_blank" rel="noreferrer" className="w-12 h-12 flex-shrink-0 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-300 transform group-hover:rotate-45 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-zinc-950 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>

              <p className="text-xl text-zinc-400 font-light leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-8 border-t border-zinc-800/50">
                {project.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx}
                    className="px-4 py-2 bg-zinc-950/50 border border-zinc-800/50 text-zinc-300 font-mono text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
