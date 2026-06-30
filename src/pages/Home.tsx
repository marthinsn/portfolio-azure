import React from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThreeBackground from "@/components/ThreeBackground";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import MouseGlow from "@/components/MouseGlow";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Organizations from "@/components/sections/Organizations";
import Skills from "@/components/sections/Skills";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <LoadingScreen />
      <CustomCursor />
      <AnimatedBackground />
      <ThreeBackground />
      <MouseGlow />
      <ScrollProgress />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Organizations />
        <Skills />
        <Portfolio />
        <Contact />
      </main>

      <BackToTop />
    </div>
  );
}
