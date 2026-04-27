"use client";

import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    icon: "🧠",
    title: "Deep Learning",
    skills: ["PyTorch", "TensorFlow", "CNN", "XceptionNet"]
  },
  {
    icon: "🎮",
    title: "Reinforcement Learning",
    skills: ["DQN", "Experience Replay", "Pygame"]
  },
  {
    icon: "👁️",
    title: "Computer Vision",
    skills: ["OpenCV", "Image Classification", "Deepfake Detection"]
  },
  {
    icon: "📊",
    title: "Data Science",
    skills: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"]
  },
  {
    icon: "🌐",
    title: "Full Stack",
    skills: ["React", "FastAPI", "Streamlit", "Next.js"]
  },
  {
    icon: "⚙️",
    title: "Tools & Deployment",
    skills: ["Git", "Google Colab", "Vercel", "Streamlit Cloud"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="bg-zinc-950 py-32 px-6 md:px-20 border-t border-zinc-900 relative z-20">
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
            <p className="text-xl text-zinc-500 font-mono tracking-widest mb-4">02 —</p>
            <h2 className="text-5xl md:text-7xl font-display font-medium text-zinc-100 tracking-tighter mb-6">
              Skills
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-zinc-500 to-transparent" />
          </motion.div>
        </div>

        {/* Right Col: Bento Grid */}
        <div className="md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-3xl p-8 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="text-4xl mb-6">{category.icon}</div>
                <h3 className="text-2xl font-display font-medium text-zinc-100 mb-6 tracking-tight">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-4 py-2 bg-zinc-950/50 border border-zinc-800/50 text-zinc-300 font-mono text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
