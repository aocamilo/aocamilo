"use client";

import { useRef } from "react";
import ClientWrapper from "@/components/client-wrapper";
import ClientHero from "@/components/client-hero";
import ProjectsSection from "@/components/sections/projects-section";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import type { Project } from "@/types";

interface ClientHomeProps {
  projects: Project[];
}

export default function ClientHome({ projects }: ClientHomeProps) {
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-50 to-blue-100 text-gray-900 transition-colors duration-300 dark:from-[#0a0b1e] dark:to-[#1a1b3e] dark:text-white">
      <ClientWrapper sectionRefs={sectionRefs}>
        <div className="pt-20">
          <section
            ref={sectionRefs.home}
            className="flex min-h-screen items-center justify-center p-4"
          >
            <ClientHero onExploreClick={() => scrollToSection("projects")} />
          </section>
          <section
            ref={sectionRefs.projects}
            className="min-h-screen px-4 py-20"
          >
            <ProjectsSection projects={projects} />
          </section>
          <section
            ref={sectionRefs.about}
            className="flex min-h-screen items-center justify-center p-4"
          >
            <AboutSection onConnectClick={() => scrollToSection("contact")} />
          </section>
          <section
            ref={sectionRefs.contact}
            className="flex min-h-screen items-center justify-center p-4"
          >
            <ContactSection />
          </section>
        </div>
      </ClientWrapper>
    </main>
  );
}
