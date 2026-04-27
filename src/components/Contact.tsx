"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-zinc-950 py-32 px-6 md:px-20 border-t border-zinc-900 relative z-20">
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
            <p className="text-xl text-zinc-500 font-mono tracking-widest mb-4">04 —</p>
            <h2 className="text-5xl md:text-7xl font-display font-medium text-zinc-100 tracking-tighter mb-6">
              Contact
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-zinc-500 to-transparent" />
          </motion.div>
        </div>

        {/* Right Col: Contact Links */}
        <div className="md:w-2/3 flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-6xl md:text-8xl font-display font-medium text-zinc-100 tracking-tighter mb-8">
              Let's work <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">together.</span>
            </h3>
            <p className="text-2xl text-zinc-400 font-light leading-relaxed mb-16 max-w-2xl">
              Open to internships, collaborations, and full-time AI/ML roles. Always happy to talk about interesting projects.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
              <a href="https://github.com/tarun-koyyana" target="_blank" rel="noreferrer" className="group flex justify-between items-center p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-3xl hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300">
                <div>
                  <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-2">GitHub</p>
                  <p className="text-xl font-display text-zinc-100">github.com/tarunkumar</p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-zinc-500 group-hover:text-emerald-400 transform group-hover:rotate-45 transition-all" />
              </a>

              <a href="https://www.linkedin.com/in/tarunkumar-koyyana-306b73297/" target="_blank" rel="noreferrer" className="group flex justify-between items-center p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-3xl hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300">
                <div>
                  <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-2">LinkedIn</p>
                  <p className="text-xl font-display text-zinc-100">linkedin.com/in/tarunkumar</p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-zinc-500 group-hover:text-emerald-400 transform group-hover:rotate-45 transition-all" />
              </a>

              <a href="mailto:tarunkk2316@gmail.com" className="group flex justify-between items-center p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-3xl hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 md:col-span-2">
                <div>
                  <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-2">Email</p>
                  <p className="text-2xl md:text-3xl font-display text-zinc-100">tarunkk2316@gmail.com</p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-zinc-500 group-hover:text-emerald-400 transform group-hover:rotate-45 transition-all" />
              </a>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto pt-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 font-mono text-sm uppercase tracking-widest">
        <p>© 2026 K. Tarun Kumar. Built with Next.js + deployed on Vercel.</p>
        <p>Andhra Pradesh, India</p>
      </div>
    </section>
  );
}
