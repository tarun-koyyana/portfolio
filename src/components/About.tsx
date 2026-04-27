"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-zinc-950 py-32 px-6 md:px-20 border-t border-zinc-900 relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <p className="text-sm text-zinc-500 font-mono tracking-widest uppercase mb-4">01 — Introduction</p>
          <h2 className="text-5xl md:text-7xl font-display font-medium text-zinc-100 tracking-tighter">
            About Me
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Bio Box (Spans 2 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 md:p-14 flex flex-col justify-center relative overflow-hidden group hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <h3 className="text-3xl md:text-5xl font-display font-medium text-zinc-100 leading-[1.3] tracking-tight relative z-10">
              I'm a B.Tech CSE (Data Science) student passionate about AI/ML. <br/><span className="text-zinc-500">I don't just use pre-built APIs — I build models from scratch and understand every layer of the system.</span>
            </h3>
          </motion.div>

          {/* Location Box (Spans 1 column) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-1 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 md:p-14 flex flex-col justify-between hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-12 border border-zinc-700">
              <span className="text-2xl">🌍</span>
            </div>
            <div>
              <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-3">Location</p>
              <p className="text-2xl md:text-3xl font-display font-medium text-zinc-100">Andhra Pradesh,<br/>India</p>
            </div>
          </motion.div>

          {/* Education Box (Spans 1 column) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-1 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 md:p-14 flex flex-col justify-between hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300"
          >
            <div>
              <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-3">Education</p>
              <p className="text-2xl md:text-3xl font-display font-medium text-zinc-100 mb-1">B.Tech CSE</p>
              <p className="text-lg text-zinc-400">(Data Science)</p>
            </div>
            <div className="mt-12">
              <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-3">Status</p>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono text-sm">Open to roles</span>
              </div>
            </div>
          </motion.div>

          {/* Secondary Bio / Focus (Spans 2 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 md:p-14 flex flex-col justify-center hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed mb-8 relative z-10">
              From training a Deepfake Detection CNN to building a Reinforcement Learning agent that teaches itself to play Snake — I love working on projects that push boundaries.
            </p>
            <div className="flex flex-wrap gap-4 relative z-10 border-t border-zinc-800/50 pt-8">
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Focus</p>
                <p className="text-zinc-100 font-display font-medium">Computer Vision & RL</p>
              </div>
              <div className="w-px h-10 bg-zinc-800 hidden md:block mx-4" />
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Languages</p>
                <p className="text-zinc-100 font-display font-medium">Python, JavaScript</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
