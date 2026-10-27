import PortfolioIntro from "@/components/animations/PortfolioIntro";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Achievements from "@/components/achievements/Achievements";
import Certificates from "@/components/certificates/Certificates";
import Services from "@/components/services/Services";
import Contact from "@/components/contact/Contact";

export default function HomePage() {
  return (
    <>
      {/* Cinematic Animated Intro (Plays on first visit of session) */}
      <PortfolioIntro />

      <main className="flex flex-col w-full">
      {/* 1. Home / Hero Section */}
      <Hero />

      {/* 2. About Section */}
      <About />

      {/* 3. Skills Section */}
      <Skills />

      {/* 4. Projects Section */}
      <Projects />

      {/* 5. Achievements Section */}
      <Achievements />

      {/* 6. Certificates Section */}
      <Certificates />

      {/* 7. Services Section */}
      <Services />

      {/* 8. Contact Section */}
      <Contact />
    </main>
    </>
  );
}

