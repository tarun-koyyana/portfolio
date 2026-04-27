import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-white/20 selection:text-white">
      <div className="relative">
        <ScrollyCanvas />
      </div>
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
